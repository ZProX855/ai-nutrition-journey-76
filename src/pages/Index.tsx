
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FoodComparison from '@/components/FoodComparison';
import BMICalculator from '@/components/BMICalculator';
import NutritionChatbot from '@/components/NutritionChatbot';
import MealRecognition from '@/components/MealRecognition';
import WellnessJourney from '@/components/WellnessJourney';
import BodyTypeGuide from '@/components/BodyTypeGuide';
import Footer from '@/components/Footer';

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
      <main>
        <HeroSection />
        <FoodComparison />
        <BMICalculator />
        <NutritionChatbot />
        <MealRecognition />
        <WellnessJourney />
        <BodyTypeGuide />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
