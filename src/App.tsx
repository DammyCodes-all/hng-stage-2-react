import "./index.css";
import { NavBar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router";
import { AuthPage } from "./pages/AuthPage";
import { AuthProvider } from "./components/context/AuthContext";
import { useAuth } from "./components/context/AuthContext";
import Dashboard from "./pages/Dashboard";
import { toast, Toaster } from "sonner";
import { useEffect } from "react";
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.sessionActive === false) {
      toast.error("Please login to view this page");
      navigate("/auth/login");
    }
  }, [user, navigate]);

  return <>{children}</>;
};
function App() {
  return (
    <AuthProvider>
      <main className="min-h-dvh max-w-[1440px] mx-auto">
        <Toaster position="top-right" richColors />
        <NavBar />
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
        </Routes>
        <Footer />
      </main>
    </AuthProvider>
  );
}

export default App;
