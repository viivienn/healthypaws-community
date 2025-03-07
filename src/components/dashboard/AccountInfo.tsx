
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  name: string;
  email: string;
}

interface AccountInfoProps {
  user: User;
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="hover:shadow-md transition-all duration-300 animate-slide-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="overflow-hidden">
            <h4 className="font-medium truncate">{user.name}</h4>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sm mt-2"
          onClick={() => navigate('/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Account Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
