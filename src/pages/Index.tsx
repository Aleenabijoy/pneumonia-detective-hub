
import Hero from "../components/Hero";
import Upload from "../components/Upload";
import { useState } from "react";
import { DetectionResult } from "../types";
import Results from "../components/Results";

const Index = () => {
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
