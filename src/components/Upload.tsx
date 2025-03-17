
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { fileToDataUrl, analyzeLungImage } from "../services/imageService";
import { DetectionResult, UploadStatus } from "../types";
import { toast } from "@/components/ui/use-toast";

interface UploadProps {
  onResultsReceived: (result: DetectionResult, imageUrl: string) => void;
}

const Upload = ({ onResultsReceived }: UploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    isUploading: false,
    progress: 0,
    error: null
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate upload progress
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 95) {
        progress = 95;
        clearInterval(interval);
      }
      setUploadStatus(prev => ({ ...prev, progress }));
    }, 300);
    return () => clearInterval(interval);
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        await handleFileSelected(file);
      } else {
        toast({
          title: "Invalid file",
          description: "Please upload a valid image file.",
          variant: "destructive"
        });
      }
    },
    [onResultsReceived]
  );

  const handleFileSelected = async (file: File) => {
    try {
      // Reset state
      setUploadStatus({
        isUploading: true,
        progress: 0,
        error: null
      });
      
      // Preview the image
      const dataUrl = await fileToDataUrl(file);
      setPreviewUrl(dataUrl);
      setSelectedFile(file);
      
      // Simulate progress
      const clearProgress = simulateProgress();
      
      // Process the image
      const result = await analyzeLungImage(file);
      
      // Complete the progress
      setUploadStatus(prev => ({ ...prev, progress: 100 }));
      
      // Clean up and pass results
      setTimeout(() => {
        onResultsReceived(result, dataUrl);
        setUploadStatus({
          isUploading: false,
          progress: 0,
          error: null
        });
        clearProgress();
      }, 500);
      
    } catch (error) {
      setUploadStatus({
        isUploading: false,
        progress: 0,
        error: error instanceof Error ? error.message : "An unknown error occurred"
      });
      
      toast({
        title: "Error",
        description: uploadStatus.error || "An error occurred while processing your image.",
        variant: "destructive"
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all
          ${uploadStatus.isUploading
            ? "border-medical-300 bg-medical-50/50"
            : "border-gray-300 hover:border-medical-300 bg-gray-50/50 hover:bg-medical-50/50"
          }`}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileSelected(file);
            }
          }}
        />
        
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          {!previewUrl ? (
            <>
              <div className="w-16 h-16 rounded-full bg-medical-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-medical-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium">Upload chest X-ray image</p>
                <p className="text-sm text-gray-500 mt-1">
                  Drag and drop an image, or click to browse
                </p>
              </div>
              <Button 
                onClick={triggerFileInput}
                className="bg-medical-600 hover:bg-medical-700"
              >
                Select Image
              </Button>
            </>
          ) : (
            <div className="w-full">
              <div className="relative mx-auto max-w-xs overflow-hidden rounded-lg shadow-md">
                <img
                  src={previewUrl}
                  alt="X-ray preview"
                  className="w-full h-auto object-cover"
                />
                {uploadStatus.isUploading && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="text-white text-sm font-medium">
                      Processing...
                    </div>
                  </div>
                )}
              </div>
              
              {uploadStatus.isUploading && (
                <div className="mt-4">
                  <Progress value={uploadStatus.progress} className="h-2" />
                  <p className="text-sm text-center mt-2">
                    Analyzing image... {Math.round(uploadStatus.progress)}%
                  </p>
                </div>
              )}
              
              {!uploadStatus.isUploading && (
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setPreviewUrl(null);
                      setSelectedFile(null);
                    }}
                    className="mr-2"
                  >
                    Remove
                  </Button>
                  <Button
                    onClick={() => selectedFile && handleFileSelected(selectedFile)}
                    className="bg-medical-600 hover:bg-medical-700"
                  >
                    Analyze Again
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
