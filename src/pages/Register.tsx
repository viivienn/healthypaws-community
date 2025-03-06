
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"pet_owner" | "vet" | "admin">("pet_owner");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check query parameter for role
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    if (roleParam === "vet" || roleParam === "pet_owner" || roleParam === "admin") {
      setRole(roleParam);
    }
  }, [location]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    try {
      await register(name, email, password, role);
      toast({
        title: "Registration successful",
        description: "Welcome to PetCareAI!",
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create account. Please try again.");
      toast({
        title: "Registration failed",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md animate-scale-in">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Sign up for PetCareAI to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium leading-none">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium leading-none">
                    I am a
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as "pet_owner" | "vet" | "admin")}
                    className="w-full p-2 rounded-md border border-input bg-background"
                    required
                  >
                    <option value="pet_owner">Pet Owner</option>
                    <option value="vet">Veterinarian</option>
                    <option value="admin">Clinic Administrator</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <input type="checkbox" id="terms" className="rounded border-input" required />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button variant="outline" className="w-full bg-card" type="button">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.21537 17.14 5.2654 14.295L1.27539 17.39C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full bg-card" type="button">
                    <svg className="mr-2 h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.234-.02-.356-.03-.13-.017-.25-.04-.37-.066 2.2-.27 3.703-2.2 3.703-4.93 0-.1-.01-.19-.02-.272.05.01.09.01.135.01.253 0 .712-.112 1.073-.352zM11.92 20.978c-3.353 0-3.466-1.586-6.48-1.586-.944 0-2.452.244-2.98.587-.115.072-.152.087-.228.136-.1.056-.25.15-.25.296 0 .19.147.35.322.437.34.167.747.3 1.125.39.378.1.787.145 1.185.145.383 0 .76-.023 1.14-.078 2.75-.393 3.034-.86 4.758-.86 1.36 0 2.232.434 3.227.916.303.148.65.248 1.017.248.608 0 1.175-.24 1.588-.368.153-.047.286-.106.39-.16.09-.05.16-.094.214-.15.115-.12.167-.276.167-.437 0-.2-.086-.37-.25-.483-.13-.088-.324-.142-.532-.196-.652-.167-1.92-.446-2.963-.564.188-1.536.204-3.97-1.45-5.24.37-.16.76-.34 1.128-.53 2.25-1.15 4.602-2.67 4.602-6.09 0-1.5-.282-2.29-1.106-3.35-.82-1.06-1.17-1.9-1.17-3.307 0-.15.01-.3.03-.462.06-.372.18-.736.35-1.06.33-.617.76-1.08.76-1.08-.206.02-.444.01-.668.01-2.57 0-4.14 1.23-5.2 3.32-.17.33-.31.66-.42.99-.11.33-.19.66-.24.98-.07.42-.09.79-.09 1.24 0 .15.01.31.01.47.03.565.13 1.27.42 1.886.07.157.17.314.22.453-.96.466-1.92 1.065-2.83 1.743-1.27.95-2.37 2.066-3.09 3.5-.57 1.14-.74 2.29-.74 3.565 0 1.42.32 2.78 1.06 3.86.86 1.31 2.1 2.05 3.6 2.28-.13.29-.21.56-.24.84zM2.205 18c.15 0 .26-.07.33-.185.08-.13.11-.295.11-.52v-2.91c0-.22-.03-.385-.1-.512-.06-.116-.17-.185-.32-.185s-.27.07-.33.19c-.07.13-.11.297-.11.52v2.91c0 .22.03.38.1.51.07.12.18.19.33.19zm15.16-12.38c-.94 0-1.76.45-2.33 1.14-.62.73-.97 1.76-.97 2.97 0 1.23.35 2.25.97 2.93.56.66 1.38 1.08 2.33 1.08.94 0 1.76-.42 2.31-1.08.63-.68.99-1.7.99-2.92 0-1.22-.36-2.25-.99-2.97-.55-.69-1.37-1.14-2.31-1.14zm1.47 5.38c-.32.4-.79.64-1.47.64-.69 0-1.15-.24-1.48-.64-.32-.4-.5-1-.5-1.62 0-.67.18-1.3.5-1.72.32-.4.79-.66 1.48-.66s1.15.26 1.47.66c.31.42.5 1.05.5 1.72 0 .63-.19 1.22-.5 1.62z" />
                    </svg>
                    Apple
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
