
import React from 'react';
import { Smartphone } from 'lucide-react';

export const ReadyStatus: React.FC = () => {
  return (
    <div className="mb-5">
      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 flex items-center">
        <Smartphone className="h-8 w-8 text-accent mr-4 animate-float" />
        <div>
          <h4 className="font-medium text-foreground">Ready to download</h4>
          <p className="text-sm text-muted-foreground">Your WebView app has been successfully generated</p>
        </div>
      </div>
    </div>
  );
};
