import React, { useState, useEffect } from 'react';
import { useSuratList, useSuratDetail } from '../hooks/useQuran';

interface HafalanViewProps {
    onBack: () => void;
}

// Helper function to get first word of Arabic text
const getFirstWord = (text: string): string => {
    const words = text.split(' ');
    return words[0] || '';
};

// Helper function to get remaining words after first
const getRemainingWords = (text: string): string => {
    const words = text.split(' ');
    if (words.length <= 1) return '';
    return words.slice(1).join(' ');
};

// ==================== Surah Detail View with API ====================
const SurahDetailView: React.FC<{
    suratNomor: number;
    onBack: () => void;
}> = ({ suratNomor, onBack }) => {
    const { surat, loading, error } = useSuratDetail(suratNomor);
    const [revealedVerses, setRevealedVerses] = useState<Set<number>>(new Set());

    // Reset state when surat changes
    useEffect(() => {
        setRevealedVerses(new Set());
    }, [suratNomor]);

    const toggleVerse = (verseNumber: number) => {
        const newRevealed = new Set(revealedVerses);
        if (newRevealed.has(verseNumber)) {
            newRevealed.delete(verseNumber);
        } else {
            newRevealed.add(verseNumber);
        }
        setRevealedVerses(newRevealed);
    };

    // Loading state - tampilkan loading jika sedang loading ATAU surat belum ada (dan tidak ada error)
    if (loading || (!surat && !error)) {
        return (
            <div className="flex flex-col h-full bg-slate-50">
                <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-4 py-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <div className="flex-1">
                            <h2 className="font-bold text-white text-lg">Memuat...</h2>
                        </div>
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

    // Jika surat masih null, tetap tampilkan loading
    if (!surat) {
        return (
            <div className="flex flex-col h-full bg-slate-50">
                <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-4 py-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <div className="flex-1">
                            <h2 className="font-bold text-white text-lg">Memuat...</h2>
                        </div>
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
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div className="flex-1">
                        <h2 className="font-bold text-white text-lg">{surat.namaLatin}</h2>
                        <p className="text-xs text-white/70">{surat.jumlahAyat} Ayat • {surat.tempatTurun}</p>
                    </div>
                    <span className="font-arabic text-2xl text-white" dir="rtl">{surat.nama}</span>
                </div>
            </div>

            {/* Verses */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
                {/* Bismillah for non-Fatihah and non-At-Taubah */}
                {surat.nomor !== 1 && surat.nomor !== 9 && (
                    <div className="text-center py-4 mb-4">
                        <p className="font-arabic text-2xl text-primary-600" dir="rtl">
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    {surat.ayat.map((ayat) => {
                        const isRevealed = revealedVerses.has(ayat.nomorAyat);
                        const firstWord = getFirstWord(ayat.teksArab);
                        const remainingWords = getRemainingWords(ayat.teksArab);
                        const hasRemaining = remainingWords.length > 0;

                        return (
                            <button
                                key={ayat.nomorAyat}
                                onClick={() => toggleVerse(ayat.nomorAyat)}
                                className={`w-full text-right bg-white rounded-2xl p-4 shadow-sm border transition-all duration-300 ${isRevealed
                                    ? 'border-primary-200 bg-primary-50/50'
                                    : 'border-slate-100 hover:border-primary-100'
                                    }`}
                                dir="rtl"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <p className="font-arabic text-2xl leading-loose text-slate-800">
                                            {/* First word - always visible */}
                                            <span>{firstWord}</span>

                                            {/* Remaining words - blurred or visible */}
                                            {hasRemaining && (
                                                <>
                                                    <span> </span>
                                                    <span
                                                        className={`transition-all duration-300 ${isRevealed
                                                            ? 'blur-none opacity-100'
                                                            : 'blur-sm opacity-50 select-none'
                                                            }`}
                                                    >
                                                        {remainingWords}
                                                    </span>
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* Verse Number */}
                                    <span className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold font-sans transition-colors ${isRevealed
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-primary-100 text-primary-600'
                                        }`} dir="ltr">
                                        {ayat.nomorAyat}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// ==================== Main HafalanView Component ====================
export const HafalanView: React.FC<HafalanViewProps> = ({ onBack }) => {
    const { suratList, loading, error } = useSuratList();
    const [selectedSuratNomor, setSelectedSuratNomor] = useState<number | null>(null);

    const handleSelectSurah = (nomor: number) => {
        setSelectedSuratNomor(nomor);
    };

    const handleBackToList = () => {
        setSelectedSuratNomor(null);
    };

    // Surah Detail View
    if (selectedSuratNomor !== null) {
        return (
            <SurahDetailView
                suratNomor={selectedSuratNomor}
                onBack={handleBackToList}
            />
        );
    }

    // Loading state - juga tampilkan loading jika data masih kosong dan tidak ada error
    if (loading || (suratList.length === 0 && !error)) {
        return (
            <div className="flex flex-col h-full bg-slate-50">
                <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-4 py-4 shadow-sm flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="font-bold text-white text-lg">Murajaah Hafalan</h2>
                        <p className="text-xs text-white/70">Memuat daftar surat...</p>
                    </div>
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
        console.log('HafalanView List Error:', error);
    }

    // Surah List View
    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-4 py-4 shadow-sm flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <div>
                    <h2 className="font-bold text-white text-lg">Murajaah Hafalan</h2>
                    <p className="text-xs text-white/70">114 Surat Al-Quran</p>
                </div>
            </div>

            {/* Surah List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
                {suratList.map((surat) => (
                    <button
                        key={surat.nomor}
                        onClick={() => handleSelectSurah(surat.nomor)}
                        className="w-full text-left group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Number Badge */}
                                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary-50 text-primary-600 font-semibold text-sm">
                                    {surat.nomor}
                                </div>

                                {/* Info */}
                                <div>
                                    <h3 className="font-semibold text-slate-800 text-base">{surat.namaLatin}</h3>
                                    <p className="text-xs text-slate-500">{surat.jumlahAyat} Ayat • {surat.tempatTurun}</p>
                                </div>
                            </div>

                            {/* Arabic Name */}
                            <div className="flex items-center gap-3">
                                <span className="font-arabic text-xl text-slate-700" dir="rtl">{surat.nama}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
