import React, { useState } from 'react';
import { SURAH_DATA } from '../constants';

export const SurahList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurahs = SURAH_DATA.filter(surah => 
    surah.latin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.number.toString().includes(searchTerm)
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Fixed Header */}
      <div className="flex-none bg-white z-20 border-b border-slate-100 px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Daftar Surat</h1>
        <p className="text-slate-500 text-sm mt-1">114 Surat • 30 Juz</p>
        
        <div className="mt-4 relative">
          <input 
            type="text" 
            placeholder="Cari surat, arti, atau nomor..." 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Scrollable List Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
        {filteredSurahs.map((surah) => (
          <div key={surah.number} className="group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200">
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
                <p className="font-arabic text-xl text-slate-700 mb-1">{surah.name}</p>
                <p className="text-xs text-slate-400 font-medium">{surah.meaning}</p>
              </div>
            </div>
            
            {/* Juz Badge (Bottom Strip) */}
            <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Juz {surah.juz}</span>
            </div>
          </div>
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