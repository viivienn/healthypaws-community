
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { toast } from "@/hooks/use-toast";

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/5 to-secondary/10 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            PetCareAI Dashboard
          </h1>
          <Button variant="subtle" onClick={handleLogout}>
            Log out
          </Button>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user.name}!</CardTitle>
              <CardDescription>
                {user.role === 'pet_owner' 
                  ? 'Manage your pets and appointments' 
                  : user.role === 'vet' 
                    ? 'Access your schedule and patient records'
                    : 'Manage your clinic operations'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                {user.provider && <p><strong>Signed in with:</strong> {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Frequently used features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {user.role === 'pet_owner' && (
                <>
                  <Button variant="outline" className="w-full justify-start">Add a new pet</Button>
                  <Button variant="outline" className="w-full justify-start">Schedule an appointment</Button>
                  <Button variant="outline" className="w-full justify-start">View health records</Button>
                </>
              )}
              {user.role === 'vet' && (
                <>
                  <Button variant="outline" className="w-full justify-start">View today's appointments</Button>
                  <Button variant="outline" className="w-full justify-start">Access patient records</Button>
                  <Button variant="outline" className="w-full justify-start">Update prescriptions</Button>
                </>
              )}
              {user.role === 'clinic_admin' && (
                <>
                  <Button variant="outline" className="w-full justify-start">Manage staff</Button>
                  <Button variant="outline" className="w-full justify-start">View clinic schedule</Button>
                  <Button variant="outline" className="w-full justify-start">Manage inventory</Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-6">No recent activity to display</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
