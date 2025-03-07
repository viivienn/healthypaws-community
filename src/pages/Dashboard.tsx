
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Import refactored components
import SideNavigation from "@/components/dashboard/SideNavigation";
import MobileHeader from "@/components/dashboard/MobileHeader";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import PetSelector from "@/components/dashboard/PetSelector";
import PetProfile from "@/components/dashboard/PetProfile";
import HealthReminders from "@/components/dashboard/HealthReminders";
import RecentActivity from "@/components/dashboard/RecentActivity";
import CommunityTeaser from "@/components/dashboard/CommunityTeaser";

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
          photoUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
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
    navigate('/appointments');
  };

  const handleUpdateRecords = (petId: string) => {
    navigate('/health-records');
  };

  const getWelcomeMessage = () => {
    const activePet = getActivePet();
    
    if (activePet) {
      return `Here's what's new with ${activePet.name}`;
    } else if (pets.length === 0) {
      return "Let's add your pet to get started";
    } else {
      return "Your pet dashboard";
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const activePet = getActivePet();
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Side Navigation */}
      <SideNavigation onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <MobileHeader onLogout={handleLogout} />
        
        <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
          {/* Welcome Banner */}
          <WelcomeBanner 
            message={getWelcomeMessage()}
            description={activePet 
              ? `Keep ${activePet.name} healthy and happy—here's your next step.` 
              : 'Start managing your pet\'s health information.'}
          />

          {/* Pet Selection (if multiple pets) */}
          <PetSelector 
            pets={pets}
            activePetId={activePetId}
            onSelectPet={setActivePetId}
            onAddPet={handleAddPet}
          />

          {/* Main Grid Layout */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Pet Profile Card */}
            <PetProfile 
              pets={pets}
              activePet={activePet}
              onAddPet={handleAddPet}
              onScheduleAppointment={handleScheduleAppointment}
              onUpdateRecords={handleUpdateRecords}
            />

            {/* Health Reminders Card */}
            <HealthReminders activePet={activePet} />

            {/* Recent Activity Card */}
            <RecentActivity activePet={activePet} />

            {/* Community Teaser */}
            <CommunityTeaser activePet={activePet} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
