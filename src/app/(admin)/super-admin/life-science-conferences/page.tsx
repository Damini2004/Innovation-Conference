// src/app/(admin)/super-admin/life-science-conferences/page.tsx
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getLifeScienceConferences, addLifeScienceConference, updateLifeScienceConference, deleteLifeScienceConference, LifeScienceConference, LifeScienceConferenceData } from "@/services/lifeScienceConferenceService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  heading: z.string().min(5, "Heading must be at least 5 characters."),
  link: z.string().url("Please enter a valid URL."),
});

const LifeScienceConferenceForm = ({
    onSubmit,
    defaultValues,
    isSubmitting,
    buttonText
}: {
    onSubmit: (values: LifeScienceConferenceData) => void;
    defaultValues?: Partial<LifeScienceConferenceData>;
    isSubmitting: boolean;
    buttonText: string;
}) => {
    const form = useForm<LifeScienceConferenceData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            heading: defaultValues?.heading || "",
            link: defaultValues?.link || "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="heading"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Heading</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., International Conference on Genomics" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                                <Input type="url" placeholder="https://example.com/conference" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Saving..." : buttonText}
                </Button>
            </form>
        </Form>
    );
};

export default function ManageLifeScienceConferencesPage() {
  const [conferences, setConferences] = React.useState<LifeScienceConference[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const [selectedConference, setSelectedConference] = React.useState<LifeScienceConference | null>(null);
  const { toast } = useToast();

  const fetchConferences = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getLifeScienceConferences();
      setConferences(data);
    } catch (error) {
      toast({ title: "Error", description: "Could not fetch conferences.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchConferences();
  }, [fetchConferences]);

  const handleAddSubmit = async (values: LifeScienceConferenceData) => {
    setIsSubmitting(true);
    const result = await addLifeScienceConference(values);
    if (result.success) {
      toast({ title: "Success!", description: "Conference listing added." });
      setIsAddDialogOpen(false);
      fetchConferences();
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setIsSubmitting(false);
  };
  
  const handleEditSubmit = async (values: LifeScienceConferenceData) => {
      if (!selectedConference) return;
      setIsSubmitting(true);
      const result = await updateLifeScienceConference(selectedConference.id, values);
      if (result.success) {
          toast({ title: "Success!", description: "Conference listing updated." });
          setIsEditDialogOpen(false);
          fetchConferences();
      } else {
          toast({ title: "Error", description: result.message, variant: "destructive" });
      }
      setIsSubmitting(false);
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedConference) return;
    const result = await deleteLifeScienceConference(selectedConference.id);
    if (result.success) {
        toast({ title: "Success!", description: "Conference listing deleted."});
        setIsDeleteDialogOpen(false);
        fetchConferences();
    } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Life Science Conferences</h1>
          <p className="text-muted-foreground">Manage the special conference listings for the sidebar.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Listing</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Listing</DialogTitle>
                    <DialogDescription>Enter the heading and link for the new conference.</DialogDescription>
                </DialogHeader>
                <LifeScienceConferenceForm onSubmit={handleAddSubmit} isSubmitting={isSubmitting} buttonText="Add Conference" />
            </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Heading</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={3} className="h-24 text-center">Loading...</TableCell></TableRow>
              ) : conferences.length === 0 ? (
                <TableRow><TableCell colSpan={3} className="h-24 text-center">No listings found.</TableCell></TableRow>
              ) : (
                conferences.map((conf) => (
                  <TableRow key={conf.id}>
                    <TableCell className="font-medium">{conf.heading}</TableCell>
                    <TableCell><a href={conf.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">{conf.link}</a></TableCell>
                    <TableCell className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => { setSelectedConference(conf); setIsEditDialogOpen(true); }}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => { setSelectedConference(conf); setIsDeleteDialogOpen(true); }}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Edit Listing</DialogTitle>
                  <DialogDescription>Update the details for this conference listing.</DialogDescription>
              </DialogHeader>
              <LifeScienceConferenceForm 
                onSubmit={handleEditSubmit} 
                isSubmitting={isSubmitting} 
                buttonText="Save Changes"
                defaultValues={selectedConference || {}}
              />
          </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the listing for "{selectedConference?.heading}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
