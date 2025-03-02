
import React from 'react';
import { Button } from "@/components/ui/button";
import { Package, Share2, Smartphone } from 'lucide-react';

interface AppInfoProps {
  appName: string;
  packageName: string;
  appIcon: string | null;
  url: string;
  onShare: () => void;
}

export const AppInfo: React.FC<AppInfoProps> = ({ 
  appName, 
  packageName, 
  appIcon, 
  url, 
  onShare 
}) => {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
          {appIcon ? (
            <img src={appIcon} alt={`${appName} icon`} className="w-full h-full object-cover" />
          ) : (
            <Smartphone className="h-8 w-8 text-primary" />
          )}
        </div>
        <div>
          <h4 className="font-medium text-lg">{appName}</h4>
          <div className="flex items-center text-sm text-muted-foreground">
            <Package className="h-3 w-3 mr-1" />
            <span>{packageName}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Target URL</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2 text-xs" 
          onClick={onShare}
        >
          <Share2 className="h-3 w-3 mr-1" /> Share
        </Button>
      </div>
      <div className="p-3 bg-muted/50 rounded-md text-sm font-mono break-all">
        {url}
      </div>
    </div>
  );
};
