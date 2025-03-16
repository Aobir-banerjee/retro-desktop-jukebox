
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { MusicTrack } from '@/utils/desktop-data';
import { demoTracks } from '@/utils/desktop-data';
import { cn } from '@/lib/utils';

interface MusicPlayerProps {
  isFocused: boolean;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isFocused }) => {
  const [tracks] = useState<MusicTrack[]>(demoTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const currentTrack = tracks[currentTrackIndex];
  const progressPercentage = currentTrack ? (currentTime / currentTrack.duration) * 100 : 0;
  
  // Simulate playback with useEffect instead of actual audio
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          if (prevTime >= currentTrack.duration) {
            if (currentTrackIndex < tracks.length - 1) {
              setCurrentTrackIndex(prev => prev + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return currentTrack.duration;
            }
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, currentTrackIndex, tracks.length]);
  
  const handlePlayPause = () => {
    if (!isPlaying) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsPlaying(true);
      }, 500);
    } else {
      setIsPlaying(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
      setCurrentTime(0);
    }
  };
  
  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
      setCurrentTime(0);
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const progressBarWidth = rect.width;
    const percentage = clickPosition / progressBarWidth;
    const newTime = currentTrack.duration * percentage;
    
    setCurrentTime(newTime);
  };
  
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <div className={cn("flex flex-col h-full")}>
      <div className="flex-1 overflow-auto">
        <div className="p-4 pb-6">
          {currentTrack && (
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-full aspect-square max-w-[200px] mb-4">
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.title}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  onLoad={() => console.log('Image loaded')}
                  onError={() => console.log('Image error')}
                />
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-center">{currentTrack.title}</h3>
              <p className="text-sm text-gray-600">{currentTrack.artist}</p>
            </div>
          )}
          
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentTrack?.duration || 0)}</span>
            </div>
            <div className="progress-bar" onClick={handleProgressClick}>
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="music-player-controls flex items-center justify-center space-x-6">
            <button 
              onClick={handlePrevious}
              className="p-2 text-gray-700 hover:text-black"
            >
              <SkipBack size={20} />
            </button>
            <button 
              onClick={handlePlayPause}
              className="p-3 bg-retro-accent text-white rounded-full shadow-sm hover:shadow"
            >
              {isPlaying ? (
                <Pause size={22} />
              ) : (
                <Play size={22} className="ml-0.5" />
              )}
            </button>
            <button 
              onClick={handleNext}
              className="p-2 text-gray-700 hover:text-black"
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleToggleMute}
              className="p-2 text-gray-600 hover:text-black"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <h3 className="text-sm font-medium mb-2">Playlist</h3>
        <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
          {tracks.map((track, index) => (
            <div 
              key={track.id}
              className={cn(
                "flex items-center p-2 rounded cursor-pointer hover:bg-gray-100",
                currentTrackIndex === index && "bg-gray-100"
              )}
              onClick={() => {
                setCurrentTrackIndex(index);
                setCurrentTime(0);
                setIsPlaying(true);
              }}
            >
              <div className="w-8 h-8 mr-3 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={track.cover} 
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{track.title}</div>
                <div className="text-xs text-gray-500 truncate">{track.artist}</div>
              </div>
              <div className="text-xs text-gray-500 pl-2">{formatTime(track.duration)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
