import React, { useState } from 'react';
import { QURAN_HAFALAN_DATA, QuranSurah } from '../quranData';

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

export const HafalanView: React.FC<HafalanViewProps> = ({ onBack }) => {
    const [selectedSurah, setSelectedSurah] = useState<QuranSurah | null>(null);
    const [revealedVerses, setRevealedVerses] = useState<Set<number>>(new Set());
    const [showAll, setShowAll] = useState(false);

    const toggleVerse = (verseNumber: number) => {
        const newRevealed = new Set(revealedVerses);
        if (newRevealed.has(verseNumber)) {
            newRevealed.delete(verseNumber);
        } else {
            newRevealed.add(verseNumber);
        }
        setRevealedVerses(newRevealed);
    };

    const toggleShowAll = () => {
        if (showAll) {
            setRevealedVerses(new Set());
        } else {
            const allVerses = new Set(selectedSurah?.verses.map(v => v.number) || []);
            setRevealedVerses(allVerses);
        }
        setShowAll(!showAll);
    };

    const handleSelectSurah = (surah: QuranSurah) => {
        setSelectedSurah(surah);
        setRevealedVerses(new Set());
        setShowAll(false);
    };

    const handleBackToList = () => {
        setSelectedSurah(null);
        setRevealedVerses(new Set());
        setShowAll(false);
    };

    // Surah Detail View
    if (selectedSurah) {
        return (
            <div className="flex flex-col h-full bg-slate-50">
                {/* Header */}
                <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-4 py-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBackToList}
                            className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <div className="flex-1">
                            <h2 className="font-bold text-white text-lg">{selectedSurah.latin}</h2>
                            <p className="text-xs text-white/70">{selectedSurah.totalVerses} Ayat • Ketuk ayat untuk membuka</p>
                        </div>
                        <span className="font-arabic text-2xl text-white" dir="rtl">{selectedSurah.name}</span>
                    </div>

                    {/* Toggle Button */}
                    <button
                        onClick={toggleShowAll}
                        className="mt-3 w-full py-2 bg-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors"
                    >
                        {showAll ? 'Sembunyikan Semua' : 'Tampilkan Semua'}
                    </button>
                </div>

                {/* Verses */}
                <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
                    {/* Bismillah for non-Fatihah */}
                    {selectedSurah.number !== 1 && (
                        <div className="text-center py-4 mb-4">
                            <p className="font-arabic text-2xl text-primary-600" dir="rtl">
                                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                            </p>
                        </div>
                    )}

                    <div className="space-y-3">
                        {selectedSurah.verses.map((verse) => {
                            const isRevealed = revealedVerses.has(verse.number);
                            const firstWord = getFirstWord(verse.arabic);
                            const remainingWords = getRemainingWords(verse.arabic);
                            const hasRemaining = remainingWords.length > 0;

                            return (
                                <button
                                    key={verse.number}
                                    onClick={() => toggleVerse(verse.number)}
                                    className={`w-full text-right bg-white rounded-2xl p-4 shadow-sm border transition-all duration-300 ${isRevealed
                                            ? 'border-primary-200 bg-primary-50/50'
                                            : 'border-slate-100 hover:border-primary-100 hover:shadow-md'
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
                                            {verse.number}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Info if verses are incomplete */}
                    {selectedSurah.verses.length < selectedSurah.totalVerses && (
                        <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-100">
                            <p className="text-sm text-amber-700 text-center">
                                Menampilkan {selectedSurah.verses.length} dari {selectedSurah.totalVerses} ayat.
                                Ayat lainnya akan ditambahkan segera.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
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
                    <p className="text-xs text-white/70">Pilih surat untuk murajaah</p>
                </div>
            </div>

            {/* Surah List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
                {QURAN_HAFALAN_DATA.map((surah) => (
                    <button
                        key={surah.number}
                        onClick={() => handleSelectSurah(surah)}
                        className="w-full text-left group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Number Badge */}
                                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary-50 text-primary-600 font-semibold text-sm">
                                    {surah.number}
                                </div>

                                {/* Info */}
                                <div>
                                    <h3 className="font-semibold text-slate-800 text-base">{surah.latin}</h3>
                                    <p className="text-xs text-slate-500">{surah.verses.length} dari {surah.totalVerses} Ayat tersedia</p>
                                </div>
                            </div>

                            {/* Arabic Name */}
                            <div className="flex items-center gap-3">
                                <span className="font-arabic text-xl text-slate-700" dir="rtl">{surah.name}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </button>
                ))}

                {/* Coming Soon Note */}
                <div className="mt-4 bg-slate-100 rounded-xl p-4">
                    <p className="text-sm text-slate-500 text-center">
                        Surat lainnya akan ditambahkan secara bertahap. In syaa Allah.
                    </p>
                </div>
            </div>
        </div>
    );
};
