
import React, { useState } from 'react';
import { demoProjects } from '@/utils/desktop-data';
import { ExternalLink, FolderOpen } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectsFolderProps {
  isFocused: boolean;
}

const ProjectsFolder: React.FC<ProjectsFolderProps> = ({ isFocused }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <div className="flex items-center">
          <FolderOpen size={18} className="mr-2 text-retro-accent" />
          <span className="text-sm font-medium">My Projects</span>
        </div>
        <div className="flex space-x-2">
          <button 
            className={cn(
              "text-xs px-2 py-1 rounded",
              viewMode === 'grid' ? "bg-retro-accent text-white" : "bg-gray-100"
            )}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            className={cn(
              "text-xs px-2 py-1 rounded",
              viewMode === 'list' ? "bg-retro-accent text-white" : "bg-gray-100"
            )}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {viewMode === 'grid' ? (
          <div className="folder-grid">
            {demoProjects.map(project => {
              const IconComponent = (LucideIcons as Record<string, React.FC<any>>)[
                project.icon.charAt(0).toUpperCase() + project.icon.slice(1)
              ] || LucideIcons.FileQuestion;
              
              return (
                <div 
                  key={project.id}
                  className={cn(
                    "flex flex-col items-center p-3 rounded cursor-pointer transition-colors",
                    selectedProject === project.id ? "bg-retro-accent/10" : "hover:bg-gray-100"
                  )}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg mb-2 shadow-sm border">
                    <IconComponent size={24} className="text-retro-accent" />
                  </div>
                  <span className="text-xs font-medium text-center line-clamp-2">{project.title}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {demoProjects.map(project => {
              const IconComponent = (LucideIcons as Record<string, React.FC<any>>)[
                project.icon.charAt(0).toUpperCase() + project.icon.slice(1)
              ] || LucideIcons.FileQuestion;
              
              return (
                <div 
                  key={project.id}
                  className={cn(
                    "flex items-center p-3 rounded cursor-pointer transition-colors",
                    selectedProject === project.id ? "bg-retro-accent/10" : "hover:bg-gray-100"
                  )}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg mr-3 shadow-sm border">
                    <IconComponent size={20} className="text-retro-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{project.title}</div>
                    <div className="text-xs text-gray-500 truncate">{project.description}</div>
                  </div>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-retro-accent"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {selectedProject && (
        <div className="border-t border-gray-200 p-3 mt-2">
          {demoProjects.find(p => p.id === selectedProject)?.description}
        </div>
      )}
    </div>
  );
};

export default ProjectsFolder;
