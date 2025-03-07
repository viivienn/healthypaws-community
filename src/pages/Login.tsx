import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Key } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // Simulate an authentication process
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({
          name: "Test User",
          email: email,
          role: "user",
          provider: "credentials"
        }));
        toast({
          title: "Login successful",
          description: "You have been successfully logged in.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="grid h-screen place-items-center bg-gray-100">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter your email and password to login</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500 peer-focus:text-gray-900" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 pl-9 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Key className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500 peer-focus:text-gray-900" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 pl-9 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <EyeOff className="absolute right-2.5 top-2.5 h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <Eye className="absolute right-2.5 top-2.5 h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleSubmit} disabled={loading} isLoading={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
        <CardFooter className="w-full flex justify-center text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline ml-1">Register</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
