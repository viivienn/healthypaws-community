
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onLogout: () => void;
}

const MobileHeader = ({ onLogout }: MobileHeaderProps) => (
  <header className="md:hidden flex items-center justify-between p-4 border-b">
    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
      HealthyPaws
    </h1>
    <Button variant="ghost" size="icon" onClick={onLogout}>
      <LogOut className="h-5 w-5" />
    </Button>
  </header>
);

export default MobileHeader;
