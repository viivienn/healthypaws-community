
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Building2, Dog, ArrowRight } from "lucide-react";

const RoleSelector = () => {
  const roles = [
    {
      id: "vet",
      name: "I'm a Vet",
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      description: "Join a community of veterinary professionals, document cases, and grow your network.",
      link: "/register?role=vet"
    },
    {
      id: "clinic",
      name: "I'm a Clinic Admin",
      icon: <Building2 className="h-8 w-8 text-primary" />,
      description: "Manage your clinic operations, appointments, and patient records efficiently.",
      link: "/register?role=clinic"
    },
    {
      id: "pet_owner",
      name: "I'm a Pet Owner",
      icon: <Dog className="h-8 w-8 text-primary" />,
      description: "Keep your pet's health records organized and never miss an important appointment.",
      link: "/register?role=pet_owner"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {roles.map((role) => (
        <Link to={role.link} key={role.id} className="block">
          <Card className="h-full transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 mb-2">
                {role.icon}
              </div>
              <h3 className="text-xl font-semibold">{role.name}</h3>
              <p className="text-muted-foreground text-sm flex-grow">{role.description}</p>
              <div className="flex items-center justify-center text-primary font-medium mt-4">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RoleSelector;
