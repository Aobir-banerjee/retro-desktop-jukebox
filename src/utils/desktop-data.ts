
export type AppWindow = {
  id: string;
  title: string;
  type: 'music' | 'projects' | 'about'; 
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

export type DesktopIcon = {
  id: string;
  title: string;
  icon: string;
  appId: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
};

export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  duration: number;
  cover: string;
};

export const defaultIcons: DesktopIcon[] = [
  {
    id: 'music-icon',
    title: 'Music Player',
    icon: 'music',
    appId: 'music-player'
  },
  {
    id: 'projects-icon',
    title: 'Projects',
    icon: 'folder',
    appId: 'projects-folder'
  },
  {
    id: 'about-icon',
    title: 'About Me',
    icon: 'info',
    appId: 'about-me'
  }
];

export const defaultWindows: AppWindow[] = [
  {
    id: 'music-player',
    title: 'Music Player',
    type: 'music',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 80, y: 60 },
    size: { width: 340, height: 420 }
  },
  {
    id: 'projects-folder',
    title: 'Projects',
    type: 'projects',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 140, y: 100 },
    size: { width: 500, height: 400 }
  },
  {
    id: 'about-me',
    title: 'About Me',
    type: 'about',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 200, y: 140 },
    size: { width: 380, height: 320 }
  }
];

export const demoProjects: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'Portfolio Website',
    description: 'A clean portfolio showcasing my work and skills',
    icon: 'globe',
    link: '#'
  },
  {
    id: 'project-2',
    title: 'E-commerce Platform',
    description: 'Full-stack online store with payment integration',
    icon: 'shopping-cart',
    link: '#'
  },
  {
    id: 'project-3',
    title: 'Mobile App',
    description: 'Cross-platform mobile application for task management',
    icon: 'smartphone',
    link: '#'
  },
  {
    id: 'project-4',
    title: 'Game Development',
    description: 'A browser-based casual game built with React',
    icon: 'gamepad-2',
    link: '#'
  },
  {
    id: 'project-5',
    title: 'UI Component Library',
    description: 'Custom React components with design system',
    icon: 'component',
    link: '#'
  },
  {
    id: 'project-6',
    title: 'API Integration',
    description: 'RESTful API consumed by multiple applications',
    icon: 'database',
    link: '#'
  }
];

export const demoTracks: MusicTrack[] = [
  {
    id: 'track-1',
    title: 'Midnight Coding',
    artist: 'Dev Lofi',
    duration: 245,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'track-2',
    title: 'Debugging Blues',
    artist: 'Code Beats',
    duration: 198,
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 'track-3',
    title: 'Algorithm Groove',
    artist: 'Syntax Error',
    duration: 274,
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG11c2ljfGVufDB8fDB8fHww'
  },
  {
    id: 'track-4',
    title: 'React Reverie',
    artist: 'The Components',
    duration: 221,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fHww'
  },
  {
    id: 'track-5',
    title: 'Function Funk',
    artist: 'Async Await',
    duration: 187,
    cover: 'https://images.unsplash.com/photo-1671226366526-d240630baea5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG11c2ljJTIwY292ZXJ8ZW58MHx8MHx8fDA%3D'
  }
];
