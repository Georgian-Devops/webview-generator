
import React from 'react';

interface StepProps {
  number: string;
  title: string;
  description: string;
  isLast: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, description, isLast }) => (
  <div className="relative">
    <div className="text-5xl font-bold text-primary/10 mb-2">{number}</div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
    
    {!isLast && (
      <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2 w-8 h-[2px] bg-border">
        <div className="absolute right-0 w-2 h-2 rounded-full bg-primary transform -translate-y-1/2" />
      </div>
    )}
  </div>
);

const HowItWorksSection: React.FC = () => {
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
            <Step 
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
