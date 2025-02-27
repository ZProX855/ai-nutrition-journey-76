
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToContent = () => {
    const firstSection = document.getElementById('food-comparison');
    if (firstSection) {
      window.scrollTo({
        top: firstSection.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-wellness-100 to-transparent opacity-50"></div>
      
      {/* Animated Circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-wellness-200 mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-wellness-100 mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6 animate-fade-in">
            AI-Powered Wellness Tracking
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl leading-tight animate-slide-down">
            Your Personal AI Wellness Assistant
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-slide-down" style={{ animationDelay: '0.1s' }}>
            Compare foods, calculate BMI, analyze meals, and get personalized 
            nutrition advice - all powered by advanced AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-down" style={{ animationDelay: '0.2s' }}>
            <button className="primary-button px-8 py-4" onClick={scrollToContent}>
              Explore Features
            </button>
            <button className="secondary-button px-8 py-4">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer animate-bounce"
        onClick={scrollToContent}
      >
        <span className="text-sm font-medium mb-2">Scroll Down</span>
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
};

export default HeroSection;
