
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import SideNavigation from "@/components/dashboard/SideNavigation";
import MobileHeader from "@/components/dashboard/MobileHeader";

interface UserInfo {
  name: string;
  email: string;
  role: string;
}

interface Appointment {
  id: string;
  petId: string;
  petName: string;
  date: string;
  time: string;
  type: string;
  provider: string;
  location: string;
}

const Appointments = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
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

    // Mock appointment data
    const mockAppointments = [
      {
        id: "1",
        petId: "1",
        petName: "Max",
        date: "2023-04-15",
        time: "10:00 AM",
        type: "Annual check-up",
        provider: "Dr. Sarah Johnson",
        location: "Happy Pets Clinic"
      },
      {
        id: "2",
        petId: "1",
        petName: "Max",
        date: "2023-05-10",
        time: "2:30 PM",
        type: "Vaccination",
        provider: "Dr. Michael Lee",
        location: "Happy Pets Clinic"
      }
    ];
    setAppointments(mockAppointments);
  }, [navigate]);

  const handleScheduleAppointment = () => {
    toast({
      title: "Schedule Appointment",
      description: "This would open a form to schedule a new appointment.",
    });
  };

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
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Appointments</h1>
              <Button onClick={handleScheduleAppointment}>
                <Plus className="mr-2 h-4 w-4" />
                Schedule New
              </Button>
            </div>
            <p className="text-muted-foreground">Manage your pet's healthcare visits</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            
            {appointments.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{appointment.type}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">For {appointment.petName}</span>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            Confirmed
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {new Date(appointment.date).toLocaleDateString(undefined, {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{appointment.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between pt-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/5">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 flex flex-col items-center justify-center">
                  <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground text-center mb-4">
                    No upcoming appointments scheduled
                  </p>
                  <Button onClick={handleScheduleAppointment}>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule New Appointment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
