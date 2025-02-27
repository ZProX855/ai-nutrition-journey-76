
import { useState } from 'react';
import { Calculator, CheckCircle, Loader2 } from 'lucide-react';
import { getBMIRecommendations } from '@/lib/api';
import { useToast } from "@/hooks/use-toast";

interface BMIResult {
  bmi: number;
  category: string;
  recommendations: {
    diet: string[];
    exercise: string[];
    general: string[];
  };
}

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BMIResult | null>(null);
  const { toast } = useToast();

  const calculateBMI = async () => {
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    if (!heightValue || !weightValue) {
      toast({
        title: "Missing values",
        description: "Please enter both height and weight",
        variant: "destructive",
      });
      return;
    }

    if (heightValue < 50 || heightValue > 300) {
      toast({
        title: "Invalid height",
        description: "Height should be between 50 and 300 cm",
        variant: "destructive",
      });
      return;
    }

    if (weightValue < 20 || weightValue > 500) {
      toast({
        title: "Invalid weight",
        description: "Weight should be between 20 and 500 kg",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Calculate BMI: weight (kg) / (height (m))^2
    const heightInMeters = heightValue / 100;
    const bmiValue = weightValue / (heightInMeters * heightInMeters);

    try {
      const recommendationsData = await getBMIRecommendations(bmiValue, heightValue, weightValue);
      
      setResult({
        bmi: bmiValue,
        category: recommendationsData.bmiCategory,
        recommendations: recommendationsData.recommendations,
      });
    } catch (error) {
      console.error("Error getting BMI recommendations:", error);
      // Even if recommendations fail, show basic BMI result
      setResult({
        bmi: bmiValue,
        category: getBMICategory(bmiValue),
        recommendations: {
          diet: [],
          exercise: [],
          general: [],
        },
      });
      
      toast({
        title: "Couldn't get detailed recommendations",
        description: "We've calculated your BMI, but couldn't get personalized recommendations. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    if (bmi < 35) return "Obesity Class I";
    if (bmi < 40) return "Obesity Class II";
    return "Obesity Class III";
  };

  return (
    <section id="bmi-calculator" className="section-container">
      <h2 className="section-title">BMI Calculator</h2>
      <p className="section-subtitle">
        Calculate your Body Mass Index and get personalized recommendations
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="feature-card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="height" className="block text-sm font-medium mb-1">
                Height (cm)
              </label>
              <input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 175"
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="weight" className="block text-sm font-medium mb-1">
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 70"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              className="primary-button flex items-center gap-2"
              onClick={calculateBMI}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <Calculator size={18} />
                  <span>Calculate BMI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="animate-fade-in">
            <div className="feature-card mb-6">
              <h3 className="text-lg font-semibold mb-2">Your Results</h3>
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <p className="text-sm text-muted-foreground">Your BMI</p>
                  <p className="text-4xl font-bold text-primary">{result.bmi.toFixed(1)}</p>
                  <p className="text-sm font-medium mt-1">{result.category}</p>
                </div>
                
                <div className="w-full sm:w-72 h-4 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.min(100, (result.bmi / 40) * 100)}%`,
                      background: `${getBMIColor(result.bmi)}`
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {(result.recommendations.diet.length > 0 || 
              result.recommendations.exercise.length > 0 ||
              result.recommendations.general.length > 0) && (
              <div className="feature-card animate-fade-in">
                <h3 className="text-lg font-semibold mb-4">Personalized Recommendations</h3>
                
                <div className="space-y-6">
                  {result.recommendations.diet.length > 0 && (
                    <RecommendationSection title="Diet" items={result.recommendations.diet} />
                  )}
                  
                  {result.recommendations.exercise.length > 0 && (
                    <RecommendationSection title="Exercise" items={result.recommendations.exercise} />
                  )}
                  
                  {result.recommendations.general.length > 0 && (
                    <RecommendationSection title="General Wellness" items={result.recommendations.general} />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const getBMIColor = (bmi: number): string => {
  if (bmi < 18.5) return '#3498db'; // Underweight - blue
  if (bmi < 25) return '#2ecc71';   // Normal - green
  if (bmi < 30) return '#f39c12';   // Overweight - orange
  return '#e74c3c';                 // Obese - red
};

const RecommendationSection = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="font-medium text-lg mb-2">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2">
          <CheckCircle className="text-primary h-5 w-5 shrink-0 mt-0.5" />
          <p>{item}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default BMICalculator;
