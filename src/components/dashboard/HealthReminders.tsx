
import { Activity, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Pet {
  id: string;
  name: string;
}

interface HealthRemindersProps {
  activePet: Pet | null;
}

const HealthReminders = ({ activePet }: HealthRemindersProps) => {
  if (!activePet) return null;

  return (
    <Card className="hover:shadow-md transition-all duration-300 animate-fade-in">
      <CardHeader>
        <CardTitle>Health Reminders</CardTitle>
        <CardDescription>
          Upcoming care for {activePet.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start space-x-3">
            <Bell className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-amber-800">Annual Checkup Coming Up</p>
              <p className="text-amber-700 text-sm">
                Remember to book {activePet.name}'s annual checkup next month
              </p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
            <Activity className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-blue-800">Weight Check Reminder</p>
              <p className="text-blue-700 text-sm">
                Time to check if {activePet.name}'s weight is on track
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthReminders;
