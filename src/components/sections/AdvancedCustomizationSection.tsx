
import React from 'react';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FeatureItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-center">
    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <span>{children}</span>
  </li>
);

const AdvancedCustomizationSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 px-6 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-panel rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="inline-block mb-3 pill bg-accent/10 text-accent">
                <span>Coming Soon</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Advanced Customization</h2>
              <p className="text-muted-foreground mb-6">
                Soon you'll be able to customize your WebView app with additional settings, branding options, and advanced features.
              </p>
              
              <Button className="rounded-lg">
                <Compass className="h-4 w-4 mr-2" />
                <span>Join Waitlist</span>
              </Button>
            </div>
            
            <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-border/50 md:pl-8 pt-8 md:pt-0">
              <Tabs defaultValue="branding">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="branding">Branding</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>
                
                <TabsContent value="branding" className="animate-fade-in">
                  <ul className="space-y-3 text-sm">
                    <FeatureItem>Custom app name and icon</FeatureItem>
                    <FeatureItem>Custom splash screen</FeatureItem>
                    <FeatureItem>Color theme customization</FeatureItem>
                  </ul>
                </TabsContent>
                
                <TabsContent value="security" className="animate-fade-in">
                  <ul className="space-y-3 text-sm">
                    <FeatureItem>SSL pinning for enhanced security</FeatureItem>
                    <FeatureItem>Domain whitelist control</FeatureItem>
                    <FeatureItem>JavaScript bridge security</FeatureItem>
                  </ul>
                </TabsContent>
                
                <TabsContent value="features" className="animate-fade-in">
                  <ul className="space-y-3 text-sm">
                    <FeatureItem>Offline mode capability</FeatureItem>
                    <FeatureItem>Push notification support</FeatureItem>
                    <FeatureItem>Camera & location access</FeatureItem>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedCustomizationSection;
