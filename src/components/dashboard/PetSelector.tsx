
import { PlusCircle } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  photoUrl?: string;
}

interface PetSelectorProps {
  pets: Pet[];
  activePetId: string | null;
  onSelectPet: (petId: string) => void;
  onAddPet: () => void;
}

const PetSelector = ({ pets, activePetId, onSelectPet, onAddPet }: PetSelectorProps) => {
  if (pets.length <= 1) return null;
  
  return (
    <div className="flex overflow-x-auto gap-4 py-2 px-1 -mx-1">
      {pets.map(pet => (
        <button
          key={pet.id}
          onClick={() => onSelectPet(pet.id)}
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
              <div className="text-primary/70 font-bold text-lg">
                {pet.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <span className="text-sm font-medium truncate max-w-[80px]">{pet.name}</span>
        </button>
      ))}
      <button
        onClick={onAddPet}
        className="flex-shrink-0 flex flex-col items-center p-2 rounded-lg hover:bg-muted transition-all"
      >
        <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mb-1">
          <PlusCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <span className="text-sm text-muted-foreground">Add Pet</span>
      </button>
    </div>
  );
};

export default PetSelector;
