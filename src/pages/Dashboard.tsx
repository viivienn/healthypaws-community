
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Fixed casing
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Fixed casing
import { toast } from "@/hooks/use-toast";
import { Activity, Calendar, FileText, Users, LogOut, PlusCircle, Clock, Settings, Home } from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
  provider?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
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

  const getQuickActions = () => {
    if (user.role === 'pet_owner') {
      return [
        { label: "Add a new pet", icon: <PlusCircle className="h-5 w-5" /> },
        { label: "Schedule an appointment", icon: <Calendar className="h-5 w-5" /> },
        { label: "View health records", icon: <FileText className="h-5 w-5" /> }
      ];
    } else if (user.role === 'vet') {
      return [
        { label: "Today's appointments", icon: <Clock className="h-5 w-5" /> },
        { label: "Patient records", icon: <FileText className="h-5 w-5" /> },
        { label: "Update prescriptions", icon: <FileText className="h-5 w-5" /> }
      ];
    } else {
      return [
        { label: "Manage staff", icon: <Users className="h-5 w-5" /> },
        { label: "Clinic schedule", icon: <Calendar className="h-5 w-5" /> },
        { label: "Manage inventory", icon: <Activity className="h-5 w-5" /> }
      ];
    }
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Side Navigation */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-border p-4 space-y-6">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Clinecto
          </h1>
        </div>
        
        <nav className="flex flex-col space-y-1">
          <NavItem icon={<Home />} label="Dashboard" active />
          <NavItem icon={<Calendar />} label="Appointments" />
          <NavItem icon={<FileText />} label="Records" />
          <NavItem icon={<Users />} label="Community" />
          <NavItem icon={<Settings />} label="Settings" />
        </nav>
        
        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors w-full p-2 rounded-md"
          >
            <LogOut className="h-5 w-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Clinecto
          </h1>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </header>
        
        <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/20 rounded-xl p-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">
              {getWelcomeMessage()}, {user.name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {user.role === 'pet_owner' 
                ? 'Manage your pets and appointments' 
                : user.role === 'vet' 
                  ? 'Your schedule and patient records are up to date'
                  : 'Manage your clinic operations and staff'}
            </p>
          </div>

          {/* Quick Actions and Profile Section */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Profile Card */}
            <Card className="md:row-span-2 hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Your account information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <span className="text-3xl font-semibold text-primary">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-muted-foreground">Name</h4>
                      <p className="text-foreground">{user.name}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-muted-foreground">Email</h4>
                      <p className="text-foreground">{user.email}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-muted-foreground">Role</h4>
                      <p className="text-foreground">{user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                    </div>
                    {user.provider && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-muted-foreground">Sign-in Method</h4>
                        <p className="text-foreground">{user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Frequently used features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {getQuickActions().map((action, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="w-full justify-start hover:bg-primary/5 transition-colors duration-200 group"
                    >
                      <span className="mr-2 text-muted-foreground group-hover:text-primary transition-colors duration-200">
                        {action.icon}
                      </span>
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Card */}
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-3" />
                    <p className="text-muted-foreground">No recent activity to display</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Your activity will appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Teaser */}
            <Card className="lg:col-span-2 hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Connect with other professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg p-6 text-center">
                  <Users className="h-10 w-10 mx-auto text-primary/70 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Join the Clinecto Community</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with other professionals, share knowledge, and grow your network
                  </p>
                  <Button variant="default">
                    Explore Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// Simple NavItem component for the sidebar
const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <button
    className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
      active 
        ? 'bg-primary/10 text-primary font-medium' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Dashboard;
