
import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

const FileUploader = ({ onFileSelected }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelected(file);
      } else {
        toast({
          title: "Invalid file",
          description: "Please upload a valid image file.",
          variant: "destructive"
        });
      }
    },
    [onFileSelected]
  );

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={handleDrop}
      className="flex flex-col items-center justify-center space-y-6 text-center"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onFileSelected(file);
          }
        }}
      />
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
    </div>
  );
};

export default FileUploader;
