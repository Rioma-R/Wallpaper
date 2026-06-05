import React from 'react';

interface WindowBoxProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const WindowBox = ({ title, children, className = "" }: WindowBoxProps) => {
  return (
    <div className={`border-2 border-cyber-neon bg-cyber-bg flex flex-col ${className}`}>
      <div className="bg-cyber-neon text-cyber-bg px-2 py-1 flex justify-between items-center text-sm font-bold uppercase">
        <span>{title}</span>
        <span className="cursor-pointer hover:text-white">x</span>
      </div>
      <div className="p-4 flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};