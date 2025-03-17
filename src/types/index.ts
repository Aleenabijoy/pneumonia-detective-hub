
export interface DetectionResult {
  prediction: 'PNEUMONIA' | 'NORMAL';
  confidence: number;
  heatmap?: string; // Base64 encoded heatmap image
}

export interface UploadStatus {
  isUploading: boolean;
  progress: number;
  error: string | null;
}
