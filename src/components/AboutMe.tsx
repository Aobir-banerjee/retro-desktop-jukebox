
import React from 'react';
import { User, Mail, Github, Linkedin, Globe } from 'lucide-react';

interface AboutMeProps {
  isFocused: boolean;
}

const AboutMe: React.FC<AboutMeProps> = ({ isFocused }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-white shadow-md overflow-hidden">
          <User size={48} className="w-full h-full p-3 text-gray-500" />
        </div>
        <h2 className="text-lg font-semibold">Your Name</h2>
        <p className="text-sm text-gray-600">Web Developer & Designer</p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="space-y-4 text-sm">
          <p>
            I'm a passionate web developer specializing in creating beautiful, 
            functional websites and applications. With expertise in modern 
            frontend technologies and design principles, I build digital 
            experiences that delight users.
          </p>
          
          <h3 className="font-medium text-retro-accent mt-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'UI/UX Design', 'Figma'].map(skill => (
              <span 
                key={skill} 
                className="px-2 py-1 bg-gray-100 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <h3 className="font-medium text-retro-accent mt-4">Contact</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Mail size={14} className="mr-2 text-gray-500" />
              <span>your.email@example.com</span>
            </div>
            <div className="flex items-center">
              <Globe size={14} className="mr-2 text-gray-500" />
              <span>www.yourwebsite.com</span>
            </div>
          </div>
          
          <h3 className="font-medium text-retro-accent mt-4">Find me online</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Github size={16} />
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
