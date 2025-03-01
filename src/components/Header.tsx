
import React from 'react';
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "w-full py-6 px-6 md:px-10 flex items-center justify-between z-10 animate-fade-in",
      className
    )}>
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
          <div className="text-primary-foreground font-bold text-xl">W</div>
        </div>
        <span className="font-medium text-lg tracking-tight">WebView Generator</span>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#features" className="text-sm text-foreground/80 hover:text-accent transition-colors">
          Features
        </a>
        <a href="#how-it-works" className="text-sm text-foreground/80 hover:text-accent transition-colors">
          How It Works
        </a>
        <a href="#faq" className="text-sm text-foreground/80 hover:text-accent transition-colors">
          FAQ
        </a>
      </nav>
    </header>
  );
};

export default Header;
