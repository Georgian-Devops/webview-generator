
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

      <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-xs text-blue-700">
        <p className="font-medium mb-1">Looking for direct APK generation?</p>
        <p>
          For a complete APK generation service, consider using third-party services like:
        </p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>AppCreator24</li>
          <li>BuildFire</li>
          <li>Kodular/AppyBuilder</li>
          <li>Self-hosted solutions (requires server setup)</li>
        </ul>
        <p className="mt-1">
          These services can build and sign APK files directly from a website URL.
        </p>
      </div>
    </>
  );
};
