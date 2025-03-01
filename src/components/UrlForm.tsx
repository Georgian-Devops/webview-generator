
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ExternalLink, Upload, Smartphone } from "lucide-react";
import { Label } from "@/components/ui/label";

interface UrlFormProps {
  className?: string;
  onSubmit: (url: string, appName: string, icon: File | null) => void;
  isProcessing: boolean;
}

const UrlForm: React.FC<UrlFormProps> = ({ 
  className, 
  onSubmit,
  isProcessing 
}) => {
  const [url, setUrl] = useState('');
  const [appName, setAppName] = useState('WebView App');
  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
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

  const handleAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.match('image.*')) {
        return;
      }
      
      setIcon(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setIconPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUrl(url)) {
      onSubmit(url, appName, icon);
    }
  };
  
  return (
    <div className={cn(
      "w-full max-w-xl mx-auto",
      className
    )}>
      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 animate-fade-in">
        <div className="mb-5">
          <Label htmlFor="url-input" className="block text-sm font-medium mb-2 text-foreground">
            Website URL
          </Label>
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

        <div className="mb-5">
          <Label htmlFor="app-name-input" className="block text-sm font-medium mb-2 text-foreground">
            App Name
          </Label>
          <Input
            id="app-name-input"
            type="text"
            placeholder="WebView App"
            value={appName}
            onChange={handleAppNameChange}
            className="h-12 rounded-lg shadow-sm text-base"
            disabled={isProcessing}
            autoComplete="off"
            maxLength={30}
          />
        </div>

        <div className="mb-5">
          <Label htmlFor="icon-upload" className="block text-sm font-medium mb-2 text-foreground">
            App Icon (Optional)
          </Label>
          <div className="flex items-center gap-4">
            <div 
              className={cn(
                "w-16 h-16 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden",
                iconPreview ? "border-primary/50 bg-primary/5" : "border-border bg-muted/50"
              )}
            >
              {iconPreview ? (
                <img 
                  src={iconPreview} 
                  alt="App icon preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Smartphone className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <label 
                htmlFor="icon-upload" 
                className="cursor-pointer flex items-center gap-2 p-3 border border-input bg-background rounded-md hover:bg-accent/10 transition-colors"
              >
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{icon ? 'Change Icon' : 'Upload Icon'}</span>
                <Input
                  id="icon-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  className="hidden"
                  disabled={isProcessing}
                />
              </label>
              <p className="mt-1 text-xs text-muted-foreground">Recommended: 512×512px PNG</p>
            </div>
          </div>
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
