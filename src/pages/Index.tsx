
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, Calendar, FileClock, Users, Shield, Award, 
  BarChart, Heart, Video, MessageSquare, Zap, Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoleSelector from "@/components/home/RoleSelector";
import DemoRequestForm from "@/components/home/DemoRequestForm";

const Index = () => {
  const { toast } = useToast();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Handle hash navigation
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (hash === "features" && featuresRef.current) {
        featuresRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "community" && communityRef.current) {
        communityRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Listen for demo modal open events
    const handleOpenDemoModal = () => setShowDemoModal(true);
    window.addEventListener('open-demo-modal', handleOpenDemoModal);
    
    return () => {
      window.removeEventListener('open-demo-modal', handleOpenDemoModal);
    };
  }, []);

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Smart Scheduling",
      description: "Integrated calendar system with automated reminders for appointments, vaccinations, and medication refills."
    },
    {
      icon: <FileClock className="w-6 h-6 text-primary" />,
      title: "Digital Health Records",
      description: "Securely store and access your pet's complete health history, prescriptions, and test results."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Community Network",
      description: "Connect with a network of veterinary professionals for support, knowledge sharing, and collaboration."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Data Management",
      description: "Industry-standard security protocols to protect sensitive pet and clinic information."
    },
  ];

  const handleDemoRequest = () => {
    setShowDemoModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 lg:pt-32 pb-16 md:pb-20 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left animate-fade-in">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  The Future of Pet Healthcare
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                  Smart Healthcare for
                  <span className="block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Pets & Communities
                  </span>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto lg:mx-0">
                Digitize, streamline, and grow your pet healthcare community with our 
                all-in-one intelligent platform built for the next generation.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="font-medium text-base px-6 py-6 bg-primary hover:bg-primary/90"
                  onClick={handleDemoRequest}
                >
                  Request a demo
                  <Video className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="font-medium text-base px-6 py-6">
                  Learn more
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md mx-auto lg:mx-0 animate-slide-up">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl"></div>
                <Card className="relative overflow-hidden rounded-3xl border-0 p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Veterinarian with dog"
                    className="w-full h-[300px] object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Role Selection Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Find Your Path</h2>
            <p className="text-muted-foreground mt-2">Choose your role to get started with Clinecto</p>
          </div>
          
          <RoleSelector />
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center animate-fade-in">
              <span className="text-4xl md:text-5xl font-bold text-primary">5,000+</span>
              <p className="mt-2 text-muted-foreground">Pet Owners Onboarded</p>
            </div>
            <div className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "100ms" }}>
              <span className="text-4xl md:text-5xl font-bold text-primary">300+</span>
              <p className="mt-2 text-muted-foreground">Veterinary Clinics</p>
            </div>
            <div className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
              <span className="text-4xl md:text-5xl font-bold text-primary">1,200+</span>
              <p className="mt-2 text-muted-foreground">Practicing Vets</p>
            </div>
            <div className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <span className="text-4xl md:text-5xl font-bold text-primary">98%</span>
              <p className="mt-2 text-muted-foreground">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need for modern pet healthcare
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform combines intelligent tools with a user-friendly interface to
              make pet healthcare management simple and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]" 
              >
                <CardContent className="space-y-4 p-6">
                  <div className="p-3 rounded-full bg-primary/10 w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section ref={communityRef} id="community" className="py-20 md:py-28 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 animate-slide-up">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl"></div>
                <Card className="relative overflow-hidden rounded-3xl border-0 p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Veterinary community"
                    className="w-full h-[400px] object-cover"
                  />
                </Card>
              </div>
            </div>
            <div className="flex-1 space-y-8 text-center lg:text-left animate-fade-in">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Community
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                A supportive community for <span className="text-primary">veterinary professionals</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Clinecto creates a vibrant, professional community designed for 
                veterinarians. Build your network, share knowledge,
                and grow professionally in a collaborative environment.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Professional Development</h3>
                    <p className="text-sm text-muted-foreground">Earn recognition as you document cases and share insights with colleagues</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Peer Support Network</h3>
                    <p className="text-sm text-muted-foreground">Connect with fellow vets for case discussions and professional advice</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 shrink-0">
                    <BarChart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Professional Growth Tracking</h3>
                    <p className="text-sm text-muted-foreground">Visualize your progress and achievements throughout your career</p>
                  </div>
                </div>
              </div>
              
              <div>
                <Link to="/register?role=vet">
                  <Button 
                    className="font-medium bg-primary hover:bg-primary/90"
                  >
                    Join as a Vet
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Get Started Today
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to transform your pet healthcare experience?
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of pet owners, vets, and clinics already using Clinecto to
              streamline healthcare management and build professional communities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="font-medium text-base px-6 py-6 bg-primary hover:bg-primary/90"
                >
                  Create your free account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-medium text-base px-6 py-6"
                onClick={handleDemoRequest}
              >
                Request a demo
                <Video className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Demo Request Modal */}
      {showDemoModal && (
        <DemoRequestForm onClose={() => setShowDemoModal(false)} />
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
