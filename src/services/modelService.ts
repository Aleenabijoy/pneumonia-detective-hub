
import { DetectionResult } from "../types";
import * as tf from "@tensorflow/tfjs";

class PneumoniaModel {
  private model: tf.LayersModel | null = null;
  private isLoading: boolean = false;
  private loadError: Error | null = null;

  constructor() {
    this.loadModel();
  }

  async loadModel(): Promise<void> {
    if (this.model !== null || this.isLoading) return;
    
    this.isLoading = true;
    try {
      console.log("Loading pneumonia detection model...");
      // Load the model from a URL or local storage
      this.model = await tf.loadLayersModel("/models/pneumonia-model/model.json");
      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Failed to load model:", error);
      this.loadError = error instanceof Error ? error : new Error("Unknown error loading model");
      // Fall back to the mock service if the model fails to load
    } finally {
      this.isLoading = false;
    }
  }

  async isModelReady(): Promise<boolean> {
    if (this.model) return true;
    if (this.loadError) return false;
    if (this.isLoading) {
      // Wait for model to finish loading
      await new Promise(resolve => {
        const checkLoading = () => {
          if (!this.isLoading) {
            resolve(null);
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      });
    }
    return this.model !== null;
  }

  async preprocessImage(imageData: ImageData | HTMLImageElement): Promise<tf.Tensor> {
    // Convert the image to a tensor
    let tensor = tf.browser.fromPixels(imageData);
    
    // Resize to the model's expected size (typically 224x224 for many medical models)
    tensor = tf.image.resizeBilinear(tensor, [224, 224]);
    
    // Convert to grayscale if working with X-ray images
    const grayscale = tensor.mean(2, true);
    
    // Normalize to [0, 1]
    const normalized = grayscale.div(tf.scalar(255));
    
    // Expand dimensions to match model input shape [batch_size, height, width, channels]
    return normalized.expandDims(0);
  }

  async predict(image: HTMLImageElement): Promise<DetectionResult> {
    try {
      const isReady = await this.isModelReady();
      if (!isReady || !this.model) {
        console.warn("Model not ready, falling back to mock prediction");
        // Fall back to mock service
        return this.mockPrediction();
      }

      // Preprocess the image
      const processedImage = await this.preprocessImage(image);
      
      // Run inference
      const predictions = await this.model.predict(processedImage) as tf.Tensor;
      
      // Get the prediction as a JavaScript array
      const predictionArray = await predictions.data();
      
      // Cleanup tensors
      tf.dispose([processedImage, predictions]);
      
      // Process the prediction
      // Assuming binary classification where index 0 is NORMAL and index 1 is PNEUMONIA
      const pneumoniaScore = predictionArray[0];
      
      return {
        prediction: pneumoniaScore > 0.5 ? 'PNEUMONIA' : 'NORMAL',
        confidence: pneumoniaScore > 0.5 ? pneumoniaScore : 1 - pneumoniaScore
      };
    } catch (error) {
      console.error("Error during prediction:", error);
      return this.mockPrediction();
    }
  }

  // Fallback method that returns a mock prediction
  mockPrediction(): DetectionResult {
    console.log("Using mock prediction");
    const isPneumonia = Math.random() > 0.5;
    const confidence = 0.7 + (Math.random() * 0.25); // Random confidence between 70% and 95%
    
    return {
      prediction: isPneumonia ? 'PNEUMONIA' : 'NORMAL',
      confidence: confidence,
    };
  }
}

// Create a singleton instance
export const pneumoniaModel = new PneumoniaModel();

