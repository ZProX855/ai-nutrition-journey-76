
import { useState } from 'react';
import { getBodyTypeRecommendations } from '@/lib/api';
import { useToast } from "@/hooks/use-toast";
import { Dumbbell, Utensils, Info, Loader2 } from 'lucide-react';

type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';

interface BodyTypeInfo {
  title: string;
  description: string;
  characteristics: string[];
  image: string;
}

interface RecommendationsData {
  bodyType: BodyType;
  characteristics: string[];
  nutritionTips: string[];
  exerciseRecommendations: string[];
  challengesAndSolutions: {
    [key: string]: string;
  };
}

const bodyTypes: Record<BodyType, BodyTypeInfo> = {
  ectomorph: {
    title: 'Ectomorph',
    description: 'Naturally thin with a lean build, narrow shoulders and hips, and typically low body fat.',
    characteristics: [
      'Difficulty gaining weight',
      'Fast metabolism',
      'Long, thin muscles',
      'Narrow shoulders and hips',
      'Small joints'
    ],
    image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  mesomorph: {
    title: 'Mesomorph',
    description: 'Athletic and well-built with a moderate metabolism and responsive muscle cells.',
    characteristics: [
      'Athletic appearance',
      'Gains muscle easily',
      'Moderate metabolism',
      'Rectangular shaped body',
      'Efficient at burning calories'
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  endomorph: {
    title: 'Endomorph',
    description: 'Naturally higher body fat, generally softer and rounder physique with slower metabolism.',
    characteristics: [
      'Soft, round body',
      'Stores fat easily',
      'Slower metabolism',
      'Difficulty losing weight',
      'Strong lower body'
    ],
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
};

const BodyTypeGuide = () => {
  const [activeType, setActiveType] = useState<BodyType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationsData | null>(null);
  const { toast } = useToast();

  const handleTypeSelect = async (type: BodyType) => {
    setActiveType(type);
    setIsLoading(true);
    
    try {
      const data = await getBodyTypeRecommendations(type);
      setRecommendations(data);
    } catch (error) {
      console.error("Error getting body type recommendations:", error);
      toast({
        title: "Couldn't get recommendations",
        description: "We couldn't load personalized information for this body type. Please try again later.",
        variant: "destructive",
      });
      setRecommendations(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="body-type" className="section-container">
      <h2 className="section-title">Understand Your Body Type</h2>
      <p className="section-subtitle">
        Learn about different body types and get personalized recommendations
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {Object.entries(bodyTypes).map(([type, info]) => (
          <button
            key={type}
            className={`feature-card text-left cursor-pointer transition-all duration-300 ${
              activeType === type ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleTypeSelect(type as BodyType)}
          >
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
              <img
                src={info.image}
                alt={info.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-xl font-bold text-white">{info.title}</h3>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
            
            <ul className="text-sm space-y-1 mb-2">
              {info.characteristics.slice(0, 3).map((characteristic, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {characteristic}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="feature-card flex items-center justify-center py-12 animate-pulse">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-lg">Loading recommendations...</span>
        </div>
      )}

      {!isLoading && activeType && recommendations && (
        <div className="feature-card animate-fade-in">
          <h3 className="text-2xl font-bold mb-6">{bodyTypes[activeType].title} Recommendations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Utensils className="text-primary w-6 h-6 mr-2" />
                <h4 className="text-lg font-semibold">Nutrition Tips</h4>
              </div>
              
              <ul className="space-y-2 mb-6">
                {recommendations.nutritionTips.map((tip, index) => (
                  <li key={index} className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center mb-4">
                <Info className="text-primary w-6 h-6 mr-2" />
                <h4 className="text-lg font-semibold">Challenges & Solutions</h4>
              </div>
              
              <div className="space-y-3">
                {Object.entries(recommendations.challengesAndSolutions).map(([challenge, solution], index) => (
                  <div key={index} className="p-3 bg-secondary rounded-xl">
                    <p className="font-medium mb-1">{challenge}</p>
                    <p className="text-sm text-muted-foreground">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <Dumbbell className="text-primary w-6 h-6 mr-2" />
                <h4 className="text-lg font-semibold">Exercise Recommendations</h4>
              </div>
              
              <ul className="space-y-2">
                {recommendations.exerciseRecommendations.map((rec, index) => (
                  <li key={index} className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BodyTypeGuide;
