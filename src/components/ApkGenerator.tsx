
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Smartphone } from "lucide-react";
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
  const [generationState, setGenerationState] = useState<'generating' | 'processing' | 'ready'>('generating');
  const [progress, setProgress] = useState(0);
  const [buildResult, setBuildResult] = useState<ApkBuildResult | null>(null);
  const [buildId, setBuildId] = useState<string | null>(null);
  
  // Check build status periodically if we're in processing state
  useEffect(() => {
    let statusCheckInterval: NodeJS.Timeout | null = null;
    
    if (generationState === 'processing' && buildId) {
      statusCheckInterval = setInterval(async () => {
        try {
          const generator = new WebViewGenerator({
            url,
            appName,
            packageName
          });
          
          const result = await generator.checkBuildStatus(buildId);
          
          if (result.status === 'success' || result.status === 'error') {
            clearInterval(statusCheckInterval!);
            setGenerationState('ready');
            setBuildResult(result);
            setProgress(100);
            
            toast({
              title: result.status === 'success' ? "APK generated successfully!" : "Error generating APK",
              description: result.message,
              variant: result.status === 'success' ? "default" : "destructive"
            });
          } else if (result.status === 'processing') {
            // Update progress if provided
            if (result.message && result.message.includes('%')) {
              const progressMatch = result.message.match(/(\d+)%/);
              if (progressMatch && progressMatch[1]) {
                setProgress(parseInt(progressMatch[1], 10));
              }
            }
          }
        } catch (error) {
          console.error('Error checking build status:', error);
          clearInterval(statusCheckInterval!);
        }
      }, 3000);
    }
    
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [generationState, buildId, url, appName, packageName, toast]);
  
  useEffect(() => {
    if (generationState === 'generating') {
      const generateApp = async () => {
        try {
          const generator = new WebViewGenerator({
            url,
            appName,
            packageName,
            appIcon: appIcon ? new File([dataURLtoBlob(appIcon)], 'app-icon.png', { type: 'image/png' }) : null
          });
          
          const progressInterval = setInterval(() => {
            setProgress(prev => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return 90;
              }
              return prev + 5;
            });
          }, 200);
          
          const result = await generator.generateApk();
          
          clearInterval(progressInterval);
          
          if (result.status === 'processing' && result.buildId) {
            setBuildId(result.buildId);
            setGenerationState('processing');
            toast({
              title: "APK build started",
              description: "Your APK is being built on our servers. This may take a few minutes.",
            });
          } else {
            setProgress(100);
            setGenerationState('ready');
            setBuildResult(result);
            
            if (result.status === 'success') {
              toast({
                title: "APK generated successfully!",
                description: "Your APK is ready to download and install.",
              });
            } else if (result.status === 'demo') {
              toast({
                title: "Demo APK ready for download!",
                description: "This is a demo APK. In production, this would be your custom-built APK.",
              });
            } else {
              toast({
                title: "Error generating APK",
                description: result.message || "There was an unexpected error.",
                variant: "destructive"
              });
            }
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
      window.location.href = buildResult.downloadUrl;
      
      toast({
        title: "Downloading Android Template",
        description: "Your template is downloading. Once complete, extract the ZIP file.",
      });
    } else {
      toast({
        title: "Download not available",
        description: "The APK download is currently not available. Please try again later.",
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
        
        {generationState !== 'ready' ? (
          <ProgressBar progress={progress} />
        ) : (
          <ReadyStatus />
        )}
        
        <div className="mt-6">
          {buildResult?.status === 'success' ? (
            <div className="mb-4">
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary-foreground text-sm mb-4">
                <div className="flex items-center mb-2">
                  <Smartphone className="h-4 w-4 mr-2" />
                  <h4 className="font-medium">Installation Instructions</h4>
                </div>
                <ol className="list-decimal pl-5 text-xs space-y-1">
                  <li>Download the Android APK using the button below</li>
                  <li>Open the APK file on your Android device</li>
                  <li>If prompted, allow installation from unknown sources</li>
                  <li>Follow the on-screen instructions to install</li>
                  <li>Launch the app after installation is complete</li>
                </ol>
              </div>
              <DownloadButton 
                disabled={generationState !== 'ready'} 
                onClick={handleDownload} 
              />
            </div>
          ) : (
            <DownloadButton 
              disabled={generationState !== 'ready'} 
              onClick={handleDownload} 
            />
          )}
          
          <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg text-accent-foreground text-sm">
            <p className="font-medium mb-1">🚀 About This Service</p>
            <p>
              This app generator uses a Python backend to create fully functional WebView apps from any website URL. All apps are custom-built on our secure servers.
            </p>
            <p className="mt-2 text-xs">
              Application features:
            </p>
            <ul className="list-disc pl-5 mt-1 text-xs space-y-1">
              <li>Native Android WebView container</li>
              <li>Custom app name and package name</li>
              <li>Custom app icon support</li>
              <li>Support for offline mode</li>
              <li>No ads or third-party tracking</li>
              <li>Full-screen immersive mode</li>
            </ul>
            <p className="mt-2 text-xs">
              Our Python backend generates optimized APK files that run smoothly on any Android device. The generation process typically takes 1-2 minutes depending on server load.
              Learn more about WebView apps at <a href="https://developer.android.com/guide/webapps" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">developer.android.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApkGenerator;
