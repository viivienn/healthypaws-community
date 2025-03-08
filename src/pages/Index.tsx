
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoleSelector from "@/components/home/RoleSelector";
import DemoRequestForm from "@/components/home/DemoRequestForm";

const Index = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  
  useEffect(() => {
    document.title = "HealthyPaws - Home";
    
    const handleOpenDemoModal = () => setShowDemoModal(true);
    window.addEventListener('open-demo-modal', handleOpenDemoModal);
    
    return () => {
      window.removeEventListener('open-demo-modal', handleOpenDemoModal);
    };
  }, []);

  const handleCloseDemoModal = () => {
    setShowDemoModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                  The all-in-one solution to manage your pet's health
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Keep track of appointments, vaccinations, weight and more.
                </p>
                <div className="space-x-3">
                  <Button size="lg" onClick={() => setShowDemoModal(true)}>
                    Request a Demo
                  </Button>
                  <Link to="/register">
                    <Button size="lg" variant="secondary">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
                  alt="HealthyPaws Dashboard"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Appointment Management</CardTitle>
                  <CardDescription>
                    Schedule and track your pet's appointments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Keep all your appointments in one place.
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Vaccination Records</CardTitle>
                  <CardDescription>
                    Maintain detailed vaccination records for your pets.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Always know when your pet is due for a booster.
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Weight Tracking</CardTitle>
                  <CardDescription>
                    Monitor your pet's weight and health trends.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Ensure your pet stays in optimal condition.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Join Our Community
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                  alt="Pet Community"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  Connect with other pet owners, share experiences, and get
                  advice.
                </p>
                <Button asChild>
                  <Link to="/register">Explore the Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Role Selection Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Who are you?
            </h2>
            <RoleSelector />
          </div>
        </section>
      </main>

      {showDemoModal && <DemoRequestForm onClose={handleCloseDemoModal} />}
      <Footer />
    </div>
  );
};

export default Index;
