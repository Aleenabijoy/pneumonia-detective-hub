
import { DetectionResult } from "../types";
import { pneumoniaModel } from "./modelService";

// Function to convert File to base64 string for preview
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeLungImage = async (imageFile: File): Promise<DetectionResult> => {
  try {
    // Create a FormData instance (for potential future API integration)
    const formData = new FormData();
    formData.append('image', imageFile);

    // Convert the file to a data URL for the image element
    const imageUrl = await fileToDataUrl(imageFile);
    
    // Create an image element for the model
    const img = new Image();
    const imageLoaded = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image"));
    });
    
    // Set the source and wait for it to load
    img.src = imageUrl;
    await imageLoaded;
    
    // Now use the model to predict
    return await pneumoniaModel.predict(img);
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze the image. Please try again.');
  }
};
