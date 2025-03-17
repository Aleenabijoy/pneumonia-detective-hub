
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300 ease-in-out",
        scrolled
          ? "glassmorphism py-2 shadow-sm"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-medical-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">PD</span>
          </div>
          <span className="font-medium text-lg">PneumoDetect</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#detection" className="text-foreground/80 hover:text-foreground transition-colors">
            Detection
          </a>
          <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="hidden sm:flex"
            size="sm"
          >
            Documentation
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-medical-600 hover:bg-medical-700 text-white"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
