
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        
        {/* Tools Navigation */}
        <section className="section-container -mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <a
                key={tool.id}
                href={`#${tool.id}`}
                className="group hover:scale-105 transition-all duration-300"
              >
                <div className="feature-card h-full flex flex-col items-center text-center p-8 backdrop-blur-sm bg-white/80">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <tool.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Tool Sections */}
        <FoodComparison />
        <BMICalculator />
        <NutritionChatbot />
        <MealRecognition />
        <WellnessJourney />
        <BodyTypeGuide />
      </main>
    </div>
  );
};

export default Index;
