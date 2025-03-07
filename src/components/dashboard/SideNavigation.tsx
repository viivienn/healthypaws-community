
import { Home, Calendar, FileText, Users, Settings, LogOut } from "lucide-react";
import NavItem from "./NavItem";

interface SideNavigationProps {
  onLogout: () => void;
}

const SideNavigation = ({ onLogout }: SideNavigationProps) => {
  return (
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
          onClick={onLogout}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors w-full p-2 rounded-md"
        >
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default SideNavigation;
