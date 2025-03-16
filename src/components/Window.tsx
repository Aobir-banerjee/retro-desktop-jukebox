
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';
import { AppWindow } from '@/utils/desktop-data';
import { cn } from '@/lib/utils';

interface WindowProps {
  window: AppWindow;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ window, onClose, onMinimize, onFocus, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: window.position.x, y: window.position.y });
  const windowRef = useRef<HTMLDivElement>(null);

  // Update position when window prop changes
  useEffect(() => {
    setPosition(window.position);
  }, [window.position]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    
    onFocus(window.id);
    setIsDragging(true);
    
    const windowRect = windowRef.current?.getBoundingClientRect();
    if (windowRect) {
      setDragOffset({
        x: e.clientX - windowRect.left,
        y: e.clientY - windowRect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleWindowClick = () => {
    if (!window.isFocused) {
      onFocus(window.id);
    }
  };

  if (window.isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={cn(
        "window absolute rounded-lg overflow-hidden flex flex-col animate-window-appear",
        window.isFocused ? "z-30 active" : "z-20",
        isDragging && "opacity-90"
      )}
      style={{
        width: `${window.size.width}px`,
        height: `${window.size.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={handleWindowClick}
    >
      <div 
        className="window-title-bar h-8 flex items-center justify-between px-3 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="text-sm font-chicago truncate text-retro-title">{window.title}</div>
        <div className="flex space-x-1">
          <button 
            onClick={() => onMinimize(window.id)}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/10"
          >
            <Minus size={12} />
          </button>
          <button 
            onClick={() => onClose(window.id)}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/10 text-gray-700"
          >
            <X size={12} />
          </button>
        </div>
      </div>
      <div className="flex-1 bg-retro-window overflow-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default Window;
