// API constants and helper functions for Google Gemini 1.5 API
const GEMINI_API_KEY = 'AIzaSyDmoumroXhKpFdcPBqhrw6W6F_PZp--LMI'; // Note: In a real app, this should be stored securely
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiRequest {
  prompt: string;
  temperature?: number;
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  error?: {
    message: string;
  };
}

export const queryGeminiAPI = async (request: GeminiRequest): Promise<string> => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: request.prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: request.temperature || 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to communicate with Gemini API');
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error querying Gemini API:', error);
    throw error;
  }
};

export const getFoodComparisonData = async (food1: string, food2: string, grams1: number, grams2: number) => {
  const prompt = `Compare the nutritional values of ${grams1}g ${food1} vs ${grams2}g ${food2} in terms of calories, protein, fats, and carbohydrates (total & fiber). 
  Please format your response as a JSON object with the following structure:
  {
    "food1": {
      "name": "${food1}",
      "calories": number,
      "protein": number,
      "fats": number,
      "carbs": {
        "total": number,
        "fiber": number
      }
    },
    "food2": {
      "name": "${food2}",
      "calories": number,
      "protein": number,
      "fats": number,
      "carbs": {
        "total": number,
        "fiber": number
      }
    }
  }`;

  try {
    const response = await queryGeminiAPI({ prompt, temperature: 0.1 });
    // Extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse nutrition data');
  } catch (error) {
    console.error('Error getting food comparison:', error);
    throw error;
  }
};

export const getBMIRecommendations = async (bmi: number, height: number, weight: number) => {
  const prompt = `I have calculated my BMI as ${bmi.toFixed(1)} based on a height of ${height} cm and weight of ${weight} kg.
  Please provide personalized recommendations for my health based on this BMI value.
  Consider diet, exercise, and general wellness in your response.
  Format your response as a JSON object with the following structure:
  {
    "bmiCategory": "string",
    "recommendations": {
      "diet": ["string", "string"],
      "exercise": ["string", "string"],
      "general": ["string", "string"]
    }
  }
  Keep your tone friendly and informal like a nutrition doctor. Use simple language and organize your recommendations in an easy-to-understand way.`;

  try {
    const response = await queryGeminiAPI({ prompt, temperature: 0.7 });
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse BMI recommendations');
  } catch (error) {
    console.error('Error getting BMI recommendations:', error);
    throw error;
  }
};

export const getChatbotResponse = async (question: string) => {
  const prompt = `As Dr. Nutri, a friendly nutrition expert, provide a concise, practical response to: "${question}"
  Requirements:
  - Keep your response under 100 words
  - Use bullet points to organize information
  - Be direct and practical
  - Use emojis sparingly (max 2) to maintain friendliness
  - Focus on actionable advice
  - End with a short, relevant follow-up question
  - Format: Start with a one-line greeting, then bullet points, then question`;

  try {
    return await queryGeminiAPI({ prompt, temperature: 0.7 });
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    throw error;
  }
};

export const analyzeMealImage = async (imageBase64: string, weightInGrams?: number) => {
  const prompt = `Analyze this meal image in detail and provide nutritional information${weightInGrams ? ` for ${weightInGrams}g of the meal` : ''}.
  Keep the analysis concise and practical.
  Format your response as a JSON object with:
  {
    "identifiedFoods": ["List", "each", "ingredient"],
    "nutritionalEstimate": {
      "calories": number per ${weightInGrams ? weightInGrams : 100}g,
      "protein": number in g,
      "carbs": number in g,
      "fat": number in g,
      "fiber": number in g
    },
    "healthAssessment": "2-3 sentence practical assessment"
  }`;

  try {
    const response = await queryGeminiAPI({ prompt, temperature: 0.2 });
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse meal analysis');
  } catch (error) {
    console.error('Error analyzing meal image:', error);
    throw error;
  }
};

export const getBodyTypeRecommendations = async (bodyType: 'ectomorph' | 'mesomorph' | 'endomorph') => {
  const prompt = `Provide nutrition and exercise recommendations for someone with an ${bodyType} body type.
  Format your response as a JSON object with the following structure:
  {
    "bodyType": "${bodyType}",
    "characteristics": ["string", "string", ...],
    "nutritionTips": ["string", "string", ...],
    "exerciseRecommendations": ["string", "string", ...],
    "challengesAndSolutions": {
      "challenge1": "solution1",
      "challenge2": "solution2"
    }
  }
  Use friendly, informal language and make the recommendations easy to understand.`;

  try {
    const response = await queryGeminiAPI({ prompt, temperature: 0.3 });
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse body type recommendations');
  } catch (error) {
    console.error('Error getting body type recommendations:', error);
    throw error;
  }
};
