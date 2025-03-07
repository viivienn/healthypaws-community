
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Import refactored components
import SideNavigation from "@/components/dashboard/SideNavigation";
import MobileHeader from "@/components/dashboard/MobileHeader";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import PetSelector from "@/components/dashboard/PetSelector";
import PetProfile from "@/components/dashboard/PetProfile";
import HealthReminders from "@/components/dashboard/HealthReminders";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AccountInfo from "@/components/dashboard/AccountInfo";
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

            {/* Account Info (Minimized) */}
            <AccountInfo user={user} />

            {/* Community Teaser */}
            <CommunityTeaser activePet={activePet} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
