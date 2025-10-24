import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Ticket, TicketStatus } from "@/components/context/TicketContext";

interface TicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string;
    description: string;
    status: TicketStatus;
  }) => void;
  ticket?: Ticket | null;
  mode: "create" | "edit";
}

export const TicketDialog = ({
  open,
  onOpenChange,
  onSubmit,
  ticket,
  mode,
}: TicketDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TicketStatus>("open");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  useEffect(() => {
    if (ticket && mode === "edit") {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setStatus(ticket.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("open");
    }
    setErrors({});
  }, [ticket, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ title: title.trim(), description: description.trim(), status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Ticket" : "Edit Ticket"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the details to create a new ticket."
              : "Update the ticket information below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter ticket title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue or task"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as TicketStatus)}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#2563eb] hover:bg-[#1d4ed8]">
              {mode === "create" ? "Create Ticket" : "Update Ticket"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
