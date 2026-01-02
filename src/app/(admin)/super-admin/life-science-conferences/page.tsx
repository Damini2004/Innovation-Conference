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
import { PlusCircle, Edit, Trash2, ChevronsUpDown, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getLifeScienceConferences, addLifeScienceConference, updateLifeScienceConference, deleteLifeScienceConference, LifeScienceConference, LifeScienceConferenceData } from "@/services/lifeScienceConferenceService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSubAdmins, SubAdmin } from "@/services/subAdminService";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  heading: z.string().min(5, "Heading must be at least 5 characters."),
  link: z.string().url("Please enter a valid URL."),
  assignedSubAdminId: z.string().optional(),
});

const LifeScienceConferenceForm = ({
    onSubmit,
    defaultValues,
    isSubmitting,
    buttonText,
    subAdmins,
}: {
    onSubmit: (values: LifeScienceConferenceData) => void;
    defaultValues?: Partial<LifeScienceConferenceData>;
    isSubmitting: boolean;
    buttonText: string;
    subAdmins: SubAdmin[];
}) => {
    const form = useForm<LifeScienceConferenceData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            heading: defaultValues?.heading || "",
            link: defaultValues?.link || "",
            assignedSubAdminId: defaultValues?.assignedSubAdminId || undefined,
        },
    });

    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

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
                 <FormField control={form.control} name="assignedSubAdminId" render={({ field }) => ( 
                    <FormItem className="flex flex-col">
                        <FormLabel>Assign Sub-Admin (Optional)</FormLabel>
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")} >
                                        {field.value ? subAdmins.find( (admin) => admin.id === field.value )?.name : "Select Sub-Admin"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                <Command>
                                    <CommandInput placeholder="Search sub-admins..." />
                                    <CommandList>
                                        <CommandEmpty>No approved sub-admins found.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem value={"none"} onSelect={() => { form.setValue("assignedSubAdminId", undefined); setIsPopoverOpen(false); }} >
                                                None
                                            </CommandItem>
                                            {subAdmins.map((admin) => (
                                                <CommandItem value={admin.name} key={admin.id} onSelect={() => { form.setValue("assignedSubAdminId", admin.id); setIsPopoverOpen(false); }} >
                                                    <Check className={cn("mr-2 h-4 w-4", admin.id === field.value ? "opacity-100" : "opacity-0" )}/>
                                                    {admin.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Saving..." : buttonText}
                </Button>
            </form>
        </Form>
    );
};

export default function ManageLifeScienceConferencesPage() {
  const [conferences, setConferences] = React.useState<LifeScienceConference[]>([]);
  const [subAdmins, setSubAdmins] = React.useState<SubAdmin[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const [selectedConference, setSelectedConference] = React.useState<LifeScienceConference | null>(null);
  const { toast } = useToast();

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const [confData, adminData] = await Promise.all([
        getLifeScienceConferences(),
        getSubAdmins({ approvedOnly: true }),
      ]);
      setConferences(confData);
      setSubAdmins(adminData);
    } catch (error) {
      toast({ title: "Error", description: "Could not fetch necessary data.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddSubmit = async (values: LifeScienceConferenceData) => {
    setIsSubmitting(true);
    const result = await addLifeScienceConference(values);
    if (result.success) {
      toast({ title: "Success!", description: "Conference listing added." });
      setIsAddDialogOpen(false);
      fetchData();
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
          fetchData();
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
        fetchData();
    } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
    }
  };

  const getAdminNameById = (adminId?: string): string => {
    if (!adminId) return 'Unassigned';
    return subAdmins.find(admin => admin.id === adminId)?.name || 'Unknown Admin';
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
                <LifeScienceConferenceForm 
                    onSubmit={handleAddSubmit} 
                    isSubmitting={isSubmitting} 
                    buttonText="Add Conference"
                    subAdmins={subAdmins}
                />
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
                <TableHead>Assigned To</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={4} className="h-24 text-center">Loading...</TableCell></TableRow>
              ) : conferences.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="h-24 text-center">No listings found.</TableCell></TableRow>
              ) : (
                conferences.map((conf) => (
                  <TableRow key={conf.id}>
                    <TableCell className="font-medium">{conf.heading}</TableCell>
                    <TableCell><a href={conf.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">{conf.link}</a></TableCell>
                    <TableCell>{getAdminNameById(conf.assignedSubAdminId)}</TableCell>
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
                subAdmins={subAdmins}
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
