// src/app/(admin)/super-admin/conferences/page.tsx
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
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  getLifeScienceConferences,
  addLifeScienceConference,
  updateLifeScienceConference,
  deleteLifeScienceConference,
  LifeScienceConference,
  LifeScienceConferenceData,
} from "@/services/lifeScienceConferenceService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSubAdmins, SubAdmin } from "@/services/subAdminService";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ---------------------------- FORM SCHEMA ---------------------------- */

const formSchema = z.object({
  heading: z.string().min(5, "Heading must be at least 5 characters."),
  link: z.string().url("Please enter a valid URL."),
  assignedSubAdminIds: z.array(z.string()).optional(),
});

/* ---------------------------- FORM COMPONENT ---------------------------- */

function ConferenceForm({
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
}) {
  const form = useForm<LifeScienceConferenceData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      link: "",
      assignedSubAdminIds: [],
    },
  });

  React.useEffect(() => {
    if (defaultValues) {
      form.reset({
        heading: defaultValues.heading || "",
        link: defaultValues.link || "",
        assignedSubAdminIds: defaultValues.assignedSubAdminIds || [],
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="heading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conference Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., International Conference on Genomics" />
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
                <Input {...field} type="url" placeholder="https://example.com/conference" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignedSubAdminIds"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Assign Sub-Admin</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Select a sub-admin to assign to this conference.
                </p>
              </div>
              <ScrollArea className="h-40 w-full rounded-md border">
                <div className="p-4 space-y-2">
                    {subAdmins.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="assignedSubAdminIds"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  // For single selection, this logic works fine.
                                  // If you want multi-select, this is already set up.
                                  // For single select radio-button like behavior:
                                  const newSelection = checked ? [item.id] : [];
                                  field.onChange(newSelection);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                    ))}
                </div>
              </ScrollArea>
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
}

/* ---------------------------- PAGE ---------------------------- */

export default function ManageConferencesPage() {
  const [conferences, setConferences] = React.useState<LifeScienceConference[]>([]);
  const [subAdmins, setSubAdmins] = React.useState<SubAdmin[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [selected, setSelected] = React.useState<LifeScienceConference | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [c, a] = await Promise.all([
        getLifeScienceConferences(),
        getSubAdmins({ approvedOnly: true }),
      ]);
      setConferences(c);
      setSubAdmins(a);
    } catch {
      toast({ title: "Error loading data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  /* ---------------------------- ACTIONS ---------------------------- */

  const add = async (v: LifeScienceConferenceData) => {
    setSubmitting(true);
    const r = await addLifeScienceConference(v);
    setSubmitting(false);

    if (r.success) {
      toast({ title: "Conference added" });
      setAddOpen(false);
      fetchData();
    }
  };

  const edit = async (v: LifeScienceConferenceData) => {
    if (!selected) return;
    setSubmitting(true);
    const r = await updateLifeScienceConference(selected.id, v);
    setSubmitting(false);

    if (r.success) {
      toast({ title: "Conference updated" });
      setEditOpen(false);
      fetchData();
    }
  };

  const remove = async () => {
    if (!selected) return;
    const r = await deleteLifeScienceConference(selected.id);

    if (r.success) {
      toast({ title: "Conference deleted" });
      setDeleteOpen(false);
      fetchData();
    }
  };

  /* ---------------------------- UI ---------------------------- */

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Conference Management</h1>
          <p className="text-muted-foreground">Add, edit, or remove conference listings.</p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Conference
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Conference Name</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                conferences.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.heading}</TableCell>
                    <TableCell>{c.link}</TableCell>
                    <TableCell>
                      {c.assignedSubAdminIds && c.assignedSubAdminIds.length > 0
                        ? c.assignedSubAdminIds.map(id => subAdmins.find(a => a.id === id)?.name).filter(Boolean).join(', ')
                        : "Unassigned"}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelected(c);
                          setEditOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => {
                          setSelected(c);
                          setDeleteOpen(true);
                        }}
                      >
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

      {/* ADD */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Conference</DialogTitle>
            <DialogDescription>Enter the name and link for the new conference.</DialogDescription>
          </DialogHeader>
          <ConferenceForm
            onSubmit={add}
            isSubmitting={submitting}
            buttonText="Add Conference"
            subAdmins={subAdmins}
          />
        </DialogContent>
      </Dialog>

      {/* EDIT */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Conference</DialogTitle>
          </DialogHeader>
          <ConferenceForm
            onSubmit={edit}
            isSubmitting={submitting}
            buttonText="Save Changes"
            defaultValues={selected || {}}
            subAdmins={subAdmins}
          />
        </DialogContent>
      </Dialog>

      {/* DELETE */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete listing?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={remove}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
