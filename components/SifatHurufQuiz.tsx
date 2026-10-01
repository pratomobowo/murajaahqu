import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Stats } from '../types';
import {
  HURUF_SIFAT,
  HurufSifat,
  DIMENSI_SIFAT,
  LAWAN_SIFAT,
  SEMUA_SIFAT,
  SIFAT_DESKRIPSI,
  hurufPunyaSifat,
} from '../sifatHurufData';
import confetti from 'canvas-confetti';

const TIMER_SECONDS = 10;
const STATS_KEY = 'murojaahSifatStats';

type SifatQuizType = 'HURUF_SIFAT' | 'SIFAT_HURUF' | 'LAWAN';

interface SifatQuestion {
  type: SifatQuizType;
  questionText: React.ReactNode;
  correctAnswer: string;
  options: string[];
  hurufOptions: boolean; // true = opsi berupa huruf hijaiyah (render besar)
}

// Fisher-Yates shuffle (lebih merata dari sort random)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface SifatHurufQuizProps {
  onBack: () => void;
}

export const SifatHurufQuiz: React.FC<SifatHurufQuizProps> = ({ onBack }) => {
  const [question, setQuestion] = useState<SifatQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [stats, setStats] = useState<Stats>(() => {
    try {
      const saved = localStorage.getItem(STATS_KEY);
      return saved
        ? JSON.parse(saved)
        : { totalAnswered: 0, correct: 0, streak: 0, bestStreak: 0 };
    } catch (e) {
      return { totalAnswered: 0, correct: 0, streak: 0, bestStreak: 0 };
    }
  });

  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  const generateQuestion = useCallback(() => {
    const type = randomOf<SifatQuizType>(['HURUF_SIFAT', 'SIFAT_HURUF', 'LAWAN']);

    let questionText: React.ReactNode;
    let correctAnswer: string;
    let options: string[];
    let hurufOptions = false;

    if (type === 'HURUF_SIFAT') {
      // Tipe 1: huruf X pada dimensi tertentu bersifat apa?
      const h: HurufSifat = randomOf(HURUF_SIFAT);
      const dimensi = randomOf(DIMENSI_SIFAT);
      correctAnswer = h[dimensi.id];
      options = shuffle(dimensi.values);
      questionText = (
        <span>
          Huruf{' '}
          <span className="font-arabic text-4xl text-sky-600 mx-1" dir="rtl">
            {h.huruf}
          </span>{' '}
          pada &ldquo;{dimensi.label}&rdquo; bersifat...
        </span>
      );
    } else if (type === 'SIFAT_HURUF') {
      // Tipe 2: huruf apa yang memiliki sifat X?
      const sifat = randomOf(SEMUA_SIFAT);
      const punyaSifat = HURUF_SIFAT.filter((h) => hurufPunyaSifat(h, sifat));
      const tidakPunya = HURUF_SIFAT.filter((h) => !hurufPunyaSifat(h, sifat));
      const benar = randomOf(punyaSifat);
      correctAnswer = benar.huruf;
      const salah = shuffle(tidakPunya).slice(0, 3).map((h) => h.huruf);
      options = shuffle([correctAnswer, ...salah]);
      hurufOptions = true;
      questionText = (
        <span>
          Huruf yang bersifat <span className="font-bold">{sifat}</span> adalah...
          <span className="block text-sm font-normal text-slate-500 mt-2">
            {SIFAT_DESKRIPSI[sifat]}
          </span>
        </span>
      );
    } else {
      // Tipe 3: apa lawan dari sifat X?
      const sifat = randomOf(Object.keys(LAWAN_SIFAT));
      correctAnswer = LAWAN_SIFAT[sifat];
      const distractors = shuffle(
        SEMUA_SIFAT.filter((s) => s !== sifat && s !== correctAnswer)
      ).slice(0, 3);
      options = shuffle([correctAnswer, ...distractors]);
      questionText = (
        <span>
          Lawan dari sifat <span className="font-bold">{sifat}</span> adalah...
        </span>
      );
    }

    setQuestion({ type, questionText, correctAnswer, options, hurufOptions });
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setTimeLeft(TIMER_SECONDS);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  // Timer countdown effect
  useEffect(() => {
    if (isAnswered || !question) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Waktu habis, otomatis salah
          clearInterval(timerRef.current!);
          setIsAnswered(true);
          setIsCorrect(false);
          setStats((s) => ({
            ...s,
            totalAnswered: s.totalAnswered + 1,
            streak: 0,
          }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [question, isAnswered]);

  const handleAnswer = (option: string) => {
    if (isAnswered || !question) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const correct = option === question.correctAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);
    setSelectedOption(option);

    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#38bdf8', '#fcd34d'],
      });

      setStats((prev) => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        correct: prev.correct + 1,
        streak: prev.streak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.streak + 1),
      }));
    } else {
      setStats((prev) => ({
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        streak: 0,
      }));
    }
  };

  const renderOptionContent = (option: string) => {
    if (question?.hurufOptions) {
      return (
        <span className="font-arabic text-4xl" dir="rtl">
          {option}
        </span>
      );
    }
    return option;
  };

  if (!question) return <div className="p-10 text-center">Memuat...</div>;

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Quiz Header */}
      <div className="flex-none bg-gradient-to-r from-sky-600 to-sky-500 z-20 px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <div>
              <h2 className="font-bold text-white text-lg leading-tight">
                Murajaah Sifat Huruf
              </h2>
              <p className="text-xs text-white/70">
                Latihan sifat-sifat huruf hijaiyah
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              Streak
            </span>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-white">
                {stats.streak}
              </span>
              <span className="text-amber-300 text-lg">🔥</span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              Timer
            </span>
            <div
              className={`text-2xl font-bold ${
                timeLeft <= 3 ? 'text-red-300 animate-pulse' : 'text-white'
              }`}
            >
              {isAnswered ? '—' : timeLeft}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
              Akurasi
            </span>
            <div className="text-xl font-bold text-white">
              {stats.totalAnswered > 0
                ? Math.round((stats.correct / stats.totalAnswered) * 100)
                : 0}
              %
            </div>
          </div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-1.5 mb-2">
          <div
            className={`h-1.5 rounded-full transition-all duration-1000 ${
              timeLeft <= 3 ? 'bg-red-400' : 'bg-white'
            }`}
            style={{
              width: isAnswered ? '0%' : `${(timeLeft / TIMER_SECONDS) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center mb-4 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-50 rounded-full opacity-50 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 text-sky-600 mb-3">
              <span className="font-bold text-base">?</span>
            </div>
            <h2 className="text-lg font-bold text-slate-800 leading-snug">
              {question.questionText}
            </h2>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-2.5">
          {question.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === question.correctAnswer;

            let buttonStyle =
              'bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50';

            if (isAnswered) {
              if (isCorrectOption) {
                buttonStyle =
                  'bg-green-100 border-green-500 text-green-800 ring-1 ring-green-500';
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = 'bg-red-50 border-red-300 text-red-800';
              } else {
                buttonStyle =
                  'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={`relative w-full p-3.5 rounded-xl border-2 text-base font-medium transition-all duration-200 shadow-sm active:scale-[0.98] ${buttonStyle}`}
              >
                {renderOptionContent(option)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Action Sheet */}
      {isAnswered && (
        <div className="fixed bottom-20 left-0 right-0 z-40 mx-auto max-w-md px-6">
          <button
            onClick={generateQuestion}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-sky-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
              isCorrect
                ? 'bg-sky-600 hover:bg-sky-700'
                : 'bg-slate-800 hover:bg-slate-900'
            }`}
          >
            <span>{isCorrect ? 'Lanjut' : 'Coba Lagi'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
