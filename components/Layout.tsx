import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Mobile container - centers content on large screens, full width on mobile */}
      <div className="mx-auto max-w-md bg-white min-h-screen shadow-2xl overflow-hidden relative pb-20">
        {children}
      </div>
    </div>
  );
};