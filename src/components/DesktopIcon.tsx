
import React from 'react';
import { Icon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { DesktopIcon as DesktopIconType } from '@/utils/desktop-data';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
  icon: DesktopIconType;
  isActive: boolean;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, isActive, onClick }) => {
  // Type assertion to access dynamic icon
  const IconComponent = (LucideIcons as Record<string, React.FC<any>>)[
    icon.icon.charAt(0).toUpperCase() + icon.icon.slice(1)
  ] || LucideIcons.FileQuestion;

  return (
    <div 
      className={cn(
        "desktop-icon flex flex-col items-center justify-center p-2 w-20 h-24 rounded hover:bg-black/5 cursor-pointer animate-fade-in",
        isActive && "bg-black/10"
      )}
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-white/70 rounded-lg mb-2 shadow-sm">
        <IconComponent size={24} className="text-retro-accent" />
      </div>
      <span className="text-center text-xs font-medium text-white drop-shadow-md line-clamp-2">
        {icon.title}
      </span>
    </div>
  );
};

export default DesktopIcon;
