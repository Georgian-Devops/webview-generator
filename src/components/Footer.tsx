
import React from 'react';
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn(
      "w-full py-8 px-6 md:px-10 mt-auto border-t border-border/50",
      className
    )}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center mr-2">
            <div className="text-primary font-bold text-sm">W</div>
          </div>
          <span className="text-sm text-foreground/70">WebView Generator</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <span className="text-xs text-muted-foreground mb-2 md:mb-0">
            © {currentYear} WebView Generator. All rights reserved.
          </span>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-xs text-foreground/70 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-foreground/70 hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
