
import { Calendar, FileText, Syringe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Pet {
  id: string;
  name: string;
}

interface RecentActivityProps {
  activePet: Pet | null;
}

const RecentActivity = ({ activePet }: RecentActivityProps) => {
  if (!activePet) return null;

  return (
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
  );
};

export default RecentActivity;
