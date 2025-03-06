
import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "pet_owner" | "vet" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: "pet_owner" | "vet" | "admin") => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login with mock data
      const mockUser: User = {
        id: "user-123",
        email,
        name: email.split("@")[0],
        role: "pet_owner",
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const register = async (name: string, email: string, password: string, role: "pet_owner" | "vet" | "admin") => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration with mock data
      const mockUser: User = {
        id: "user-" + Math.floor(Math.random() * 1000),
        email,
        name,
        role,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
