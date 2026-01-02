
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export default function ConferenceSidebarForm() {
  return (
    <Card>
      <CardHeader className="text-center bg-muted/50">
        <CardTitle>Quick Inquiry</CardTitle>
        <CardDescription>Conferences, Journals & Publications</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name-sidebar">Name</Label>
            <Input id="name-sidebar" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-sidebar">Email Address</Label>
            <Input id="email-sidebar" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone-sidebar">Phone Number</Label>
            <Input id="phone-sidebar" type="tel" placeholder="Enter your phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-sidebar">Category</Label>
            <Select>
              <SelectTrigger id="category-sidebar">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="journal">Journal</SelectItem>
                <SelectItem value="publication">Publication</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

    