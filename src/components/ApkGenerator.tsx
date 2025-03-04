import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Code, FileJson, Smartphone } from "lucide-react";
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
  const [capacitorConfig, setCapacitorConfig] = useState<string | null>(null);
  
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
          setProgress(100);
          setGenerationState('ready');
          setBuildResult(result);

          if (result.capacitorConfig) {
            setCapacitorConfig(JSON.stringify(result.capacitorConfig, null, 2));
          }
          
          if (result.status === 'success') {
            toast({
              title: "APK generated successfully!",
              description: "Your APK is ready to download and install.",
            });
          } else if (result.status === 'capacitor') {
            toast({
              title: "Capacitor configuration ready!",
              description: "Your WebView app configuration is ready. Use the Capacitor CLI to build your app.",
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
    } else if (buildResult?.status === 'capacitor' && capacitorConfig) {
      const blob = new Blob([capacitorConfig], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'capacitor.config.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Configuration Downloaded",
        description: "Save this file as capacitor.config.json in your project root.",
      });
    } else {
      toast({
        title: "Download not available",
        description: "The APK download is currently not available. Please try again later.",
      });
    }
  };
  
  const handleCopyConfig = () => {
    if (capacitorConfig) {
      navigator.clipboard.writeText(capacitorConfig).then(() => {
        toast({
          title: "Configuration copied to clipboard",
          description: "You can now paste the Capacitor configuration into your project.",
        });
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
          {buildResult?.status === 'success' ? (
            <div className="mb-4">
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary-foreground text-sm mb-4">
                <div className="flex items-center mb-2">
                  <Smartphone className="h-4 w-4 mr-2" />
                  <h4 className="font-medium">Installation Instructions</h4>
                </div>
                <ol className="list-decimal pl-5 text-xs space-y-1">
                  <li>Download the Android template ZIP using the button below</li>
                  <li>Extract the ZIP file on your computer</li>
                  <li>Open Android Studio and import the extracted project</li>
                  <li>Update the URLs in the project to point to your website</li>
                  <li>Build and run the app on your Android device</li>
                </ol>
              </div>
              <DownloadButton 
                disabled={generationState !== 'ready'} 
                onClick={handleDownload} 
              />
            </div>
          ) : buildResult?.status === 'capacitor' && capacitorConfig ? (
            <>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Capacitor Configuration</h4>
                <div className="bg-muted/50 p-3 rounded-md overflow-x-auto">
                  <pre className="text-xs whitespace-pre-wrap">{capacitorConfig}</pre>
                </div>
                <div className="mt-2 flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopyConfig}
                    className="text-xs flex items-center"
                  >
                    <Code className="h-3 w-3 mr-1" /> Copy Config
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownload}
                    className="text-xs flex items-center"
                  >
                    <FileJson className="h-3 w-3 mr-1" /> Download JSON
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full h-12 rounded-lg font-medium shadow-soft transition-all duration-300 flex items-center justify-center space-x-2"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                <span>Download Config</span>
              </Button>
            </>
          ) : (
            <DownloadButton 
              disabled={generationState !== 'ready'} 
              onClick={handleDownload} 
            />
          )}
          
          <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg text-accent-foreground text-sm">
            <p className="font-medium mb-1">🚀 About This Template</p>
            <p>
              This Android template is based on Capacitor, an open-source native runtime for web apps. You can use it as a starting point to create your own WebView app.
            </p>
            <p className="mt-2 text-xs">
              Template features:
            </p>
            <ul className="list-disc pl-5 mt-1 text-xs space-y-1">
              <li>Native Android WebView container</li>
              <li>Easily customizable in Android Studio</li>
              <li>Support for offline mode</li>
              <li>No ads or third-party tracking</li>
              <li>Full-screen immersive mode</li>
            </ul>
            <p className="mt-2 text-xs">
              For a complete, ready-to-install APK, you can use the Capacitor CLI or a build service.
              Learn more about Capacitor at <a href="https://capacitorjs.com/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">capacitorjs.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApkGenerator;
