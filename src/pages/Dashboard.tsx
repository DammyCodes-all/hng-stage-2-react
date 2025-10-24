import { useNavigate } from "react-router";
import { useTickets } from "@/components/context/TicketContext";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket, CheckCircle2, Clock, XCircle } from "lucide-react";

const Dashboard = () => {
  const { tickets } = useTickets();
  const navigate = useNavigate();

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets = tickets.filter(
    (t) => t.status === "in_progress"
  ).length;
  const closedTickets = tickets.filter((t) => t.status === "closed").length;

  const stats = [
    {
      title: "Total Tickets",
      value: totalTickets,
      icon: <Ticket className="w-8 h-8 text-[#2563eb]" />,
      color: "bg-blue-50",
    },
    {
      title: "Open Tickets",
      value: openTickets,
      icon: <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />,
      color: "bg-green-50",
    },
    {
      title: "In Progress",
      value: inProgressTickets,
      icon: <Clock className="w-8 h-8 text-[#f59e0b]" />,
      color: "bg-amber-50",
    },
    {
      title: "Resolved Tickets",
      value: closedTickets,
      icon: <XCircle className="w-8 h-8 text-[#9ca3af]" />,
      color: "bg-gray-50",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      <main className="flex-1 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="mb-8">
            <h1 className="mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Overview of your ticket management system
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 mb-2">{stat.title}</p>
                    <p className="text-4xl">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <div className="flex w-full items-center justify-between">
              <h2 className="mb-6">Recent Tickets</h2>
              <Button
                className="bg-[#2563eb] hover:bg-[#1d4ed8] cursor-pointer"
                onClick={() => navigate("/dashboard/tickets?create=true")}
              >
                Create Ticket
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tickets.slice(0, 4).map((ticket) => (
                <Card
                  key={ticket.id}
                  className="p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3>{ticket.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        ticket.status === "open"
                          ? "bg-[#22c55e] text-white"
                          : ticket.status === "in_progress"
                          ? "bg-[#f59e0b] text-white"
                          : "bg-[#9ca3af] text-white"
                      }`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{ticket.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
