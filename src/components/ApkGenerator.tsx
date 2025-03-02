
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WebViewGenerator } from '@/lib/webviewGenerator';
import { AppInfo } from './apk-generator/AppInfo';
import { ProgressBar } from './apk-generator/ProgressBar';
import { ReadyStatus } from './apk-generator/ReadyStatus';
import { DownloadButton } from './apk-generator/DownloadButton';
import { dataURLtoBlob } from './apk-generator/utils';

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
          await generator.generateApk();
          
          // Clear the interval and set final progress
          clearInterval(progressInterval);
          setProgress(100);
          setGenerationState('ready');
          
          toast({
            title: "Demo completed successfully!",
            description: "This is a demo version. In a production app, you would download a real APK file here.",
          });
        } catch (error) {
          console.error('Error generating APK:', error);
          toast({
            title: "Error in demo",
            description: "There was a problem with the demo. Please try again.",
            variant: "destructive"
          });
          setGenerationState('ready');
        }
      };
      
      generateApp();
    }
  }, [generationState, url, appName, packageName, appIcon, toast]);
  
  const handleDownload = () => {
    toast({
      title: "This is a demo version",
      description: "In a production app, this would download a real APK file. Real APK generation requires a backend service.",
    });
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
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div className="glass-panel rounded-2xl p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-medium">WebView App Generator</h3>
          {generationState === 'ready' && (
            <Button variant="ghost" size="sm" onClick={onReset} className="text-xs">
              <RefreshCw className="h-3 w-3 mr-1" /> New
            </Button>
          )}
        </div>
        
        <AppInfo
          appName={appName}
          packageName={packageName}
          appIcon={appIcon}
          url={url}
          onShare={handleShare}
        />
        
        {generationState === 'generating' ? (
          <ProgressBar progress={progress} />
        ) : (
          <ReadyStatus />
        )}
        
        <div className="mt-6">
          <DownloadButton 
            disabled={generationState !== 'ready'} 
            onClick={handleDownload} 
          />
          
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
            <p className="font-medium mb-1">⚠️ Demo Version</p>
            <p>
              This is a demonstration only. In a production environment, this would generate a real Android APK file. 
              Actual APK generation requires a backend build service which isn't included in this demo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApkGenerator;
