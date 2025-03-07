
import { Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Pet {
  id: string;
  name: string;
  species: string;
}

interface CommunityTeaserProps {
  activePet: Pet | null;
}

const CommunityTeaser = ({ activePet }: CommunityTeaserProps) => {
  return (
    <Card className="lg:col-span-2 hover:shadow-md transition-all duration-300 animate-slide-up">
      <CardHeader>
        <CardTitle>Pet Community</CardTitle>
        <CardDescription>
          Connect with other pet owners
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg p-6 text-center">
          {activePet ? (
            <>
              <Heart className="h-10 w-10 mx-auto text-primary/70 mb-4" />
              <h3 className="text-lg font-medium mb-2">Join the Community</h3>
              <p className="text-muted-foreground mb-4">
                Connect with other {activePet.species.toLowerCase()} owners, share experiences, and get advice
              </p>
            </>
          ) : (
            <>
              <Users className="h-10 w-10 mx-auto text-primary/70 mb-4" />
              <h3 className="text-lg font-medium mb-2">Join the Pet Owner Community</h3>
              <p className="text-muted-foreground mb-4">
                Connect with other pet owners, share knowledge, and get advice
              </p>
            </>
          )}
          <Button variant="default">
            Explore Community
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityTeaser;
