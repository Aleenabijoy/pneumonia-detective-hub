
import UploadContainer from "./upload/UploadContainer";
import { DetectionResult } from "../types";

interface UploadProps {
  onResultsReceived: (result: DetectionResult, imageUrl: string) => void;
}

const Upload = ({ onResultsReceived }: UploadProps) => {
  return <UploadContainer onResultsReceived={onResultsReceived} />;
};

export default Upload;
