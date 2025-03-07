
import { Calendar, FileText, Paw, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

interface PetProfileProps {
  pets: Pet[];
  activePet: Pet | null;
  onAddPet: () => void;
  onScheduleAppointment: (petId: string) => void;
  onUpdateRecords: (petId: string) => void;
}

const PetProfile = ({ 
  pets, 
  activePet, 
  onAddPet, 
  onScheduleAppointment, 
  onUpdateRecords 
}: PetProfileProps) => {
  return (
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
              onClick={onAddPet}
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
                  <Calendar className="h-5 w-5 text-secondary mt-0.5" />
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
                onClick={() => onScheduleAppointment(activePet.id)}
                variant="outline"
                className="w-full justify-start mb-2 hover:bg-primary/5"
              >
                <Calendar className="mr-2 h-4 w-4 text-primary" />
                Schedule Appointment
              </Button>
              <Button 
                onClick={() => onUpdateRecords(activePet.id)}
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
  );
};

export default PetProfile;
