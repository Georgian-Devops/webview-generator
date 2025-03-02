
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WebViewGenerator } from '@/lib/webviewGenerator';

// Import the extracted section components
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import AdvancedCustomizationSection from '@/components/sections/AdvancedCustomizationSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';

const Index = () => {
  const [url, setUrl] = useState<string>('');
  const [appName, setAppName] = useState<string>('WebView App');
  const [packageName, setPackageName] = useState<string>('com.webview.app');
  const [appIcon, setAppIcon] = useState<string | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  
  const handleUrlSubmit = (submittedUrl: string, submittedAppName: string, submittedPackageName: string, submittedIcon: File | null) => {
    setIsProcessing(true);
    setUrl(submittedUrl);
    setAppName(submittedAppName || 'WebView App');
    setPackageName(submittedPackageName || 'com.webview.app');
    setIcon(submittedIcon);
    
    // Create app icon preview if there's an icon
    if (submittedIcon) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAppIcon(e.target?.result as string);
      };
      reader.readAsDataURL(submittedIcon);
    }
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsGenerated(true);
    }, 1000);
  };
  
  const handleReset = () => {
    setUrl('');
    setAppName('WebView App');
    setPackageName('com.webview.app');
    setAppIcon(null);
    setIcon(null);
    setIsGenerated(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      <Header />
      
      <main className="flex-1 flex flex-col w-full">
        {/* Hero Section */}
        <HeroSection 
          isGenerated={isGenerated}
          handleUrlSubmit={handleUrlSubmit}
          url={url}
          appName={appName}
          packageName={packageName}
          appIcon={appIcon}
          onReset={handleReset}
          isProcessing={isProcessing}
        />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* App Settings Section */}
        <AdvancedCustomizationSection />
        
        {/* FAQ Section */}
        <FAQSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
