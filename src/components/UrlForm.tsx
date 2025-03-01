
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";

interface UrlFormProps {
  className?: string;
  onSubmit: (url: string) => void;
  isProcessing: boolean;
}

const UrlForm: React.FC<UrlFormProps> = ({ 
  className, 
  onSubmit,
  isProcessing 
}) => {
  const [url, setUrl] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  
  // Simple URL validation
  const validateUrl = (input: string): boolean => {
    try {
      const parsedUrl = new URL(input);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrl(input);
    
    if (input.trim() === '') {
      setIsValidated(false);
      setValidationMessage('');
    } else if (validateUrl(input)) {
      setIsValidated(true);
      setValidationMessage('Valid URL');
    } else {
      setIsValidated(false);
      setValidationMessage('Please enter a valid URL (e.g., https://example.com)');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUrl(url)) {
      onSubmit(url);
    }
  };
  
  return (
    <div className={cn(
      "w-full max-w-xl mx-auto",
      className
    )}>
      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 animate-fade-in">
        <div className="mb-5">
          <label htmlFor="url-input" className="block text-sm font-medium mb-2 text-foreground">
            Website URL
          </label>
          <div className="relative">
            <Input
              id="url-input"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={handleInputChange}
              className="pr-10 h-12 rounded-lg shadow-sm text-base"
              disabled={isProcessing}
              autoComplete="off"
            />
            {url && isValidated && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500 animate-fade-in" />
            )}
            {url && !isValidated && (
              <ExternalLink className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-fade-in" />
            )}
          </div>
          {validationMessage && (
            <p className={cn(
              "mt-2 text-xs animate-fade-in",
              isValidated ? "text-green-600" : "text-red-500"
            )}>
              {validationMessage}
            </p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 rounded-lg font-medium text-base shadow-soft transition-all duration-300 flex items-center justify-center space-x-2 group"
          disabled={!isValidated || isProcessing}
        >
          <span>{isProcessing ? 'Processing...' : 'Generate WebView App'}</span>
          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <p className="mt-4 text-xs text-center text-muted-foreground">
          By submitting, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a>
        </p>
      </form>
    </div>
  );
};

export default UrlForm;
