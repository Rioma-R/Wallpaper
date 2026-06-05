import React from 'react';

interface WindowBoxProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const WindowBox = ({ title, children, className = "" }: WindowBoxProps) => {
  return (
    <div className={`border-2 border-cyber-neon bg-black flex flex-col ${className}`}>
      
      {/* Barre de titre unifiée pour TOUTES les fenêtres : 
          Dégradé violet, texte blanc et croix blanche */}
      <div className="bg-gradient-to-r from-[#800080] to-[#4B0082] text-white px-2 py-[2px] flex justify-between items-center text-sm font-bold uppercase">
        <span>{title}</span>
        <span className="cursor-pointer hover:text-gray-300">X</span>
      </div>
      
      <div className="p-4 flex-1 overflow-hidden relative">
        {children}
      </div>
      
    </div>
  );
};