
import { useState } from 'react';
import { ArrowRight, Loader2, BarChart3, ChevronDown } from 'lucide-react';
import { getFoodComparisonData } from '@/lib/api';
import { useToast } from "@/hooks/use-toast";

interface FoodData {
  name: string;
  calories: number;
  protein: number;
  fats: number;
  carbs: {
    total: number;
    fiber: number;
  };
}

interface ComparisonResult {
  food1: FoodData;
  food2: FoodData;
}

const commonFoods = [
  'Chicken breast',
  'Salmon',
  'Beef',
  'Tofu',
  'Eggs',
  'Quinoa',
  'Brown rice',
  'White rice',
  'Sweet potato',
  'Avocado',
  'Broccoli',
  'Spinach',
  'Greek yogurt',
  'Cheddar cheese',
  'Almonds',
  'Peanut butter',
  'Black beans',
  'Lentils',
  'Banana',
  'Apple',
];

const FoodComparison = () => {
  const [food1, setFood1] = useState('');
  const [food2, setFood2] = useState('');
  const [grams1, setGrams1] = useState(100);
  const [grams2, setGrams2] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const { toast } = useToast();

  const handleCompare = async () => {
    if (!food1 || !food2) {
      toast({
        title: "Missing foods",
        description: "Please select both foods to compare",
        variant: "destructive",
      });
      return;
    }

    if (grams1 <= 0 || grams2 <= 0) {
      toast({
        title: "Invalid amount",
        description: "Food amounts must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await getFoodComparisonData(food1, food2, grams1, grams2);
      setResult(data);
    } catch (error) {
      console.error("Error comparing foods:", error);
      toast({
        title: "Comparison failed",
        description: "We couldn't compare these foods. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderNutritionCard = (title: string, data: FoodData, grams: number) => (
    <div className="feature-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{data.name}</h3>
        <span className="text-sm text-muted-foreground">{grams}g</span>
      </div>
      
      <div className="space-y-4">
        <NutritionItem 
          label="Calories" 
          value={`${data.calories} kcal`}
          percentage={result ? (data.calories / Math.max(result.food1.calories, result.food2.calories)) * 100 : 100}
        />
        
        <NutritionItem 
          label="Protein" 
          value={`${data.protein}g`}
          percentage={result ? (data.protein / Math.max(result.food1.protein, result.food2.protein)) * 100 : 100}
        />
        
        <NutritionItem 
          label="Fats" 
          value={`${data.fats}g`}
          percentage={result ? (data.fats / Math.max(result.food1.fats, result.food2.fats)) * 100 : 100}
        />
        
        <NutritionItem 
          label="Carbs (total)" 
          value={`${data.carbs.total}g`}
          percentage={result ? (data.carbs.total / Math.max(result.food1.carbs.total, result.food2.carbs.total)) * 100 : 100}
        />
        
        <NutritionItem 
          label="Fiber" 
          value={`${data.carbs.fiber}g`}
          percentage={result ? (data.carbs.fiber / Math.max(result.food1.carbs.fiber, result.food2.carbs.fiber)) * 100 : 100}
        />
      </div>
    </div>
  );

  return (
    <section id="food-comparison" className="section-container">
      <h2 className="section-title">Food Comparison</h2>
      <p className="section-subtitle">
        Compare the nutritional values of different foods to make informed dietary choices
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="feature-card">
          <h3 className="text-lg font-semibold mb-4">First Food</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="food1" className="block text-sm font-medium mb-1">
                Select Food
              </label>
              <div className="relative">
                <select
                  id="food1"
                  value={food1}
                  onChange={(e) => setFood1(e.target.value)}
                  className="input-field appearance-none pr-10"
                >
                  <option value="">Select a food</option>
                  {commonFoods.map((food) => (
                    <option key={food} value={food}>
                      {food}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
              </div>
            </div>

            <div>
              <label htmlFor="grams1" className="block text-sm font-medium mb-1">
                Amount (grams)
              </label>
              <input
                id="grams1"
                type="number"
                min="1"
                value={grams1}
                onChange={(e) => setGrams1(parseInt(e.target.value) || 0)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="feature-card">
          <h3 className="text-lg font-semibold mb-4">Second Food</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="food2" className="block text-sm font-medium mb-1">
                Select Food
              </label>
              <div className="relative">
                <select
                  id="food2"
                  value={food2}
                  onChange={(e) => setFood2(e.target.value)}
                  className="input-field appearance-none pr-10"
                >
                  <option value="">Select a food</option>
                  {commonFoods.map((food) => (
                    <option key={food} value={food}>
                      {food}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
              </div>
            </div>

            <div>
              <label htmlFor="grams2" className="block text-sm font-medium mb-1">
                Amount (grams)
              </label>
              <input
                id="grams2"
                type="number"
                min="1"
                value={grams2}
                onChange={(e) => setGrams2(parseInt(e.target.value) || 0)}
                className="input-field"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-10">
        <button
          className="primary-button flex items-center gap-2"
          onClick={handleCompare}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>Comparing...</span>
            </>
          ) : (
            <>
              <BarChart3 size={18} />
              <span>Compare Foods</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          {renderNutritionCard("Food 1", result.food1, grams1)}
          {renderNutritionCard("Food 2", result.food2, grams2)}
        </div>
      )}
    </section>
  );
};

const NutritionItem = ({ label, value, percentage }: { label: string; value: string; percentage: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center text-sm">
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
    <div className="w-full bg-secondary rounded-full h-2">
      <div
        className="bg-primary rounded-full h-2 transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default FoodComparison;
