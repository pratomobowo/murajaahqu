import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSuratList, useSuratDetail, useAudio } from '../hooks/useQuran';
import { JuzFilterModal } from './JuzFilterModal';

// Qari tetap: Yasser Al-Dosari (kode '06')
const QARI = '06' as const;

// Complete mapping of surah numbers to all juz they contain
// Many surahs span multiple juz, so this provides accurate filtering
const SURAH_JUZ_MAPPING: Record<number, number[]> = {
  1: [1],                    // Al-Fatihah
  2: [1, 2, 3],              // Al-Baqarah - spans 3 juz
  3: [3, 4],                 // Ali 'Imran
  4: [4, 5, 6],              // An-Nisa'
  5: [6, 7],                 // Al-Ma'idah
  6: [7, 8],                 // Al-An'am
  7: [8, 9],                 // Al-A'raf
  8: [9, 10],                // Al-Anfal
  9: [10, 11],               // At-Taubah
  10: [11],                  // Yunus
  11: [11, 12],              // Hud
  12: [12, 13],              // Yusuf
  13: [13],                  // Ar-Ra'd
  14: [13],                  // Ibrahim
  15: [14],                  // Al-Hijr
  16: [14],                  // An-Nahl
  17: [15],                  // Al-Isra'
  18: [15, 16],              // Al-Kahf
  19: [16],                  // Maryam
  20: [16],                  // Taha
  21: [17],                  // Al-Anbiya'
  22: [17],                  // Al-Hajj
  23: [18],                  // Al-Mu'minun
  24: [18],                  // An-Nur
  25: [18, 19],              // Al-Furqan
  26: [19],                  // Asy-Syu'ara'
  27: [19, 20],              // An-Naml
  28: [20],                  // Al-Qasas
  29: [20, 21],              // Al-Ankabut
  30: [21],                  // Ar-Rum
  31: [21],                  // Luqman
  32: [21],                  // As-Sajdah
  33: [21, 22],              // Al-Ahzab
  34: [22],                  // Saba'
  35: [22],                  // Fatir
  36: [22, 23],              // Ya Sin
  37: [23],                  // As-Saffat
  38: [23],                  // Sad
  39: [23, 24],              // Az-Zumar
  40: [24],                  // Ghafir
  41: [24, 25],              // Fussilat
  42: [25],                  // Asy-Syura
  43: [25],                  // Az-Zukhruf
  44: [25],                  // Ad-Dukhan
  45: [25],                  // Al-Jasiyah
  46: [26],                  // Al-Ahqaf
  47: [26],                  // Muhammad
  48: [26],                  // Al-Fath
  49: [26],                  // Al-Hujurat
  50: [26],                  // Qaf
  51: [26, 27],              // Az-Zariyat
  52: [27],                  // At-Tur
  53: [27],                  // An-Najm
  54: [27],                  // Al-Qamar
  55: [27],                  // Ar-Rahman
  56: [27],                  // Al-Waqi'ah
  57: [27],                  // Al-Hadid
  58: [28],                  // Al-Mujadilah
  59: [28],                  // Al-Hasyr
  60: [28],                  // Al-Mumtahanah
  61: [28],                  // As-Saff
  62: [28],                  // Al-Jumu'ah
  63: [28],                  // Al-Munafiqun
  64: [28],                  // At-Tagabun
  65: [28],                  // At-Talaq
  66: [28],                  // At-Tahrim
  67: [29],                  // Al-Mulk
  68: [29],                  // Al-Qalam
  69: [29],                  // Al-Haqqah
  70: [29],                  // Al-Ma'arij
  71: [29],                  // Nuh
  72: [29],                  // Al-Jinn
  73: [29],                  // Al-Muzzammil
  74: [29],                  // Al-Muddassir
  75: [29],                  // Al-Qiyamah
  76: [29],                  // Al-Insan
  77: [29],                  // Al-Mursalat
  78: [30],                  // An-Naba'
  79: [30],                  // An-Nazi'at
  80: [30],                  // Abasa
  81: [30],                  // At-Takwir
  82: [30],                  // Al-Infitar
  83: [30],                  // Al-Mutaffifin
  84: [30],                  // Al-Insyiqaq
  85: [30],                  // Al-Buruj
  86: [30],                  // At-Tariq
  87: [30],                  // Al-A'la
  88: [30],                  // Al-Ghasyiyah
  89: [30],                  // Al-Fajr
  90: [30],                  // Al-Balad
  91: [30],                  // Asy-Syams
  92: [30],                  // Al-Lail
  93: [30],                  // Ad-Duha
  94: [30],                  // Asy-Syarh
  95: [30],                  // At-Tin
  96: [30],                  // Al-'Alaq
  97: [30],                  // Al-Qadr
  98: [30],                  // Al-Bayyinah
  99: [30],                  // Az-Zalzalah
  100: [30],                 // Al-'Adiyat
  101: [30],                 // Al-Qari'ah
  102: [30],                 // At-Takatsur
  103: [30],                 // Al-'Asr
  104: [30],                 // Al-Humazah
  105: [30],                 // Al-Fil
  106: [30],                 // Quraisy
  107: [30],                 // Al-Ma'un
  108: [30],                 // Al-Kautsar
  109: [30],                 // Al-Kafirun
  110: [30],                 // An-Nasr
  111: [30],                 // Al-Lahab
  112: [30],                 // Al-Ikhlas
  113: [30],                 // Al-Falaq
  114: [30],                 // An-Nas
};

// Helper: Check if surah is in a specific juz
const isSurahInJuz = (surahNumber: number, juz: number): boolean => {
  const juzList = SURAH_JUZ_MAPPING[surahNumber];
  return juzList ? juzList.includes(juz) : false;
};

// ==================== SurahDetailView Component ====================
const SurahDetailView: React.FC<{
  suratNomor: number;
  onBack: () => void;
}> = ({ suratNomor, onBack }) => {
  const { surat, loading, error } = useSuratDetail(suratNomor);
  const [showTranslation, setShowTranslation] = useState(false);
  const { toggle, isPlaying, currentUrl, loading: audioLoading } = useAudio();

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

  // DEBUG: Log error ke console, tidak tampilkan UI error
  if (error) {
    console.log('SurahDetailView Error:', error);
  }

  // Jika surat null, tampilkan loading
  if (!surat) {
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

        {/* Buttons Row - Dengar & Terjemahan */}
        <div className="mt-3 flex gap-2">
          {/* Audio Player - Play Full Surah Button */}
          <button
            onClick={() => toggle(surat.audioFull[QARI])}
            disabled={audioLoading}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors disabled:opacity-50"
          >
            {audioLoading ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : isPlaying && currentUrl === surat.audioFull[QARI] ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
            )}
            <span>{isPlaying && currentUrl === surat.audioFull[QARI] ? 'Pause' : 'Dengar'}</span>
          </button>

          {/* Toggle Translation Button */}
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex-1 py-2 bg-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors"
          >
            {showTranslation ? 'Sembunyikan' : 'Terjemahan'}
          </button>
        </div>
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
              className="w-full text-right bg-white rounded-2xl p-4 py-6 shadow-sm border border-slate-100"
              dir="rtl"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  {/* Arabic Text */}
                  <p className="font-arabic text-2xl leading-[3] text-slate-800">
                    {ayat.teksArab}
                  </p>

                  {/* Translation - Only shown when toggled */}
                  {showTranslation && (
                    <div className="mt-3 pt-3 border-t border-slate-100" dir="ltr">
                      <p className="text-sm text-slate-600 text-left">{ayat.teksIndonesia}</p>
                    </div>
                  )}
                </div>

                {/* Play Icon & Verse Number */}
                <div className="flex flex-col items-center gap-1" dir="ltr">
                  {/* Play Button */}
                  <button
                    onClick={() => toggle(ayat.audio[QARI])}
                    disabled={audioLoading}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isPlaying && currentUrl === ayat.audio[QARI]
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                      }`}
                  >
                    {isPlaying && currentUrl === ayat.audio[QARI] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                      </svg>
                    )}
                  </button>
                  {/* Verse Number */}
                  <span className="text-xs text-primary-600 font-semibold">
                    {ayat.nomorAyat}
                  </span>
                </div>
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
  const navigate = useNavigate();
  const { nomor } = useParams();
  const selectedSuratNomor = nomor ? parseInt(nomor, 10) : null;

  const { suratList, loading, error } = useSuratList();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const [isJuzModalOpen, setIsJuzModalOpen] = useState(false);

  // Filter surahs based on search AND Juz
  const filteredSurahs = suratList.filter(surat => {
    // Search filter
    const matchesSearch =
      surat.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surat.arti.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surat.nomor.toString().includes(searchTerm);

    // Juz filter - uses mapping that handles surahs spanning multiple juz
    const matchesJuz = selectedJuz === null || isSurahInJuz(surat.nomor, selectedJuz);

    return matchesSearch && matchesJuz;
  });

  // Detail View
  if (selectedSuratNomor !== null) {
    return <SurahDetailView suratNomor={selectedSuratNomor} onBack={() => navigate('/study')} />;
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

  // DEBUG: Log error ke console, tidak tampilkan UI error
  if (error) {
    console.log('SurahList Error:', error);
  }

  // List View
  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Fixed Header */}
      <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Daftar Surat</h1>
            <p className="text-white/70 text-sm mt-1">
              {selectedJuz === null ? '114 Surat • 30 Juz' : `Juz ${selectedJuz} • ${filteredSurahs.length} Surat`}
            </p>
          </div>
          {/* Filter Button */}
          <button
            id="btn-juz-filter"
            onClick={() => setIsJuzModalOpen(true)}
            className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </button>
        </div>

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

      {/* Juz Filter Modal */}
      <JuzFilterModal
        isOpen={isJuzModalOpen}
        onClose={() => setIsJuzModalOpen(false)}
        currentSelectedJuz={selectedJuz}
        onSave={setSelectedJuz}
      />

      {/* Scrollable List Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
        {filteredSurahs.map((surat) => (
          <button
            key={surat.nomor}
            onClick={() => navigate(`/study/${surat.nomor}`)}
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