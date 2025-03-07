
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Mail, User, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

import SideNavigation from "@/components/dashboard/SideNavigation";
import MobileHeader from "@/components/dashboard/MobileHeader";

interface UserInfo {
  name: string;
  email: string;
  role: string;
  provider?: string;
}

const Settings = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Get user data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Side Navigation */}
      <SideNavigation onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <MobileHeader onLogout={handleLogout} />
        
        <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Email Address</p>
                        <p className="text-muted-foreground text-sm">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                      <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Account Type</p>
                        <p className="text-muted-foreground text-sm">
                          {user.provider ? `Connected with ${user.provider}` : 'Standard Account'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/5"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Configure your notification preferences, language settings, and accessibility options here.
                  </p>
                  <Button variant="outline" className="w-full">Manage Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
