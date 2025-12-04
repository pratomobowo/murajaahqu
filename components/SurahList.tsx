import React, { useState } from 'react';
import { useSuratList, useSuratDetail } from '../hooks/useQuran';

// ==================== SurahDetailView Component ====================
const SurahDetailView: React.FC<{
  suratNomor: number;
  onBack: () => void;
}> = ({ suratNomor, onBack }) => {
  const { surat, loading, error } = useSuratDetail(suratNomor);
  const [showTranslation, setShowTranslation] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-4 py-4 shadow-sm flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-white text-lg">Memuat...</h2>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !surat) {
    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-4 py-4 shadow-sm flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-white text-lg">Error</h2>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-600 mb-3">Gagal memuat surat. {error}</p>
            <button onClick={onBack} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-4 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-white text-lg">{surat.namaLatin}</h2>
            <p className="text-xs text-white/70">{surat.arti} • {surat.jumlahAyat} Ayat • {surat.tempatTurun}</p>
          </div>
          <span className="font-arabic text-2xl text-white" dir="rtl">{surat.nama}</span>
        </div>

        {/* Toggle Translation Button */}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="mt-3 w-full py-2 bg-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors"
        >
          {showTranslation ? 'Sembunyikan Terjemahan' : 'Lihat Terjemahan'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {/* Bismillah */}
        {surat.nomor !== 1 && surat.nomor !== 9 && (
          <div className="text-center py-4 mb-4">
            <p className="font-arabic text-2xl text-primary-600" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        )}

        {/* Ayat */}
        <div className="space-y-3">
          {surat.ayat.map((ayat) => (
            <div
              key={ayat.nomorAyat}
              className="w-full text-right bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
              dir="rtl"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  {/* Arabic Text */}
                  <p className="font-arabic text-2xl leading-loose text-slate-800">
                    {ayat.teksArab}
                  </p>

                  {/* Translation - Only shown when toggled */}
                  {showTranslation && (
                    <div className="mt-3 pt-3 border-t border-slate-100" dir="ltr">
                      <p className="text-sm text-slate-600 text-left">{ayat.teksIndonesia}</p>
                    </div>
                  )}
                </div>

                {/* Verse Number */}
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-semibold" dir="ltr">
                  {ayat.nomorAyat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== Main SurahList Component ====================
export const SurahList: React.FC = () => {
  const { suratList, loading, error, refetch } = useSuratList();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSuratNomor, setSelectedSuratNomor] = useState<number | null>(null);

  // Filter surahs based on search
  const filteredSurahs = suratList.filter(surat =>
    surat.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surat.arti.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surat.nomor.toString().includes(searchTerm)
  );

  // Detail View
  if (selectedSuratNomor !== null) {
    return <SurahDetailView suratNomor={selectedSuratNomor} onBack={() => setSelectedSuratNomor(null)} />;
  }

  // Loading state - juga tampilkan loading jika data masih kosong dan tidak ada error
  if (loading || (suratList.length === 0 && !error)) {
    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
          <h1 className="text-2xl font-bold text-white tracking-tight">Daftar Surat</h1>
          <p className="text-white/70 text-sm mt-1">Memuat...</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-3"></div>
            <p className="text-slate-500">Mengambil data dari API...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state - hanya tampilkan jika benar-benar error dan tidak loading
  if (error && suratList.length === 0) {
    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
          <h1 className="text-2xl font-bold text-white tracking-tight">Daftar Surat</h1>
          <p className="text-white/70 text-sm mt-1">Terjadi kesalahan</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 text-center max-w-sm">
            <p className="text-slate-600 mb-4">Gagal memuat daftar surat. Pastikan Anda terhubung ke internet.</p>
            <button onClick={refetch} className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
              Coba Lagi
            </button>
          </div>
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
        {filteredSurahs.map((surat) => (
          <button
            key={surat.nomor}
            onClick={() => setSelectedSuratNomor(surat.nomor)}
            className="w-full text-left group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Number Badge */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-600 font-semibold text-sm group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                  {surat.nomor}
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-semibold text-slate-800 text-base">{surat.namaLatin}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{surat.tempatTurun}</span>
                    <span>•</span>
                    <span>{surat.jumlahAyat} Ayat</span>
                  </div>
                </div>
              </div>

              {/* Arabic & Meaning */}
              <div className="text-right">
                <p className="font-arabic text-xl text-slate-700 mb-1" dir="rtl">{surat.nama}</p>
                <p className="text-xs text-slate-400 font-medium">{surat.arti}</p>
              </div>
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