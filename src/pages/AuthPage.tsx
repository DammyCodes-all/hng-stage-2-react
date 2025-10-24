import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner@2.0.3";

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const initialMode =
    searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: { email?: string; password?: string; name?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (mode === "signup" && !name) {
      newErrors.name = "Name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
        toast.success("Welcome back!");
      } else {
        await signup(name, email, password);
        toast.success("Account created successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] relative overflow-hidden px-4">
      <Card className="w-full max-w-md p-8 shadow-xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600">
            {mode === "login"
              ? "Enter your credentials to access your account"
              : "Sign up to start managing your tickets"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8]"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setErrors({});
            }}
            className="text-[#2563eb] hover:underline"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>
      </Card>
    </div>
  );
};
