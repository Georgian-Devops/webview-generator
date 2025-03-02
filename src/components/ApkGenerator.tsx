
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WebViewGenerator, ApkBuildResult } from '@/lib/webviewGenerator';
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
  const [buildResult, setBuildResult] = useState<ApkBuildResult | null>(null);
  
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
          const result = await generator.generateApk();
          
          // Clear the interval and set final progress
          clearInterval(progressInterval);
          setProgress(100);
          setGenerationState('ready');
          setBuildResult(result);
          
          if (result.status === 'success') {
            toast({
              title: "APK generated successfully!",
              description: result.message || "Your APK is ready to download.",
            });
          } else if (result.status === 'demo') {
            toast({
              title: "Demo completed successfully!",
              description: result.message || "This is a demo version. In a production app, you would download a real APK file here.",
            });
          } else {
            toast({
              title: "Error generating APK",
              description: result.message || "There was an unexpected error.",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error('Error generating APK:', error);
          toast({
            title: "Error generating APK",
            description: "There was a problem with the build process. Please try again.",
            variant: "destructive"
          });
          setGenerationState('ready');
          setBuildResult({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
          });
        }
      };
      
      generateApp();
    }
  }, [generationState, url, appName, packageName, appIcon, toast]);
  
  const handleDownload = () => {
    if (buildResult?.downloadUrl) {
      // If we have a real download URL, use it
      window.open(buildResult.downloadUrl, '_blank');
    } else {
      // This is demo mode
      toast({
        title: "This is a demo version",
        description: "In a production app, this would download a real APK file. Real APK generation requires a backend service.",
      });
    }
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
            <p className="font-medium mb-1">⚠️ APK Backend Required</p>
            <p>
              {buildResult?.status === 'demo' 
                ? buildResult.message 
                : "This is a demonstration only. In a production environment, this would generate a real Android APK file. Actual APK generation requires a backend build service with Android SDK."}
            </p>
            <p className="mt-2 text-xs">
              To implement a real APK builder service, you would need to:
            </p>
            <ul className="list-disc pl-5 mt-1 text-xs">
              <li>Create a server with Android SDK installed</li>
              <li>Implement an API endpoint that accepts the app details</li>
              <li>Build the APK using tools like Cordova or Capacitor</li>
              <li>Store and serve the generated APK file</li>
              <li>Configure the frontend to use the API by setting VITE_APK_BUILDER_API_URL</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApkGenerator;
