
import React from 'react';
import { Clock, Music, Folder, Info } from 'lucide-react';
import { AppWindow } from '@/utils/desktop-data';
import { cn } from '@/lib/utils';

interface TaskbarProps {
  windows: AppWindow[];
  onMinimize: (id: string) => void;
  onRestore: (id: string) => void;
  onFocus: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onMinimize, onRestore, onFocus }) => {
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-retro-window/80 backdrop-blur-sm border-t border-retro-border flex items-center justify-between px-4 shadow-md animate-taskbar-slide-up z-40">
      <div className="flex items-center space-x-1">
        {windows.map(window => {
          let IconComponent;
          switch(window.type) {
            case 'music':
              IconComponent = Music;
              break;
            case 'projects':
              IconComponent = Folder;
              break;
            case 'about':
              IconComponent = Info;
              break;
            default:
              IconComponent = Folder;
          }
          
          return window.isOpen ? (
            <button
              key={window.id}
              className={cn(
                "flex items-center justify-center h-8 px-3 text-sm rounded transition-colors",
                window.isFocused 
                  ? "bg-retro-accent text-white" 
                  : window.isMinimized
                    ? "bg-gray-200 hover:bg-gray-300" 
                    : "bg-gray-100 hover:bg-gray-200"
              )}
              onClick={() => {
                if (window.isMinimized) {
                  onRestore(window.id);
                } else if (window.isFocused) {
                  onMinimize(window.id);
                } else {
                  onFocus(window.id);
                }
              }}
            >
              <IconComponent size={14} className="mr-1.5" />
              <span className="truncate max-w-[80px]">{window.title}</span>
            </button>
          ) : null;
        })}
      </div>
      
      <div className="flex items-center text-sm space-x-4">
        <div className="flex items-center">
          <Clock size={14} className="mr-1.5 text-gray-600" />
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
