
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
import { PlusCircle, Edit, Trash2, ChevronsUpDown, Check } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

/* ---------------------------- FORM SCHEMA ---------------------------- */

const formSchema = z.object({
  heading: z.string().min(5, "Heading must be at least 5 characters."),
  link: z.string().url("Please enter a valid URL."),
  assignedSubAdminId: z.string().optional(),
});

/* ---------------------------- FORM COMPONENT ---------------------------- */

function LifeScienceConferenceForm({
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
      assignedSubAdminId: undefined,
    },
  });

  React.useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

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
                <Input {...field} placeholder="Conference heading" />
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
                <Input {...field} type="url" placeholder="https://example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignedSubAdminId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Assign Sub-Admin (Optional)</FormLabel>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isPopoverOpen}
                    className="justify-between"
                  >
                    {field.value
                      ? subAdmins.find((a) => a.id === field.value)?.name
                      : "Select Sub-Admin"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search sub-admins..." />
                    <CommandList>
                      <CommandEmpty>No sub-admins found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="none"
                          onSelect={(e) => {
                            form.setValue("assignedSubAdminId", undefined, {
                              shouldDirty: true,
                            });
                            setIsPopoverOpen(false);
                          }}
                        >
                          None
                        </CommandItem>
                        {subAdmins.map((admin) => (
                          <CommandItem
                            key={admin.id}
                            value={admin.id}
                            onSelect={(currentValue) => {
                              form.setValue("assignedSubAdminId", currentValue === field.value ? undefined : currentValue, {
                                shouldDirty: true,
                              });
                              setIsPopoverOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === admin.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
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

export default function ManageLifeScienceConferencesPage() {
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
          <h1 className="text-2xl font-bold">Life Science Conferences</h1>
          <p className="text-muted-foreground">Manage conference listings</p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Listing
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Heading</TableHead>
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
                      {subAdmins.find((a) => a.id === c.assignedSubAdminId)?.name ||
                        "Unassigned"}
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
            <DialogTitle>Add Conference</DialogTitle>
            <DialogDescription>Create a new listing</DialogDescription>
          </DialogHeader>
          <LifeScienceConferenceForm
            onSubmit={add}
            isSubmitting={submitting}
            buttonText="Add"
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
          <LifeScienceConferenceForm
            onSubmit={edit}
            isSubmitting={submitting}
            buttonText="Save"
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
