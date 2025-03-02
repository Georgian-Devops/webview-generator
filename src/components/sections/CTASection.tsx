
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
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
  );
};

export default CTASection;
