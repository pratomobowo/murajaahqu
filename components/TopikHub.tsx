import React, { useState } from 'react';

interface TopikHubProps {
  title: string;
  subtitle: string;
  headerClass: string;
  tabActiveClass: string;
  onBack: () => void;
  materi: React.ReactNode;
  renderKuis: (kembaliKeMateri: () => void) => React.ReactNode;
}

// Hub tiap topik: tab Materi (modul hafalan) dan tab Kuis (latihan soal).
export const TopikHub: React.FC<TopikHubProps> = ({
  title,
  subtitle,
  headerClass,
  tabActiveClass,
  onBack,
  materi,
  renderKuis,
}) => {
  const [tab, setTab] = useState<string>('materi');
  const isTab = (id: string) => tab === id;

  // Tab kuis dirender full-screen (komponen kuis punya header sendiri),
  // tombol kembali di kuis mengarah balik ke tab materi.
  if (isTab('kuis')) {
    return <>{renderKuis(() => setTab('materi'))}</>;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] max-w-md mx-auto w-full bg-slate-50">
      <div className={`bg-gradient-to-r ${headerClass} px-4 pt-4 pb-4 text-white sticky top-0 z-20 shadow-sm`}>
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-2 -ml-2 text-white/80 hover:text-white" aria-label="Kembali">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div>
            <h2 className="text-lg font-bold leading-tight">{title}</h2>
            <p className="text-sm text-white/80">{subtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => setTab('materi')}
            className={`py-2.5 rounded-xl font-bold text-sm transition-colors ${
              isTab('materi') ? `bg-white ${tabActiveClass} shadow` : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Materi
          </button>
          <button
            onClick={() => setTab('kuis')}
            className={`py-2.5 rounded-xl font-bold text-sm transition-colors ${
              isTab('kuis') ? `bg-white ${tabActiveClass} shadow` : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Kuis
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">{materi}</div>
    </div>
  );
};
