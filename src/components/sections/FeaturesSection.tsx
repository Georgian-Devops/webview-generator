
import React from 'react';
import { Smartphone, Code, Lock, Zap } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="glass-panel rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
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

  return (
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
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
