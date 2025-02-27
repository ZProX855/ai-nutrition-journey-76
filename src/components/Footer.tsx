
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl">🍃</span>
              <h3 className="text-xl font-bold ml-2">Wellness AI</h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your all-in-one AI-powered wellness companion. Compare foods, calculate BMI, 
              chat with our nutrition assistant, and get personalized recommendations.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#food-comparison" className="text-muted-foreground hover:text-primary transition-colors">
                  Food Comparison
                </a>
              </li>
              <li>
                <a href="#bmi-calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  BMI Calculator
                </a>
              </li>
              <li>
                <a href="#ai-assistant" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Nutrition Assistant
                </a>
              </li>
              <li>
                <a href="#meal-recognition" className="text-muted-foreground hover:text-primary transition-colors">
                  Meal Analysis
                </a>
              </li>
              <li>
                <a href="#body-type" className="text-muted-foreground hover:text-primary transition-colors">
                  Body Types
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Nutrition Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Workout Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Healthy Recipes
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Wellness Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Wellness AI. All rights reserved.
          </p>
          
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> using AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
