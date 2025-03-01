
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Share2, Smartphone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ApkGeneratorProps {
  className?: string;
  url: string;
  onReset: () => void;
}

const ApkGenerator: React.FC<ApkGeneratorProps> = ({ 
  className, 
  url,
  onReset
}) => {
  const { toast } = useToast();
  const [generationState, setGenerationState] = useState<'generating' | 'ready'>('generating');
  const [progress, setProgress] = useState(0);
  
  // Simulate generation progress
  React.useEffect(() => {
    if (generationState === 'generating') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setGenerationState('ready');
            return 100;
          }
          return prev + 5;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [generationState]);
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your APK file will download shortly.",
    });
    
    // In a real application, this would trigger the actual download
    // For demo purposes, we'll just simulate the download with a timeout
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = '#';
      a.download = 'webview-app.apk';
      a.click();
    }, 1000);
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "URL copied to clipboard",
        description: "You can now share the URL with others.",
      });
    });
  };
  
  return (
    <div className={cn(
      "w-full max-w-xl mx-auto",
      className
    )}>
      <div className="glass-panel rounded-2xl p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-medium">WebView App Generator</h3>
          {generationState === 'ready' && (
            <Button variant="ghost" size="sm" onClick={onReset} className="text-xs">
              <RefreshCw className="h-3 w-3 mr-1" /> New
            </Button>
          )}
        </div>
        
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Target URL</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs" 
              onClick={handleShare}
            >
              <Share2 className="h-3 w-3 mr-1" /> Share
            </Button>
          </div>
          <div className="p-3 bg-muted/50 rounded-md text-sm font-mono break-all">
            {url}
          </div>
        </div>
        
        {generationState === 'generating' ? (
          <div className="mb-5 animate-pulse-subtle">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Generating APK</span>
              <span className="text-xs text-muted-foreground">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out-expo"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <RefreshCw className="h-3 w-3 animate-spin" />
              <span>Please wait, compiling app</span>
            </div>
          </div>
        ) : (
          <div className="mb-5">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 flex items-center">
              <Smartphone className="h-8 w-8 text-accent mr-4 animate-float" />
              <div>
                <h4 className="font-medium text-foreground">Ready to download</h4>
                <p className="text-sm text-muted-foreground">Your WebView app has been successfully generated</p>
              </div>
            </div>
          </div>
        )}
        
        <Button 
          className="w-full h-12 rounded-lg font-medium shadow-soft transition-all duration-300 flex items-center justify-center space-x-2"
          disabled={generationState !== 'ready'}
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          <span>Download APK</span>
        </Button>
        
        <p className="mt-4 text-xs text-center text-muted-foreground">
          File size: ~2.5MB • Android 5.0+ required
        </p>
      </div>
    </div>
  );
};

export default ApkGenerator;
