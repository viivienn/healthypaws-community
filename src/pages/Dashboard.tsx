
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Fixed casing
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Fixed casing
import { toast } from "@/hooks/use-toast";
import { 
  Activity, Calendar, FileText, Users, LogOut, PlusCircle, 
  Clock, Settings, Home, Paw, Bell, Syringe, Heart
} from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
  provider?: string;
}

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  nextAppointment?: string;
  nextVaccination?: string;
  photoUrl?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [activePetId, setActivePetId] = useState<string | null>(null);
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

    // Mock pet data - in a real app, this would come from an API
    if (localStorage.getItem('pets') === null) {
      const mockPets = [
        {
          id: "1",
          name: "Max",
          species: "Dog",
          breed: "Golden Retriever",
          age: 3,
          nextAppointment: "2023-04-15",
          nextVaccination: "2023-05-10",
          photoUrl: undefined
        }
      ];
      localStorage.setItem('pets', JSON.stringify(mockPets));
      setPets(mockPets);
      setActivePetId("1");
    } else {
      const storedPets = JSON.parse(localStorage.getItem('pets') || '[]');
      setPets(storedPets);
      if (storedPets.length > 0) {
        setActivePetId(storedPets[0].id);
      }
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

  const getActivePet = () => {
    return pets.find(pet => pet.id === activePetId) || null;
  };

  const handleAddPet = () => {
    // In a real app, this would open a form to add a new pet
    toast({
      title: "Add Pet",
      description: "This would open a form to add a new pet.",
    });
  };

  const handleScheduleAppointment = (petId: string) => {
    toast({
      title: "Schedule Appointment",
      description: `Scheduling appointment for pet ID: ${petId}`,
    });
  };

  const handleUpdateRecords = (petId: string) => {
    toast({
      title: "Update Records",
      description: `Updating records for pet ID: ${petId}`,
    });
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
    const activePet = getActivePet();
    
    if (user && activePet) {
      return `Good ${timeOfDay}, ${user.name}! Here's what's new with ${activePet.name}.`;
    } else if (user && pets.length === 0) {
      return `Good ${timeOfDay}, ${user.name}! Let's add your pet.`;
    } else {
      return `Good ${timeOfDay}!`;
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const activePet = getActivePet();
  
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
          <NavItem icon={<FileText />} label="Health Records" />
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
              {getWelcomeMessage()}
            </h1>
            <p className="text-muted-foreground mt-1">
              {activePet 
                ? `Keep ${activePet.name} healthy and happy—here's your next step.` 
                : 'Start managing your pet's health information.'}
            </p>
          </div>

          {/* Pet Selection (if multiple pets) */}
          {pets.length > 1 && (
            <div className="flex overflow-x-auto gap-4 py-2 px-1 -mx-1">
              {pets.map(pet => (
                <button
                  key={pet.id}
                  onClick={() => setActivePetId(pet.id)}
                  className={`flex-shrink-0 flex flex-col items-center p-2 rounded-lg transition-all ${
                    pet.id === activePetId 
                      ? 'bg-primary/10 ring-1 ring-primary/30' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-1">
                    {pet.photoUrl ? (
                      <img 
                        src={pet.photoUrl} 
                        alt={pet.name} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Paw className="h-6 w-6 text-primary/70" />
                    )}
                  </div>
                  <span className="text-sm font-medium truncate max-w-[80px]">{pet.name}</span>
                </button>
              ))}
              <button
                onClick={handleAddPet}
                className="flex-shrink-0 flex flex-col items-center p-2 rounded-lg hover:bg-muted transition-all"
              >
                <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mb-1">
                  <PlusCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Add Pet</span>
              </button>
            </div>
          )}

          {/* Main Grid Layout */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Pet Profile Card */}
            <Card className="md:row-span-2 hover:shadow-md transition-all duration-300 animate-slide-up">
              <CardHeader>
                <CardTitle>{pets.length === 0 ? "Add Your Pet" : "Pet Profile"}</CardTitle>
                <CardDescription>
                  {pets.length === 0 ? "Get started by adding your pet" : "Your pet's information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center">
                      <Paw className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground text-center">
                      Add your pet to get personalized care recommendations
                    </p>
                    <Button 
                      onClick={handleAddPet}
                      className="mt-2"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Pet
                    </Button>
                  </div>
                ) : activePet ? (
                  <div className="flex flex-col space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative group">
                        {activePet.photoUrl ? (
                          <img 
                            src={activePet.photoUrl} 
                            alt={activePet.name} 
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <Paw className="h-12 w-12 text-primary/70" />
                        )}
                        <button className="absolute bottom-0 right-0 bg-background rounded-full p-1 shadow-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlusCircle className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                      <h3 className="text-xl font-semibold">{activePet.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {activePet.breed} • {activePet.age} {activePet.age === 1 ? 'year' : 'years'} old
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {activePet.nextAppointment && (
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-primary/5">
                          <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Next Appointment</p>
                            <p className="text-muted-foreground text-sm">
                              {new Date(activePet.nextAppointment).toLocaleDateString(undefined, {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {activePet.nextVaccination && (
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/5">
                          <Syringe className="h-5 w-5 text-secondary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Next Vaccination</p>
                            <p className="text-muted-foreground text-sm">
                              {new Date(activePet.nextVaccination).toLocaleDateString(undefined, {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        onClick={() => handleScheduleAppointment(activePet.id)}
                        variant="outline"
                        className="w-full justify-start mb-2 hover:bg-primary/5"
                      >
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        Schedule Appointment
                      </Button>
                      <Button 
                        onClick={() => handleUpdateRecords(activePet.id)}
                        variant="outline"
                        className="w-full justify-start hover:bg-primary/5"
                      >
                        <FileText className="mr-2 h-4 w-4 text-primary" />
                        Update Health Records
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <p className="text-muted-foreground">Select a pet to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Health Reminders Card */}
            {activePet && (
              <Card className="hover:shadow-md transition-all duration-300 animate-fade-in">
                <CardHeader>
                  <CardTitle>Health Reminders</CardTitle>
                  <CardDescription>
                    Upcoming care for {activePet.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start space-x-3">
                      <Bell className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-amber-800">Annual Checkup Coming Up</p>
                        <p className="text-amber-700 text-sm">
                          Remember to book {activePet.name}'s annual checkup next month
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
                      <Activity className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-blue-800">Weight Check Reminder</p>
                        <p className="text-blue-700 text-sm">
                          Time to check if {activePet.name}'s weight is on track
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity Card */}
            {activePet && (
              <Card className="hover:shadow-md transition-all duration-300 animate-fade-in">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates for {activePet.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">Health Record Updated</p>
                      </div>
                      <p className="text-muted-foreground text-xs">3 days ago</p>
                    </div>
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">Appointment Scheduled</p>
                      </div>
                      <p className="text-muted-foreground text-xs">1 week ago</p>
                    </div>
                    <div className="border-l-2 border-primary/30 pl-4 py-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Syringe className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">Vaccination Complete</p>
                      </div>
                      <p className="text-muted-foreground text-xs">2 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Account Info (Minimized) */}
            <Card className="hover:shadow-md transition-all duration-300 animate-slide-up">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-medium truncate">{user.name}</h4>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm mt-2"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

            {/* Community Teaser */}
            <Card className="lg:col-span-2 hover:shadow-md transition-all duration-300 animate-slide-up">
              <CardHeader>
                <CardTitle>Pet Community</CardTitle>
                <CardDescription>
                  Connect with other pet owners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg p-6 text-center">
                  {activePet ? (
                    <>
                      <Heart className="h-10 w-10 mx-auto text-primary/70 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Join the Community</h3>
                      <p className="text-muted-foreground mb-4">
                        Connect with other {activePet.species.toLowerCase()} owners, share experiences, and get advice
                      </p>
                    </>
                  ) : (
                    <>
                      <Users className="h-10 w-10 mx-auto text-primary/70 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Join the Pet Owner Community</h3>
                      <p className="text-muted-foreground mb-4">
                        Connect with other pet owners, share knowledge, and get advice
                      </p>
                    </>
                  )}
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
