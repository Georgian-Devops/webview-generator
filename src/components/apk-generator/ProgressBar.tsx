
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="mb-5 animate-pulse-subtle">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Generating APK</span>
        <span className="text-xs text-muted-foreground">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out-expo"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <RefreshCw className="h-3 w-3 animate-spin" />
        <span>Please wait, compiling app</span>
      </div>
    </div>
  );
};
