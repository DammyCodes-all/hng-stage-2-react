import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "./context/AuthContext";
import { Button } from "./ui/button";
import { LayoutDashboard, Ticket, LogOutIcon, Menu, X } from "lucide-react";
const NavBar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isAuthenticated = Boolean(user?.sessionActive);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    setTimeout(logout, 300);
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="mx-auto flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between max-w-[1440px]">
        <section className="flex w-full flex-row justify-between items-center gap-3 md:flex-row md:items-center md:gap-4">
          <Link to="/" className="text-blue-600 text-2xl font-semibold">
            Ticcket
          </Link>

          {isAuthenticated && (
            <div className="flex flex-col gap-2 md:hidden">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-gray-700 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={handleToggleMenu}
              >
                {menuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          )}
        </section>

        {isAuthenticated && (
          <section className="hidden flex-col items-center gap-3 md:flex md:flex-row md:items-center">
            <Button
              variant="secondary"
              className="bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-1 text-white"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost">
              <Link
                to="/dashboard/tickets"
                className="flex items-center justify-center gap-1 text-gray-700"
              >
                <Ticket className="h-4 w-4" />
                Tickets
              </Link>
            </Button>
            <p className="text-sm text-gray-600 w-full min-w-30 flex flex-row gap-1 items-center justify-center">
              Hi, {user?.name}
            </p>
            <Link
              to={"/"}
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-slate-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <LogOutIcon className="h-4 w-4" />
              Logout
            </Link>
          </section>
        )}
      </div>

      {isAuthenticated && (
        <div id="mobile-menu" className="md:hidden" aria-hidden={!menuOpen}>
          {menuOpen && (
            <div className="mx-5 mb-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/dashboard/tickets"
                onClick={() => {
                  setMenuOpen(false)
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Ticket className="h-4 w-4" />
                Tickets
              </Link>
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-gray-600">Hi, {user?.name}</p>
                <Link
                  to={"/"}
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-slate-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <LogOutIcon className="h-4 w-4" />
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
export { NavBar };
