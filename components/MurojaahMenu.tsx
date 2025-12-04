import React from 'react';
import { QuizMode, QuizType } from '../types';

interface MurojaahMenuProps {
  onSelectMode: (mode: QuizMode) => void;
}

export const MurojaahMenu: React.FC<MurojaahMenuProps> = ({ onSelectMode }) => {
  const menuItems = [
    {
      mode: 'RANDOM' as QuizMode,
      title: 'Murajaah Random',
      subtitle: 'Semua jenis pertanyaan acak',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
        </svg>
      ),
      color: 'bg-primary-500',
    },
    {
      mode: QuizType.NUMBER,
      title: 'Murajaah Nomor',
      subtitle: 'Tebak urutan nomor surat',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
        </svg>
      ),
      color: 'bg-indigo-500',
    },
    {
      mode: QuizType.MEANING,
      title: 'Murajaah Arti',
      subtitle: 'Tebak arti nama surat',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      color: 'bg-emerald-500',
    },
    {
      mode: QuizType.AYAH_COUNT,
      title: 'Murajaah Jumlah Ayat',
      subtitle: 'Tebak jumlah ayat',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      ),
      color: 'bg-amber-500',
    },
    {
      mode: QuizType.JUZ,
      title: 'Murajaah Juz',
      subtitle: 'Tebak juz berapa',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      color: 'bg-rose-500',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-white">Murajaah</h1>
        <p className="text-white/70 mt-1">Pilih kategori untuk memulai latihan hafalan.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => onSelectMode(item.mode)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md hover:border-slate-200 transition-all active:scale-[0.98] group text-left"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">{item.title}</h3>
              <p className="text-sm text-slate-400 group-hover:text-slate-500 transition-colors">{item.subtitle}</p>
            </div>
            <div className="ml-auto text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};