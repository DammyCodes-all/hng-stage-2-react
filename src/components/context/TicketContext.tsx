import { createContext, useContext, useState } from "react";

export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: Date;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, "id" | "createdAt">) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Fix login page bug",
    description: "Users are unable to login with correct credentials",
    status: "open",
    createdAt: new Date("2025-10-20"),
  },
  {
    id: "2",
    title: "Update dashboard UI",
    description: "Modernize the dashboard with new design system",
    status: "in_progress",
    createdAt: new Date("2025-10-21"),
  },
  {
    id: "3",
    title: "Database optimization",
    description: "Improve query performance for large datasets",
    status: "closed",
    createdAt: new Date("2025-10-19"),
  },
  {
    id: "4",
    title: "Add export functionality",
    description: "Allow users to export reports to CSV",
    status: "open",
    createdAt: new Date("2025-10-22"),
  },
];

export const TicketProvider = ({ children }: { children: React.ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const addTicket = (ticket: Omit<Ticket, "id" | "createdAt">) => {
    const newTicket: Ticket = {
      ...ticket,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, ...updates } : ticket
      )
    );
  };

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  return (
    <TicketContext.Provider
      value={{ tickets, addTicket, updateTicket, deleteTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
};
