import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  sessionActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("ticketapp_user") || "null")
  );
  const [users, setUsers] = useState<User[]>(
    JSON.parse(localStorage.getItem("ticketapp_session") || "[]")
  );
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("ticketapp_session", JSON.stringify(users));
  }, [users]);

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const existingUser = users.find((record) => record.email === email);

    if (!existingUser) {
      throw new Error("No account found for that email address.");
    }

    if (existingUser.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }

    const activeUser = { ...existingUser, sessionActive: true };
    localStorage.setItem("ticketapp_user", JSON.stringify(activeUser));
    setUser(activeUser);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === existingUser.id ? { ...u, sessionActive: true } : u
      )
    );
  };

  const signup = async (name: string, email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const isEmailTaken = users.find((record) => record.email === email);
    if (isEmailTaken) {
      throw new Error("An account with that email already exists.");
    }
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password,
      sessionActive: true,
    };
    localStorage.setItem("ticketapp_user", JSON.stringify(user));
    setUsers((prev) => [...prev, user]);
    setUser(user);
  };

  const logout = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user?.id ? { ...u, sessionActive: false } : u))
    );
    setUser(null);
    localStorage.removeItem("ticketapp_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
