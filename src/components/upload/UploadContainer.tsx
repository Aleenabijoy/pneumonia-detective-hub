
import { useState } from "react";
import { DetectionResult, UploadStatus } from "../../types";
import FileUploader from "./FileUploader";
import ImagePreview from "./ImagePreview";
import { fileToDataUrl, analyzeLungImage } from "../../services/imageService";
import { toast } from "@/components/ui/use-toast";

interface UploadContainerProps {
  onResultsReceived: (result: DetectionResult, imageUrl: string) => void;
}

const UploadContainer = ({ onResultsReceived }: UploadContainerProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    isUploading: false,
    progress: 0,
    error: null
  });

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

  const handleReset = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all
          ${uploadStatus.isUploading
            ? "border-medical-300 bg-medical-50/50"
            : "border-gray-300 hover:border-medical-300 bg-gray-50/50 hover:bg-medical-50/50"
          }`}
      >
        {!previewUrl ? (
          <FileUploader onFileSelected={handleFileSelected} />
        ) : (
          <ImagePreview
            previewUrl={previewUrl}
            isUploading={uploadStatus.isUploading}
            progress={uploadStatus.progress}
            onReset={handleReset}
            onAnalyzeAgain={() => selectedFile && handleFileSelected(selectedFile)}
          />
        )}
      </div>
    </div>
  );
};

export default UploadContainer;
