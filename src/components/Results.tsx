
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { DetectionResult } from "../types";

interface ResultsProps {
  result: DetectionResult;
  imageUrl: string;
  onReset: () => void;
}

const Results = ({ result, imageUrl, onReset }: ResultsProps) => {
  const isPneumonia = result.prediction === 'PNEUMONIA';
  const confidencePercent = Math.round(result.confidence * 100);
  
  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <Card className="overflow-hidden">
        <CardHeader className={`${isPneumonia ? 'bg-red-50' : 'bg-green-50'} py-6`}>
          <CardTitle className="text-center text-2xl">
            {isPneumonia ? 'Pneumonia Detected' : 'No Pneumonia Detected'}
          </CardTitle>
          <CardDescription className="text-center text-base">
            Confidence: {confidencePercent}%
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="rounded-lg overflow-hidden border shadow-sm">
                <img 
                  src={imageUrl} 
                  alt="Uploaded X-ray" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium mb-3">Analysis Results</h3>
                <Alert variant={isPneumonia ? "destructive" : "default"} className="mb-4">
                  <AlertTitle>
                    {isPneumonia 
                      ? "Warning: Pneumonia Indicators Present" 
                      : "Good News: No Pneumonia Indicators"}
                  </AlertTitle>
                  <AlertDescription>
                    {isPneumonia
                      ? "Our system has detected patterns consistent with pneumonia. Please consult a healthcare professional for proper diagnosis."
                      : "Our system did not detect patterns associated with pneumonia. However, always consult a healthcare professional for medical advice."}
                  </AlertDescription>
                </Alert>
                
                <div className="text-sm">
                  <p className="mb-2">
                    <span className="font-medium">Prediction:</span> {result.prediction}
                  </p>
                  <p>
                    <span className="font-medium">Confidence Score:</span> {confidencePercent}%
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>This is not a medical diagnosis. Always consult with healthcare professionals.</p>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t p-4">
          <Button 
            onClick={onReset}
            className="bg-medical-600 hover:bg-medical-700"
          >
            Analyze Another Image
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Results;
