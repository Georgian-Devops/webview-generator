
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
        <span>Download WebView APK Template</span>
      </Button>
      
      <p className="mt-4 text-xs text-center text-muted-foreground">
        File size: ~5MB • Open-source template • Full customization available
      </p>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-xs text-blue-700">
        <p className="font-medium mb-1">Open-Source APK Generator Alternatives</p>
        <p>
          Free and reliable solutions for generating Android applications:
        </p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li><a href="https://github.com/gluonhq/client-samples" target="_blank" rel="noopener noreferrer" className="underline">GluonHQ</a> - Java/JavaFX based WebView with active support</li>
          <li><a href="https://github.com/jasonette/JASONETTE-Android" target="_blank" rel="noopener noreferrer" className="underline">Jasonette</a> - Turn any JSON into native Android app</li>
          <li><a href="https://github.com/readium/r2-navigator-kotlin" target="_blank" rel="noopener noreferrer" className="underline">Readium Navigator</a> - Advanced WebView with better rendering</li>
          <li><a href="https://github.com/slymax/webview" target="_blank" rel="noopener noreferrer" className="underline">Simple WebView</a> - Lightweight and reliable template</li>
        </ul>
        <p className="mt-2">
          <strong>Self-hosted API Options:</strong>
        </p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li><a href="https://github.com/genymobile/gnirehtet" target="_blank" rel="noopener noreferrer" className="underline">Gnirehtet</a> - Open-source APK builder with REST API</li>
          <li><a href="https://github.com/gotev/android-upload-service" target="_blank" rel="noopener noreferrer" className="underline">Android Upload Service</a> - Host your own APK generation API</li>
          <li><a href="https://github.com/termux/termux-app" target="_blank" rel="noopener noreferrer" className="underline">Termux API</a> - Deploy a complete build environment API</li>
          <li><a href="https://github.com/apktool/apktool" target="_blank" rel="noopener noreferrer" className="underline">APKTool</a> - Open-source utility to reverse engineer and build APKs</li>
        </ul>
        <p className="mt-2 font-medium">
          These alternatives offer robust solutions for APK generation with active community development.
        </p>
      </div>
    </>
  );
};
