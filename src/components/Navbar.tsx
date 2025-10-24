import { Link } from "react-router";
import { useAuth } from "./context/AuthContext";
import { Button } from "./ui/button";
import { LayoutDashboard, Ticket, LogOutIcon } from "lucide-react";
const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="w-full bg-white shadow-md px-5 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <section className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-4">
        <Link to="/" className="text-blue-600 text-2xl font-semibold">
          TicketFlow
        </Link>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-3">
          {user && user.sessionActive && (
            <>
              <Button
                variant={"secondary"}
                className="w-full bg-blue-500 hover:bg-blue-600 transition-colors md:w-auto"
              >
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-1 text-white"
                >
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </Button>
              <Button variant={"ghost"} className="w-full md:w-auto">
                <Link
                  to="/dashboard/tickets"
                  className="flex items-center justify-center gap-1 text-gray-700"
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
        <section className="flex flex-col items-center gap-3 md:flex-row md:items-center">
          <h1 className="text-sm text-gray-600 md:text-base">
            Hi, {user.name}
          </h1>
          <Button
            variant="outline"
            className="w-full md:ml-4 md:w-auto"
            onClick={logout}
          >
            <LogOutIcon />
            Logout
          </Button>
        </section>
      )}
    </nav>
  );
};
export { NavBar };
