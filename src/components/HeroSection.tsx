
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToTools = () => {
    const toolsSection = document.querySelector('.tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient and pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-wellness-100 to-wellness-50 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2392e4b2' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container relative z-10 px-6 py-10 md:py-24 flex flex-col items-center text-center">
        <div className="mb-6 transform hover:rotate-3 transition-transform duration-300">
          <img 
            src="/lovable-uploads/79da89f1-2330-4d6b-95a1-8e822552f9f0.png" 
            alt="NutriWellness Logo" 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground animate-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-wellness-500">NutriWellness</span> Tracker
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8 animate-in">
          Your friendly companion for nutrition, health tracking, and personalized wellness advice
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-in">
          <a 
            href="#bmi-calculator" 
            className="primary-button shadow-lg transform hover:translate-y-1 hover:shadow-md transition-all duration-300"
          >
            Start Your Journey
          </a>
          <a 
            href="#ai-assistant" 
            className="secondary-button shadow hover:shadow-md transform hover:translate-y-1 transition-all duration-300"
          >
            Chat with AI Assistant
          </a>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToTools}
            className="p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
            aria-label="Scroll to tools"
          >
            <ArrowDown className="text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
