import React, { useState } from 'react';
import { ImageIcon, UserCircle } from 'lucide-react';
import ContactCard from './ContactCard';

const Header: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-6 px-6 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
        <div className="container mx-auto flex items-center justify-between relative">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <ImageIcon size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              AI Image Generator
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-white/80 backdrop-blur-sm bg-white/5 py-2 px-4 rounded-full">
              Powered by Hugging Face
            </span>
            <button
              onClick={() => setIsContactOpen(true)}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all duration-300 group backdrop-blur-sm hover:scale-105 transform"
            >
              <UserCircle
                size={24}
                className="text-white group-hover:rotate-12 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </header>

      <ContactCard isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Header;