import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Ticket } from "@/components/context/TicketContext";
import { Pencil, Trash2 } from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

export const TicketCard = ({ ticket, onEdit, onDelete }: TicketCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-[#22c55e] text-white";
      case "in_progress":
        return "bg-[#f59e0b] text-white";
      case "closed":
        return "bg-[#9ca3af] text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace("_", " ").toUpperCase();
  };

  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-3">
        <h3>{ticket.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
            ticket.status
          )}`}
        >
          {getStatusLabel(ticket.status)}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{ticket.description}</p>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Created: {new Date(ticket.createdAt).toLocaleDateString()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(ticket)}
            className="hover:bg-[#2563eb] hover:text-white transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(ticket.id)}
            className="hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
