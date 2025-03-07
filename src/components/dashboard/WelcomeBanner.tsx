
interface WelcomeBannerProps {
  message: string;
  description: string;
}

const WelcomeBanner = ({ message, description }: WelcomeBannerProps) => (
  <div className="bg-gradient-to-r from-primary/10 to-secondary/20 rounded-xl p-6 animate-fade-in">
    <h1 className="text-2xl font-bold text-foreground">{message}</h1>
    <p className="text-muted-foreground mt-1">{description}</p>
  </div>
);

export default WelcomeBanner;
