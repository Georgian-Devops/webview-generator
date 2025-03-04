
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ disabled, onClick }) => {
  return (
    <>
      <Button 
        className="w-full h-12 rounded-lg font-medium shadow-soft transition-all duration-300 flex items-center justify-center space-x-2"
        disabled={disabled}
        onClick={onClick}
      >
        <Download className="h-4 w-4" />
        <span>Download Android WebView Template</span>
      </Button>
      
      <p className="mt-4 text-xs text-center text-muted-foreground">
        File size: ~5MB • Android Studio required • Follow customization guide after download
      </p>
    </>
  );
};
