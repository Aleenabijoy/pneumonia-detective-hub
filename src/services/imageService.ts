
import { DetectionResult } from "../types";

// In a real application, this would communicate with a backend API
// For now, we'll simulate the detection with a mock response

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeLungImage = async (imageFile: File): Promise<DetectionResult> => {
  // Create a FormData instance to prepare for backend submission
  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    // Simulate network request
    await sleep(2000);
    
    // Mock response - in a real app this would be an actual API call
    // For example: const response = await fetch('/api/analyze', { method: 'POST', body: formData });
    
    // Generate a random result for demonstration purposes
    const isPneumonia = Math.random() > 0.5;
    const confidence = 0.7 + (Math.random() * 0.25); // Random confidence between 70% and 95%
    
    return {
      prediction: isPneumonia ? 'PNEUMONIA' : 'NORMAL',
      confidence: confidence,
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze the image. Please try again.');
  }
};

// Function to convert File to base64 string for preview
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
