
import React, { useState, useEffect } from 'react';
import { defaultWindows, defaultIcons, AppWindow, DesktopIcon as DesktopIconType } from '@/utils/desktop-data';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import MusicPlayer from './MusicPlayer';
import ProjectsFolder from './ProjectsFolder';
import AboutMe from './AboutMe';
import { cn } from '@/lib/utils';

const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<AppWindow[]>(defaultWindows);
  const [icons] = useState<DesktopIconType[]>(defaultIcons);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  
  // Handle desktop click to clear active icon
  const handleDesktopClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('desktop-background')) {
      setActiveIcon(null);
    }
  };
  
  const handleIconClick = (iconId: string) => {
    setActiveIcon(iconId);
    
    // Find corresponding app
    const icon = icons.find(i => i.id === iconId);
    if (icon) {
      const app = windows.find(w => w.id === icon.appId);
      if (app) {
        openWindow(app.id);
      }
    }
  };
  
  const openWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { 
              ...window, 
              isOpen: true, 
              isFocused: true,
              isMinimized: false
            }
          : { ...window, isFocused: false }
      )
    );
  };
  
  const closeWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { ...window, isOpen: false }
          : window
      )
    );
  };
  
  const minimizeWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { ...window, isMinimized: true, isFocused: false }
          : window
      )
    );
  };
  
  const restoreWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { ...window, isMinimized: false, isFocused: true }
          : { ...window, isFocused: false }
      )
    );
  };
  
  const focusWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { ...window, isFocused: true }
          : { ...window, isFocused: false }
      )
    );
  };
  
  return (
    <div 
      className="desktop-background h-screen w-screen overflow-hidden relative"
      onClick={handleDesktopClick}
    >
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-2">
        {icons.map(icon => (
          <DesktopIcon 
            key={icon.id}
            icon={icon}
            isActive={activeIcon === icon.id}
            onClick={() => handleIconClick(icon.id)}
          />
        ))}
      </div>
      
      {windows.map(window => 
        window.isOpen && (
          <Window 
            key={window.id}
            window={window}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onFocus={focusWindow}
          >
            {window.type === 'music' && <MusicPlayer isFocused={window.isFocused} />}
            {window.type === 'projects' && <ProjectsFolder isFocused={window.isFocused} />}
            {window.type === 'about' && <AboutMe isFocused={window.isFocused} />}
          </Window>
        )
      )}
      
      <Taskbar 
        windows={windows.filter(w => w.isOpen)}
        onMinimize={minimizeWindow}
        onRestore={restoreWindow}
        onFocus={focusWindow}
      />
    </div>
  );
};

export default Desktop;
