
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { FileText, Plus, Syringe, Weight, Activity, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import SideNavigation from "@/components/dashboard/SideNavigation";
import MobileHeader from "@/components/dashboard/MobileHeader";
import PetSelector from "@/components/dashboard/PetSelector";

interface UserInfo {
  name: string;
  email: string;
  role: string;
}

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  photoUrl?: string;
}

interface Vaccination {
  id: string;
  petId: string;
  name: string;
  date: string;
  expiryDate: string;
  provider: string;
}

interface WeightRecord {
  id: string;
  petId: string;
  weight: number;
  date: string;
  unit: "kg" | "lb";
}

const HealthRecords = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [activePetId, setActivePetId] = useState<string | null>(null);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([]);
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

    // Get pet data
    const storedPets = JSON.parse(localStorage.getItem('pets') || '[]');
    setPets(storedPets);
    if (storedPets.length > 0) {
      setActivePetId(storedPets[0].id);
    }

    // Mock health data
    const mockVaccinations = [
      {
        id: "1",
        petId: "1",
        name: "Rabies",
        date: "2022-05-15",
        expiryDate: "2023-05-15",
        provider: "Dr. Sarah Johnson"
      },
      {
        id: "2",
        petId: "1",
        name: "DHPP",
        date: "2022-06-10",
        expiryDate: "2023-06-10",
        provider: "Dr. Michael Lee"
      }
    ];
    
    const mockWeightRecords = [
      {
        id: "1",
        petId: "1",
        weight: 32.5,
        date: "2023-01-15",
        unit: "lb" as const
      },
      {
        id: "2",
        petId: "1",
        weight: 33.1,
        date: "2023-02-22",
        unit: "lb" as const
      },
      {
        id: "3",
        petId: "1",
        weight: 33.8,
        date: "2023-03-30",
        unit: "lb" as const
      }
    ];
    
    setVaccinations(mockVaccinations);
    setWeightRecords(mockWeightRecords);
  }, [navigate]);

  const handleAddVaccination = () => {
    toast({
      title: "Add Vaccination",
      description: "This would open a form to add a new vaccination record.",
    });
  };

  const handleAddWeightRecord = () => {
    toast({
      title: "Add Weight Record",
      description: "This would open a form to add a new weight record.",
    });
  };

  const handleUploadRecords = () => {
    toast({
      title: "Upload Records",
      description: "This would open a file picker to upload medical records.",
    });
  };

  const handleAddPet = () => {
    toast({
      title: "Add Pet",
      description: "This would open a form to add a new pet.",
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

  const getActivePet = () => {
    return pets.find(pet => pet.id === activePetId) || null;
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
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Health Records</h1>
            <p className="text-muted-foreground">Manage your pet's health history</p>
          </div>

          {/* Pet Selection (if multiple pets) */}
          <PetSelector 
            pets={pets}
            activePetId={activePetId}
            onSelectPet={setActivePetId}
            onAddPet={handleAddPet}
          />

          {activePet ? (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">{activePet.name}'s Health Records</h2>
                <Button onClick={handleUploadRecords} variant="outline" className="flex-shrink-0">
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Records
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Vaccinations Card */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Syringe className="mr-2 h-5 w-5 text-primary" />
                      Vaccinations
                    </CardTitle>
                    <Button onClick={handleAddVaccination} variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {vaccinations.filter(v => v.petId === activePetId).length > 0 ? (
                      <div className="space-y-4">
                        {vaccinations
                          .filter(v => v.petId === activePetId)
                          .map((vaccination) => (
                            <div 
                              key={vaccination.id} 
                              className="flex justify-between items-start p-3 rounded-lg bg-muted/50"
                            >
                              <div>
                                <p className="font-medium">{vaccination.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Administered: {new Date(vaccination.date).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Expires: {new Date(vaccination.expiryDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                {new Date(vaccination.expiryDate) > new Date() ? 'Active' : 'Expired'}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    ) : (
                      <div className="py-8 flex flex-col items-center justify-center">
                        <Syringe className="h-12 w-12 text-muted-foreground/30 mb-3" />
                        <p className="text-muted-foreground text-center mb-3">
                          No vaccination records found
                        </p>
                        <Button onClick={handleAddVaccination} variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Vaccination
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Weight History Card */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Weight className="mr-2 h-5 w-5 text-primary" />
                      Weight History
                    </CardTitle>
                    <Button onClick={handleAddWeightRecord} variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {weightRecords.filter(w => w.petId === activePetId).length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Date</span>
                          <span>Weight</span>
                        </div>
                        {weightRecords
                          .filter(w => w.petId === activePetId)
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((record) => (
                            <div 
                              key={record.id} 
                              className="flex justify-between p-3 rounded-lg bg-muted/50"
                            >
                              <span>
                                {new Date(record.date).toLocaleDateString()}
                              </span>
                              <span className="font-medium">
                                {record.weight} {record.unit}
                              </span>
                            </div>
                          ))
                        }
                      </div>
                    ) : (
                      <div className="py-8 flex flex-col items-center justify-center">
                        <Weight className="h-12 w-12 text-muted-foreground/30 mb-3" />
                        <p className="text-muted-foreground text-center mb-3">
                          No weight records found
                        </p>
                        <Button onClick={handleAddWeightRecord} variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Weight Record
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Medical Records Card */}
                <Card className="md:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      Medical Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="py-8 flex flex-col items-center justify-center">
                      <FileText className="h-12 w-12 text-muted-foreground/30 mb-3" />
                      <p className="text-muted-foreground text-center mb-3">
                        Upload medical records from your veterinarian
                      </p>
                      <Button onClick={handleUploadRecords}>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload Records
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 flex flex-col items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Pets Found</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Add a pet to start tracking their health records, vaccinations, and medical history.
                </p>
                <Button onClick={handleAddPet}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your Pet
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default HealthRecords;
