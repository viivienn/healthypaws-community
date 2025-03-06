
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowRight, Calendar, FileClock, Users, Shield, Award, BarChart, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const forVetsRef = useRef<HTMLDivElement>(null);
  const forPetOwnersRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Handle hash navigation
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (hash === "features" && featuresRef.current) {
        featuresRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "for-vets" && forVetsRef.current) {
        forVetsRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "for-pet-owners" && forPetOwnersRef.current) {
        forPetOwnersRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
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
      title: "Vet Community",
      description: "Connect with a network of veterinary professionals for support, knowledge sharing, and collaboration."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Data Management",
      description: "Industry-standard security protocols to protect sensitive pet and clinic information."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-20 lg:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left animate-fade-in">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Introducing PetCareAI
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                  The intelligent platform for
                  <span className="block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    modern pet healthcare
                  </span>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto lg:mx-0">
                Streamline your pet health records, simplify clinic operations, and build a supportive
                community for vets with our all-in-one intelligent platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="font-medium text-base px-6 py-6">
                    Get started for free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="font-medium text-base px-6 py-6">
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md mx-auto lg:mx-0 animate-slide-up">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl"></div>
                <Card className="relative glass-card shadow-xl overflow-hidden rounded-3xl border-0">
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
                variant="hover" 
                className="animate-scale-in" 
                style={{ animationDelay: `${index * 100}ms` }}
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
      
      {/* For Vets Section */}
      <section ref={forVetsRef} id="for-vets" className="py-20 md:py-28 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 animate-slide-up">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl"></div>
                <Card className="relative glass-card shadow-xl overflow-hidden rounded-3xl border-0">
                  <img 
                    src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Vet with animal patient"
                    className="w-full h-[400px] object-cover"
                  />
                </Card>
              </div>
            </div>
            <div className="flex-1 space-y-8 text-center lg:text-left animate-fade-in">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                For Veterinarians
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                A supportive community for <span className="text-primary">new vets</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                PetCareAI creates a vibrant, gamified community designed specifically for
                millennial and Gen Z veterinarians. Build your network, share knowledge,
                and grow professionally in an engaging environment.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Gamified Learning</h3>
                    <p className="text-sm text-muted-foreground">Earn badges and climb leaderboards as you document cases and share insights</p>
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
                  <Button variant="primary" className="font-medium">
                    Join as a Vet
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* For Pet Owners Section */}
      <section ref={forPetOwnersRef} id="for-pet-owners" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 text-center lg:text-left animate-fade-in">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                For Pet Owners
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Simple, secure <span className="text-primary">pet health management</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Keep all your pet's health information in one place. From vaccination records to appointment
                scheduling, PetCareAI makes it easy to stay on top of your pet's health needs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 shrink-0">
                    <FileClock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Complete Digital Records</h3>
                    <p className="text-sm text-muted-foreground">Store all health records, prescriptions, and test results in one secure location</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Smart Reminders</h3>
                    <p className="text-sm text-muted-foreground">Never miss an appointment, vaccination, or medication refill again</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10 shrink-0">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Personalized Health Insights</h3>
                    <p className="text-sm text-muted-foreground">Receive tailored recommendations based on your pet's health history</p>
                  </div>
                </div>
              </div>
              
              <div>
                <Link to="/register?role=pet_owner">
                  <Button variant="primary" className="font-medium">
                    Sign up as Pet Owner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 animate-slide-up">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl"></div>
                <Card className="relative glass-card shadow-xl overflow-hidden rounded-3xl border-0">
                  <img 
                    src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Dog owner with pet"
                    className="w-full h-[400px] object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Get Started Today
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to transform your pet healthcare experience?
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of pet owners, vets, and clinics already using PetCareAI to
              streamline healthcare management and build professional communities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register">
                <Button variant="primary" size="lg" className="font-medium text-base px-6 py-6">
                  Create your free account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="font-medium text-base px-6 py-6">
                  Contact sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
