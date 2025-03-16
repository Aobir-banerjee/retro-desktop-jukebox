
import React, { useState, useEffect } from 'react';
import { Clock, Music, Folder, Info, Sun, Moon, Upload } from 'lucide-react';
import { AppWindow, MusicTrack, allTracks } from '@/utils/desktop-data';
import { cn } from '@/lib/utils';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

interface TaskbarProps {
  windows: AppWindow[];
  onMinimize: (id: string) => void;
  onRestore: (id: string) => void;
  onFocus: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onMinimize, onRestore, onFocus }) => {
  const [time, setTime] = React.useState(new Date());
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check if it's a music file
    if (!file.type.startsWith('audio/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file (mp3, wav, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    // Create a blob URL for the audio file
    const audioUrl = URL.createObjectURL(file);
    
    // Get a clean file name without extension
    const fileName = file.name.replace(/\.[^/.]+$/, "");
    
    // Create a new track
    const newTrack: MusicTrack = {
      id: `upload-${Date.now()}`,
      title: fileName || 'Uploaded Song',
      artist: 'Custom Upload',
      duration: 180, // Default duration, will be updated when played
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      audioUrl: audioUrl
    };
    
    // Add the new track to allTracks array
    allTracks.push(newTrack);
    
    // Show a success message
    toast({
      title: "Song added",
      description: `"${newTrack.title}" has been added to your playlist`
    });
    
    // Open the music player
    const musicWindow = windows.find(w => w.id === 'music-player');
    if (musicWindow && !musicWindow.isOpen) {
      const musicWindowId = 'music-player';
      if (windows.some(w => w.id === musicWindowId && !w.isOpen)) {
        openWindow(musicWindowId);
      }
    }
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const openWindow = (id: string) => {
    const focusWindow = windows.find(w => w.id === id);
    if (focusWindow) {
      if (focusWindow.isMinimized) {
        onRestore(id);
      } else if (!focusWindow.isFocused) {
        onFocus(id);
      }
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-retro-window/80 dark:bg-gray-800/90 backdrop-blur-sm border-t border-retro-border dark:border-gray-700 flex items-center justify-between px-4 shadow-md animate-taskbar-slide-up z-40">
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
                  ? "bg-retro-accent dark:bg-blue-600 text-white" 
                  : window.isMinimized
                    ? "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" 
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
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
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 rounded-full p-0 flex items-center justify-center dark:text-gray-300"
          onClick={handleUploadClick}
        >
          <Upload size={14} className="text-gray-600 dark:text-gray-400" />
        </Button>
        
        <Toggle
          aria-label="Toggle theme"
          className="h-8 w-8 rounded-full p-0 flex items-center justify-center dark:bg-gray-700 dark:hover:bg-gray-600"
          pressed={theme === 'dark'}
          onPressedChange={toggleTheme}
        >
          {theme === 'dark' ? (
            <Moon size={14} className="text-yellow-300" />
          ) : (
            <Sun size={14} className="text-yellow-500" />
          )}
        </Toggle>
        
        <div className="flex items-center dark:text-gray-300">
          <Clock size={14} className="mr-1.5 text-gray-600 dark:text-gray-400" />
          <span>{formatTime(time)}</span>
        </div>
      </div>
      
      {/* Hidden file input for uploading songs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/*"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Taskbar;
