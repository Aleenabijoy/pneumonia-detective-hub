
import Hero from "../components/Hero";
import Upload from "../components/Upload";
import { useState } from "react";
import { DetectionResult } from "../types";
import Results from "../components/Results";
import { useModelStatus } from "../hooks/useModelStatus";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { isModelLoaded, isLoading, error } = useModelStatus();

  const handleResultsReceived = (detectionResult: DetectionResult, uploadedImageUrl: string) => {
    setResult(detectionResult);
    setImageUrl(uploadedImageUrl);
  };

  const handleReset = () => {
    setResult(null);
    setImageUrl(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Pneumonia Detection System</h2>
          
          {isLoading ? (
            <div className="text-center p-8">
              <div className="animate-pulse flex space-x-4 justify-center items-center mb-4">
                <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                <div className="h-4 bg-gray-300 rounded w-48"></div>
              </div>
              <p className="text-gray-600">Loading pneumonia detection model...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Model Loading Error</AlertTitle>
              <AlertDescription>
                {error}. Using fallback detection method instead.
              </AlertDescription>
            </Alert>
          ) : !isModelLoaded && (
            <Alert className="mb-6">
              <AlertTitle>Using Simulation Mode</AlertTitle>
              <AlertDescription>
                The AI model couldn't be loaded. The system is running in simulation mode with mock predictions.
              </AlertDescription>
            </Alert>
          )}
          
          {!result ? (
            <>
              <p className="text-lg text-center mb-8 text-gray-600">
                Upload a chest X-ray image to analyze for pneumonia indicators
              </p>
              <Upload onResultsReceived={handleResultsReceived} />
            </>
          ) : (
            <Results 
              result={result} 
              imageUrl={imageUrl || ''} 
              onReset={handleReset} 
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 Pneumonia Detection System. This tool is for educational purposes only.</p>
          <p className="mt-2 text-sm">Not intended for medical diagnosis. Always consult with healthcare professionals.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
