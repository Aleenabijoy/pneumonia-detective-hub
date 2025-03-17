
import { useState, useEffect } from 'react';
import { pneumoniaModel } from '../services/modelService';

export const useModelStatus = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const checkModelStatus = async () => {
      try {
        setIsLoading(true);
        const isReady = await pneumoniaModel.isModelReady();
        
        if (isMounted) {
          setIsModelLoaded(isReady);
          setIsLoading(false);
          
          if (!isReady) {
            // If not ready yet, check again in a second
            setTimeout(checkModelStatus, 1000);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error checking model status');
          setIsLoading(false);
        }
      }
    };
    
    checkModelStatus();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return { isModelLoaded, isLoading, error };
};
