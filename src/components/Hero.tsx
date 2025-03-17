
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full bg-medical-100/30 blur-3xl" />
        <div className="absolute -left-40 -bottom-40 w-[600px] h-[600px] rounded-full bg-medical-100/30 blur-3xl" />
      </div>
      
      <div 
        className={`section-padding z-10 flex flex-col items-center text-center transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
      >
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-medical-50 border border-medical-100">
          <span className="text-xs font-medium text-medical-800">Advanced AI-Powered Detection</span>
        </div>
        
        <h1 className="heading-xl max-w-4xl mb-6 bg-clip-text">
          Pneumonia Detection System
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10">
          Advanced AI technology for rapid and accurate pneumonia detection from chest X-rays,
          helping medical professionals make informed decisions faster.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            size="lg" 
            className="bg-medical-600 hover:bg-medical-700 text-white px-8"
            onClick={() => document.getElementById("detection")?.scrollIntoView({ behavior: "smooth" })}
          >
            Try Detection
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-medical-200 hover:bg-medical-50"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-20 max-w-5xl mx-auto relative">
          <div className="subtle-ring glassmorphism rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Medical professional analyzing x-rays" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg subtle-ring flex items-center space-x-4">
            <div className="p-2 bg-green-50 rounded-full">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium">98% accuracy in clinical trials</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-xs text-foreground/50 mb-2">Scroll to explore</span>
        <svg className="w-5 h-5 text-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
