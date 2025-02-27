
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-wellness-50/50 border-t border-border/50 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <img 
            src="/lovable-uploads/79da89f1-2330-4d6b-95a1-8e822552f9f0.png" 
            alt="Wellness Tracker Logo" 
            className="w-12 h-12 object-contain mb-4"
          />
          
          <h3 className="text-xl font-bold mb-2">Wellness Tracker</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Your companion for a healthier lifestyle
          </p>
          
          <div className="flex space-x-6 mb-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center justify-center">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
            <span>for your health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
