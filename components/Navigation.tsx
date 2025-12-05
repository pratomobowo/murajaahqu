import React from 'react';

interface NavigationProps {
  activeTab: 'study' | 'quiz' | 'dzikir' | 'info';
  onTabChange: (tab: 'study' | 'quiz' | 'dzikir' | 'info') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => onTabChange('study')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'study' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
          >
            {/* List/Queue Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === 'study' ? 2 : 1.5} stroke="currentColor" className="w-6 h-6 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
            <span className="text-xs font-medium">Surat</span>
          </button>

          <button
            onClick={() => onTabChange('quiz')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'quiz' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === 'quiz' ? 2 : 1.5} stroke="currentColor" className="w-6 h-6 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            <span className="text-xs font-medium">Murajaah</span>
          </button>

          <button
            onClick={() => onTabChange('dzikir')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'dzikir' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
          >
            {/* Hands Praying/Dzikir Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === 'dzikir' ? 2 : 1.5} stroke="currentColor" className="w-6 h-6 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">Dzikir</span>
          </button>


          <button
            onClick={() => onTabChange('info')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'info' ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
          >
            {/* Info Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === 'info' ? 2 : 1.5} stroke="currentColor" className="w-6 h-6 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className="text-xs font-medium">Info</span>
          </button>
        </div>
      </div>
    </nav>
  );
};