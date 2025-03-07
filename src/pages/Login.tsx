import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic email validation
    if (!email.includes('@')) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Mock authentication - replace with real API call
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          role: "Owner",
          provider: null
        }));
        toast({
          title: "Login successful",
          description: "You have been successfully logged in.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="grid h-screen place-items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your email and password to login</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2"
                placeholder="test@example.com"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2"
                placeholder="password"
              />
            </div>
            <Button disabled={loading} type="submit" className="w-full mt-4">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to="/register" className="text-sm text-muted-foreground hover:text-primary">
            Don't have an account?
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            Forgot Password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
