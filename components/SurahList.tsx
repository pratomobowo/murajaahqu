import React, { useState } from 'react';
import { SURAH_DATA } from '../constants';
import { Surah } from '../types';

export const SurahList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);

  const filteredSurahs = SURAH_DATA.filter(surah =>
    surah.latin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.number.toString().includes(searchTerm)
  );

  // Detail View
  if (selectedSurah) {
    return (
      <div className="flex flex-col h-full bg-slate-50">
        {/* Header Detail */}
        <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-4 py-4 shadow-sm flex items-center gap-4">
          <button
            onClick={() => setSelectedSurah(null)}
            className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-white text-lg">{selectedSurah.latin}</h2>
            <p className="text-xs text-white/70">{selectedSurah.meaning} • {selectedSurah.ayahs} Ayat</p>
          </div>
          <span className="font-arabic text-2xl text-white" dir="rtl">{selectedSurah.name}</span>
        </div>

        {/* Coming Soon Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Segera Hadir</h3>
          <p className="text-slate-500 text-center text-sm max-w-xs">
            Fitur membaca surat {selectedSurah.latin} sedang dalam pengembangan. Nantikan update selanjutnya!
          </p>
          <button
            onClick={() => setSelectedSurah(null)}
            className="mt-8 px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 active:scale-[0.98] transition-all"
          >
            Kembali ke Daftar
          </button>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Fixed Header */}
      <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-white tracking-tight">Daftar Surat</h1>
        <p className="text-white/70 text-sm mt-1">114 Surat • 30 Juz</p>

        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Cari surat, arti, atau nomor..."
            className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Scrollable List Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
        {filteredSurahs.map((surah) => (
          <button
            key={surah.number}
            onClick={() => setSelectedSurah(surah)}
            className="w-full text-left group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Number Badge */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-600 font-semibold text-sm group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                  {surah.number}
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-semibold text-slate-800 text-base">{surah.latin}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{surah.type}</span>
                    <span>•</span>
                    <span>{surah.ayahs} Ayat</span>
                  </div>
                </div>
              </div>

              {/* Arabic & Meaning */}
              <div className="text-right">
                <p className="font-arabic text-xl text-slate-700 mb-1" dir="rtl">{surah.name}</p>
                <p className="text-xs text-slate-400 font-medium">{surah.meaning}</p>
              </div>
            </div>

            {/* Juz Badge (Bottom Strip) */}
            <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Juz {surah.juz}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </button>
        ))}

        {filteredSurahs.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p>Surat tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};