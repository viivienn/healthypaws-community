
import { ReactNode } from "react";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 p-2 rounded-md transition-colors w-full ${
      active 
        ? 'bg-primary/10 text-primary font-medium' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`}
  >
    <span className="h-5 w-5">{icon}</span>
    <span>{label}</span>
  </button>
);

export default NavItem;
