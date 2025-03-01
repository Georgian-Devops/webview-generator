
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UrlForm from '@/components/UrlForm';
import ApkGenerator from '@/components/ApkGenerator';
import { WebViewGenerator } from '@/lib/webviewGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Code, Lock, Zap, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [url, setUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  
  const handleUrlSubmit = (submittedUrl: string) => {
    setIsProcessing(true);
    setUrl(submittedUrl);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsGenerated(true);
    }, 1000);
  };
  
  const handleReset = () => {
    setUrl('');
    setIsGenerated(false);
  };
  
  const features = [
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: 'Native Mobile Experience',
      description: 'Convert any website into a native-feeling Android app with smooth performance.'
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: 'No Coding Required',
      description: 'Generate your Android APK with just a URL. No development skills needed.'
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: 'Secure & Private',
      description: 'Your URL is processed securely without storing any sensitive information.'
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Instant Generation',
      description: 'Get your APK file in seconds, ready to install on any Android device.'
    }
  ];
  
  const steps = [
    {
      number: '01',
      title: 'Enter your website URL',
      description: 'Provide the full URL of the website you want to convert into a mobile app.'
    },
    {
      number: '02',
      title: 'Generate the APK',
      description: 'Our system will package your website into a compact Android application.'
    },
    {
      number: '03',
      title: 'Download & install',
      description: 'Download the APK file to your device and install it to start using your new app.'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      <Header />
      
      <main className="flex-1 flex flex-col w-full">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-block mb-3 pill bg-primary/10 text-primary animate-fade-in">
              <span>Simple & Fast</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight animate-slide-down">
              Create Android WebView Apps <br className="hidden md:block" />
              With a Single URL
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-down" style={{ animationDelay: '100ms' }}>
              Turn any website into a native Android application in seconds. No coding required.
            </p>
            
            <div className="w-full max-w-3xl mx-auto" style={{ animationDelay: '200ms' }}>
              {!isGenerated ? (
                <UrlForm onSubmit={handleUrlSubmit} isProcessing={isProcessing} />
              ) : (
                <ApkGenerator url={url} onReset={handleReset} />
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 px-6 bg-secondary/50">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-block mb-3 pill bg-accent/10 text-accent">
                <span>Core Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our WebView generator provides everything you need to create high-quality Android applications from your website.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="glass-panel rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-block mb-3 pill bg-primary/10 text-primary">
                <span>Simple Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Creating your Android app is quick and easy with just three simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-5xl font-bold text-primary/10 mb-2">{step.number}</div>
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2 w-8 h-[2px] bg-border">
                      <div className="absolute right-0 w-2 h-2 rounded-full bg-primary transform -translate-y-1/2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* App Settings Section */}
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
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>Custom app name and icon</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>Custom splash screen</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>Color theme customization</span>
                        </li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="security" className="animate-fade-in">
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>SSL pinning for enhanced security</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>Domain whitelist control</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>JavaScript bridge security</span>
                        </li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="features" className="animate-fade-in">
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>Offline mode capability</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>Push notification support</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>Camera & location access</span>
                        </li>
                      </ul>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="w-full py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-block mb-3 pill bg-primary/10 text-primary">
                <span>Common Questions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to the most common questions about our WebView app generator.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">Is this service free?</h3>
                <p className="text-muted-foreground">
                  Yes, the basic service is completely free. Advanced customization options will be available in the future as premium features.
                </p>
              </div>
              
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">How do I install the APK?</h3>
                <p className="text-muted-foreground">
                  After downloading, open the APK file on your Android device. You may need to allow installation from unknown sources in your device settings.
                </p>
              </div>
              
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">Does it work for all websites?</h3>
                <p className="text-muted-foreground">
                  Most websites work well, but some with complex requirements might have limitations. Progressive web apps work best.
                </p>
              </div>
              
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-lg font-medium mb-2">Can I publish to Google Play?</h3>
                <p className="text-muted-foreground">
                  Yes, but you'll need to follow Google Play's policies. Note that simple WebView apps without additional functionality may not meet their quality requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your WebView App?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your website into a native Android experience in just a few clicks.
            </p>
            
            <Button 
              className="h-12 px-8 rounded-lg font-medium shadow-soft transition-all duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
