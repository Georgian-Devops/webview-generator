
import React from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <div className="glass-panel rounded-xl p-6">
    <h3 className="text-lg font-medium mb-2">{question}</h3>
    <p className="text-muted-foreground">{answer}</p>
  </div>
);

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "Is this service free?",
      answer: "Yes, the basic service is completely free. Advanced customization options will be available in the future as premium features."
    },
    {
      question: "How do I install the APK?",
      answer: "After downloading, open the APK file on your Android device. You may need to allow installation from unknown sources in your device settings."
    },
    {
      question: "Does it work for all websites?",
      answer: "Most websites work well, but some with complex requirements might have limitations. Progressive web apps work best."
    },
    {
      question: "Can I publish to Google Play?",
      answer: "Yes, but you'll need to follow Google Play's policies. Note that simple WebView apps without additional functionality may not meet their quality requirements."
    }
  ];

  return (
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
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
