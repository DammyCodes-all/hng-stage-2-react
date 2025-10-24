import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useTickets } from "@/components/context/TicketContext";
import type { Ticket, TicketStatus } from "@/components/context/TicketContext";
import { TicketCard } from "@/components/TicketCard";
import { TicketDialog } from "@/components/TicketDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
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

const TicketsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { tickets, addTicket, updateTicket, deleteTicket } = useTickets();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      setDialogMode("create");
      setDialogOpen(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const handleCreateTicket = () => {
    setDialogMode("create");
    setSelectedTicket(null);
    setDialogOpen(true);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setDialogMode("edit");
    setSelectedTicket(ticket);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setTicketToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (ticketToDelete) {
      deleteTicket(ticketToDelete);
      toast.success("Ticket deleted successfully");
      setTicketToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSubmit = (data: {
    title: string;
    description: string;
    status: TicketStatus;
  }) => {
    if (dialogMode === "create") {
      addTicket(data);
      toast.success("Ticket created successfully");
    } else if (selectedTicket) {
      updateTicket(selectedTicket.id, data);
      toast.success("Ticket updated successfully");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      <main className="flex-1 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="mb-2">Tickets</h1>
              <p className="text-gray-600">
                Manage and track all your support tickets
              </p>
            </div>
            <Button
              onClick={handleCreateTicket}
              className="bg-[#2563eb] hover:bg-[#1d4ed8]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </div>

          {/* Tickets Grid */}
          {tickets.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 mb-4">
                No tickets yet. Create your first ticket to get started!
              </p>
              <Button
                onClick={handleCreateTicket}
                className="bg-[#2563eb] hover:bg-[#1d4ed8]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onEdit={handleEditTicket}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <TicketDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        ticket={selectedTicket}
        mode={dialogMode}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TicketsPage;
