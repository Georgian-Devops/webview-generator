
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Share2, Smartphone, Package } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WebViewGenerator } from '@/lib/webviewGenerator';

interface ApkGeneratorProps {
  className?: string;
  url: string;
  appName: string;
  packageName: string;
  appIcon: string | null;
  onReset: () => void;
}

const ApkGenerator: React.FC<ApkGeneratorProps> = ({ 
  className, 
  url,
  appName,
  packageName,
  appIcon,
  onReset
}) => {
  const { toast } = useToast();
  const [generationState, setGenerationState] = useState<'generating' | 'ready'>('generating');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  
  // Generate the actual APK
  useEffect(() => {
    if (generationState === 'generating') {
      const generateApp = async () => {
        try {
          // Create WebViewGenerator instance with the provided options
          const generator = new WebViewGenerator({
            url,
            appName,
            packageName,
            // Convert the data URL back to a File object if appIcon exists
            appIcon: appIcon ? new File([dataURLtoBlob(appIcon)], 'app-icon.png', { type: 'image/png' }) : null
          });
          
          // Update progress while generating
          const progressInterval = setInterval(() => {
            setProgress(prev => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return 90;
              }
              return prev + 5;
            });
          }, 200);
          
          // Generate the APK
          const apkUrl = await generator.generateApk();
          
          // Clear the interval and set final progress
          clearInterval(progressInterval);
          setProgress(100);
          setDownloadUrl(apkUrl);
          setGenerationState('ready');
          
          toast({
            title: "APK generated successfully!",
            description: "Your app is ready to download.",
          });
        } catch (error) {
          console.error('Error generating APK:', error);
          toast({
            title: "Error generating APK",
            description: "There was a problem generating your app. Please try again.",
            variant: "destructive"
          });
          setGenerationState('ready');
        }
      };
      
      generateApp();
    }
  }, [generationState, url, appName, packageName, appIcon, toast]);
  
  // Helper function to convert data URL to Blob
  const dataURLtoBlob = (dataURL: string): Blob => {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    
    return new Blob([uInt8Array], { type: contentType });
  };
  
  const handleDownload = () => {
    if (!downloadUrl) {
      toast({
        title: "Download error",
        description: "The APK file is not available. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Download started",
      description: "Your APK file will download shortly.",
    });
    
    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${appName.replace(/\s+/g, '-').toLowerCase()}.apk`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
              {appIcon ? (
                <img src={appIcon} alt={`${appName} icon`} className="w-full h-full object-cover" />
              ) : (
                <Smartphone className="h-8 w-8 text-primary" />
              )}
            </div>
            <div>
              <h4 className="font-medium text-lg">{appName}</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <Package className="h-3 w-3 mr-1" />
                <span>{packageName}</span>
              </div>
            </div>
          </div>

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
