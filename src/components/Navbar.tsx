import { Link } from "react-router";
import { useAuth } from "./context/AuthContext";
import { Button } from "./ui/button";
import { LayoutDashboard, Ticket, LogOutIcon } from "lucide-react";
const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="w-full px-10 py-5 flex justify-between bg-white shadow-md">
      <section className="flex gap-2 justify-center items-center h-full">
        <Link to="/" className="text-blue-600 text-xl">
          TicketFlow
        </Link>
        <div className="flex gap-3 justify-center items-center">
          {user && user.sessionActive && (
            <>
              <Button
                variant={"secondary"}
                className="bg-blue-500 hover:bg-blue-600 transition-colors"
              >
                <Link
                  to="/dashboard"
                  className="text-white flex gap-1 justify-center items-center"
                >
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </Button>
              <Button variant={"ghost"}>
                <Link
                  to="/dashboard/tickets"
                  className="text-gray-700 flex gap-1 justify-center items-center"
                >
                  <Ticket />
                  Tickets
                </Link>
              </Button>
            </>
          )}
        </div>
      </section>
      {user?.sessionActive && (
        <section className="flex justify-center items-center">
          <h1>Hi, {user.name}</h1>
          <Button variant="outline" className="ml-4" onClick={logout}>
            <LogOutIcon />
            Logout
          </Button>
        </section>
      )}
    </nav>
  );
};
export { NavBar };
