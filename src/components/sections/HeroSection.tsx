
import React from 'react';
import UrlForm from '@/components/UrlForm';
import ApkGenerator from '@/components/ApkGenerator';

interface HeroSectionProps {
  isGenerated: boolean;
  handleUrlSubmit: (url: string, appName: string, packageName: string, icon: File | null) => void;
  url: string;
  appName: string;
  packageName: string;
  appIcon: string | null;
  onReset: () => void;
  isProcessing: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  isGenerated, 
  handleUrlSubmit, 
  url, 
  appName, 
  packageName, 
  appIcon, 
  onReset,
  isProcessing 
}) => {
  return (
    <section className="w-full py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-block mb-3 pill bg-primary/10 text-primary animate-fade-in">
          <span>Capacitor-Powered</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight animate-slide-down">
          Create Android WebView Apps <br className="hidden md:block" />
          With a Single URL
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-down" style={{ animationDelay: '100ms' }}>
          Turn any website into a native Android application in seconds. No coding required.
        </p>
        
        <div className="mb-4 bg-accent/10 border border-accent/20 rounded-lg text-accent-foreground text-sm p-4 max-w-3xl mx-auto animate-slide-down" style={{ animationDelay: '150ms' }}>
          <p className="font-medium">✨ Powered by Capacitor</p>
          <p>
            This app generates Capacitor configurations for your WebView app. Download the configuration 
            and follow the instructions to build a real APK file on your local machine.
          </p>
          <p className="mt-2 text-xs">No backend service required - Capacitor handles everything!</p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto" style={{ animationDelay: '200ms' }}>
          {!isGenerated ? (
            <UrlForm onSubmit={handleUrlSubmit} isProcessing={isProcessing} />
          ) : (
            <ApkGenerator 
              url={url} 
              appName={appName}
              packageName={packageName}
              appIcon={appIcon} 
              onReset={onReset} 
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
