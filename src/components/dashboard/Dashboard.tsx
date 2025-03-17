
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "../Upload";
import Results from "../Results";
import { DetectionResult } from "../../types";

const Dashboard = () => {
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    
    if (!authToken || !userData) {
      navigate("/login");
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Error parsing user data", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const handleResultsReceived = (result: DetectionResult, url: string) => {
    setDetectionResult(result);
    setImageUrl(url);
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setDetectionResult(null);
    setImageUrl("");
  };

  if (!user) {
    return <div className="section-padding pt-28">Loading...</div>;
  }

  return (
    <div className="section-padding pt-28">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-2">Welcome, {user.name}</h1>
          <p className="text-gray-600">
            Upload a chest X-ray image to detect pneumonia
          </p>
        </div>

        {!showResults ? (
          <Upload onResultsReceived={handleResultsReceived} />
        ) : (
          detectionResult && (
            <Results
              result={detectionResult}
              imageUrl={imageUrl}
              onReset={handleReset}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
