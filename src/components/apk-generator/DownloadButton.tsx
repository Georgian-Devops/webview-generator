
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
          For a complete APK generation service, consider these free and open-source alternatives:
        </p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li><a href="https://github.com/ionic-team/capacitor" target="_blank" rel="noopener noreferrer" className="underline">Capacitor</a> - Official framework for building native apps</li>
          <li><a href="https://github.com/MisterAlex95/native-web-app" target="_blank" rel="noopener noreferrer" className="underline">NativeWebApp</a> - Simple WebView generator</li>
          <li><a href="https://github.com/appspector/flutter-webview-app" target="_blank" rel="noopener noreferrer" className="underline">Flutter WebView</a> - Open-source WebView template</li>
          <li><a href="https://github.com/slymax/webview" target="_blank" rel="noopener noreferrer" className="underline">Simple WebView</a> - Lightweight Android WebView template</li>
        </ul>
        <p className="mt-2">
          <strong>Self-hosting options:</strong>
        </p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li><a href="https://github.com/appium/appium-docker-android" target="_blank" rel="noopener noreferrer" className="underline">Appium Docker Android</a> - Build APKs in Docker</li>
          <li><a href="https://github.com/gdelmas/IntelliJAppBuilderPlugin" target="_blank" rel="noopener noreferrer" className="underline">IntelliJ App Builder</a> - IDE plugin for APK generation</li>
          <li><a href="https://github.com/NativeScript/nativescript-cli" target="_blank" rel="noopener noreferrer" className="underline">NativeScript CLI</a> - Command-line tool for native apps</li>
        </ul>
        <p className="mt-2 font-medium">
          These open-source projects can be deployed to your own server for a complete APK generation backend.
        </p>
      </div>
    </>
  );
};
