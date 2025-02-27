
import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Camera, Loader2 } from 'lucide-react';
import { analyzeMealImage } from '@/lib/api';
import { useToast } from "@/hooks/use-toast";

interface MealAnalysisResult {
  identifiedFoods: string[];
  nutritionalEstimate: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  healthAssessment: string;
}

const MealRecognition = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MealAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Reset previous results
    setResult(null);
    
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG)",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    
    setIsLoading(true);
    try {
      // Pass the base64 image to the API
      const base64Image = image.split(',')[1];
      const analysisResult = await analyzeMealImage(base64Image);
      setResult(analysisResult);
    } catch (error) {
      console.error("Error analyzing meal image:", error);
      toast({
        title: "Analysis failed",
        description: "We couldn't analyze this image. Please try another one or try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="meal-recognition" className="section-container">
      <h2 className="section-title">Meal Analysis</h2>
      <p className="section-subtitle">
        Upload a photo of your meal to get a nutritional breakdown
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="feature-card">
            {!image ? (
              <div
                className={`border-2 border-dashed rounded-xl p-8 h-64 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <div className="flex flex-col items-center text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Meal Image</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop an image here or click to browse
                  </p>
                  <button className="secondary-button text-sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Select Photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={image}
                    alt="Meal preview"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    className="primary-button"
                    onClick={analyzeImage}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={18} />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mr-2" size={18} />
                        Analyze Meal
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="feature-card">
            {result ? (
              <div className="h-full flex flex-col">
                <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
                
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Identified Foods:</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.identifiedFoods.map((food, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary rounded-full text-sm"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Nutritional Estimate:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-secondary rounded-xl">
                      <div className="text-sm">Calories</div>
                      <div className="text-xl font-semibold">{result.nutritionalEstimate.calories} kcal</div>
                    </div>
                    <div className="p-3 bg-secondary rounded-xl">
                      <div className="text-sm">Protein</div>
                      <div className="text-xl font-semibold">{result.nutritionalEstimate.protein}g</div>
                    </div>
                    <div className="p-3 bg-secondary rounded-xl">
                      <div className="text-sm">Carbs</div>
                      <div className="text-xl font-semibold">{result.nutritionalEstimate.carbs}g</div>
                    </div>
                    <div className="p-3 bg-secondary rounded-xl">
                      <div className="text-sm">Fat</div>
                      <div className="text-xl font-semibold">{result.nutritionalEstimate.fat}g</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <h4 className="font-medium text-sm mb-2">Health Assessment:</h4>
                  <p className="text-sm p-3 bg-secondary rounded-xl">
                    {result.healthAssessment}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Meal Analyzed Yet</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a photo of your meal and click "Analyze Meal" to see nutritional information.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealRecognition;
