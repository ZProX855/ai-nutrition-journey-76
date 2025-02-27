
import { useEffect } from 'react';
import { Calculator, Apple, Bot, Camera, Target, UserCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FoodComparison from '@/components/FoodComparison';
import BMICalculator from '@/components/BMICalculator';
import NutritionChatbot from '@/components/NutritionChatbot';
import MealRecognition from '@/components/MealRecognition';
import WellnessJourney from '@/components/WellnessJourney';
import BodyTypeGuide from '@/components/BodyTypeGuide';
import Footer from '@/components/Footer';

const tools = [
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and get personalized recommendations',
    icon: Calculator,
    color: 'from-pink-400 to-rose-400'
  },
  {
    id: 'food-comparison',
    name: 'Food Comparison',
    description: 'Compare nutritional values of different foods',
    icon: Apple,
    color: 'from-green-400 to-emerald-400'
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    description: 'Chat with our friendly AI nutrition expert',
    icon: Bot,
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'meal-recognition',
    name: 'Meal Recognition',
    description: 'Analyze your meals with AI-powered recognition',
    icon: Camera,
    color: 'from-purple-400 to-indigo-400'
  },
  {
    id: 'wellness-journey',
    name: 'Wellness Journey',
    description: 'Track your progress and set wellness goals',
    icon: Target,
    color: 'from-orange-400 to-amber-400'
  },
  {
    id: 'body-type',
    name: 'Body Type Guide',
    description: 'Understand your body type and get tailored advice',
    icon: UserCircle2,
    color: 'from-teal-400 to-cyan-400'
  }
];

const Index = () => {
  // Add smooth scroll behavior for hash links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          window.scrollTo({
            top: (element as HTMLElement).offsetTop - 100,
            behavior: 'smooth',
          });
        }
      }
    };

    // Handle initial hash if present
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        
        {/* Tools Navigation - Now with circular design */}
        <section className="tools-section section-container -mt-20 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <a
                key={tool.id}
                href={`#${tool.id}`}
                className="group animate-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-card h-full flex flex-col items-center text-center p-8 hover:scale-105 transition-all duration-300 border-2 border-wellness-200 shadow-lg rounded-3xl overflow-hidden">
                  <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-all duration-300`}>
                    <tool.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Tool Back Navigation */}
        <div className="sticky top-20 z-30 mx-auto max-w-7xl px-4 sm:px-6 py-4 hidden" id="tool-navigation">
          <div className="bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-md flex items-center justify-between border border-wellness-200">
            <a href="#" className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              <img 
                src="/lovable-uploads/79da89f1-2330-4d6b-95a1-8e822552f9f0.png" 
                alt="Logo" 
                className="w-6 h-6" 
              />
              <span>Back to Tools</span>
            </a>
            <div className="flex items-center space-x-4">
              {tools.map((tool) => (
                <a 
                  key={tool.id}
                  href={`#${tool.id}`}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br text-white text-xs hover:scale-110 transition-transform"
                  style={{ background: `linear-gradient(to bottom right, var(--${tool.color.split(' ')[1]}), var(--${tool.color.split(' ')[3]}))` }}
                  title={tool.name}
                >
                  <tool.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Tool Sections */}
        <FoodComparison />
        <BMICalculator />
        <NutritionChatbot />
        <MealRecognition />
        <WellnessJourney />
        <BodyTypeGuide />
      </main>
      <Footer />

      {/* Show tool navigation after scrolling */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const toolsSection = document.querySelector('.tools-section');
            const toolNav = document.getElementById('tool-navigation');
            
            if (toolsSection && toolNav) {
              const toolsSectionTop = toolsSection.getBoundingClientRect().top + window.pageYOffset;
              
              window.addEventListener('scroll', function() {
                if (window.pageYOffset > toolsSectionTop + 300) {
                  toolNav.classList.remove('hidden');
                } else {
                  toolNav.classList.add('hidden');
                }
              });
            }
          });
        `
      }} />
    </div>
  );
};

export default Index;
