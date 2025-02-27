
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/79da89f1-2330-4d6b-95a1-8e822552f9f0.png" 
            alt="Wellness App Logo" 
            className="h-12 w-auto"
          />
          <span className="text-xl font-bold text-primary hidden sm:inline-block">NutriWellness</span>
        </Link>

        <div className="hidden md:flex gap-6">
          <a href="#bmi-calculator" className="text-muted-foreground hover:text-foreground transition-colors">BMI Calculator</a>
          <a href="#food-comparison" className="text-muted-foreground hover:text-foreground transition-colors">Food Comparison</a>
          <a href="#ai-assistant" className="text-muted-foreground hover:text-foreground transition-colors">AI Assistant</a>
          <a href="#meal-recognition" className="text-muted-foreground hover:text-foreground transition-colors">Meal Recognition</a>
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-background border-b border-border animate-in slide-in-from-top py-4">
          <div className="container flex flex-col space-y-4">
            <a 
              href="#bmi-calculator" 
              className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              BMI Calculator
            </a>
            <a 
              href="#food-comparison" 
              className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Food Comparison
            </a>
            <a 
              href="#ai-assistant" 
              className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Assistant
            </a>
            <a 
              href="#meal-recognition" 
              className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Meal Recognition
            </a>
            <a 
              href="#wellness-journey" 
              className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wellness Journey
            </a>
            <a 
              href="#body-type" 
              className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Body Type Guide
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
