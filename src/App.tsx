import "./index.css";
import { NavBar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router";
import { AuthPage } from "./pages/AuthPage";
import { AuthProvider } from "./components/context/AuthContext";
import { useAuth } from "./components/context/AuthContext";
import { TicketProvider } from "./components/context/TicketContext";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import Tickets from "./pages/Tickets";
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user || user.sessionActive === false) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};
function App() {
  return (
    <AuthProvider>
      <main className="min-h-dvh max-w-[1440px] mx-auto">
        <Toaster position="bottom-right" richColors close-button
      close-button-position="top-right"/>
        <NavBar />
        <TicketProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/:initialmode" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/tickets"
              element={
                <ProtectedRoute>
                  <Tickets />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </TicketProvider>
      </main>
    </AuthProvider>
  );
}

export default App;
