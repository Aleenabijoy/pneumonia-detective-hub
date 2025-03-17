
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ImagePreviewProps {
  previewUrl: string;
  isUploading: boolean;
  progress: number;
  onReset: () => void;
  onAnalyzeAgain: () => void;
}

const ImagePreview = ({
  previewUrl,
  isUploading,
  progress,
  onReset,
  onAnalyzeAgain
}: ImagePreviewProps) => {
  return (
    <div className="w-full">
      <div className="relative mx-auto max-w-xs overflow-hidden rounded-lg shadow-md">
        <img
          src={previewUrl}
          alt="X-ray preview"
          className="w-full h-auto object-cover"
        />
        {isUploading && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-white text-sm font-medium">
              Processing...
            </div>
          </div>
        )}
      </div>
      
      {isUploading && (
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-center mt-2">
            Analyzing image... {Math.round(progress)}%
          </p>
        </div>
      )}
      
      {!isUploading && (
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline"
            onClick={onReset}
            className="mr-2"
          >
            Remove
          </Button>
          <Button
            onClick={onAnalyzeAgain}
            className="bg-medical-600 hover:bg-medical-700"
          >
            Analyze Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
