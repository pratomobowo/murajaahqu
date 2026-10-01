import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Stats } from '../types';
import { MAKHRAJ, MAKHRAJ_UMUM, Makhraj, makhrajDariHuruf, HURUF_SATU_MAKHRAJ, SEMUA_HURUF_MAKHRAJ, namaMakhrajUmum } from '../makhrajData';
import confetti from 'canvas-confetti';

const TIMER_SECONDS = 10;
const STATS_KEY = 'murojaahMakhrajStats';

type MakhrajQuizType = 'HURUF_KE_MAKHRAJ' | 'MAKHRAJ_KE_HURUF' | 'MAKHRAJ_KE_UMUM';

interface MakhrajQuestion {
  type: MakhrajQuizType;
  questionText: React.ReactNode;
  correctAnswer: string;
  options: string[];
  hurufOptions: boolean;
}

const loadStats = (): Stats => {
  try {
    const s = localStorage.getItem(STATS_KEY);
    if (s) return JSON.parse(s);
  } catch { /* ignore */ }
  return { totalAnswered: 0, correct: 0, streak: 0, bestStreak: 0 };
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const randomOf = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function generateQuestion(): MakhrajQuestion {
  const roll = Math.random();

  if (roll < 0.4) {
    // Huruf tertentu keluar dari makhraj apa? (hanya huruf bermakhraj tunggal)
    const huruf = randomOf(HURUF_SATU_MAKHRAJ);
    const benar = makhrajDariHuruf(huruf)[0];
    const distractors = shuffle(MAKHRAJ.filter((m) => m.id !== benar.id))
      .slice(0, 3)
      .map((m) => m.nama);
    return {
      type: 'HURUF_KE_MAKHRAJ',
      questionText: (
        <>
          Huruf <span className="text-6xl font-bold font-arabic block my-2" dir="rtl">{huruf}</span> keluar dari makhraj...
        </>
      ),
      correctAnswer: benar.nama,
      options: shuffle([benar.nama, ...distractors]),
      hurufOptions: false,
    };
  }

  if (roll < 0.8) {
    // Makhraj tertentu adalah tempat keluar huruf apa?
    const m: Makhraj = randomOf(MAKHRAJ);
    const benarHuruf = randomOf(m.huruf);
    const distractors = shuffle(SEMUA_HURUF_MAKHRAJ.filter((h) => !m.huruf.includes(h))).slice(0, 3);
    return {
      type: 'MAKHRAJ_KE_HURUF',
      questionText: (
        <>
          Makhraj <strong>"{m.nama}"</strong> adalah tempat keluar huruf...
          <span className="block text-sm text-gray-500 mt-2 font-normal">{m.deskripsi}</span>
        </>
      ),
      correctAnswer: benarHuruf,
      options: shuffle([benarHuruf, ...distractors]),
      hurufOptions: true,
    };
  }

  // Makhraj tertentu termasuk kelompok umum apa?
  const m: Makhraj = randomOf(MAKHRAJ);
  const benarUmum = namaMakhrajUmum(m.umum);
  return {
    type: 'MAKHRAJ_KE_UMUM',
    questionText: (
      <>
        Makhraj <strong>"{m.nama}"</strong> termasuk kelompok...
      </>
    ),
    correctAnswer: benarUmum,
    options: shuffle(MAKHRAJ_UMUM.map((u) => u.nama)),
    hurufOptions: false,
  };
}

interface Props {
  onBack: () => void;
}

export const MakhrajQuiz: React.FC<Props> = ({ onBack }) => {
  const [question, setQuestion] = useState<MakhrajQuestion | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>(loadStats);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [showResult, setShowResult] = useState(false);
  const timerRef = useRef<number | null>(null);

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion());
    setSelected(null);
    setShowResult(false);
    setTimeLeft(TIMER_SECONDS);
  }, []);

  useEffect(() => {
    nextQuestion();
  }, [nextQuestion]);

  useEffect(() => {
    if (showResult) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          setShowResult(true);
          setStats((prev) => {
            const next = { ...prev, totalAnswered: prev.totalAnswered + 1, streak: 0 };
            localStorage.setItem(STATS_KEY, JSON.stringify(next));
            return next;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [question, showResult]);

  const handleSelect = (opt: string) => {
    if (showResult || !question) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    setSelected(opt);
    setShowResult(true);
    const isCorrect = opt === question.correctAnswer;
    if (isCorrect) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#14b8a6', '#2dd4bf', '#5eead4'] });
      setStats((prev) => {
        const next = {
          ...prev,
          totalAnswered: prev.totalAnswered + 1,
          correct: prev.correct + 1,
          streak: prev.streak + 1,
          bestStreak: Math.max(prev.bestStreak, prev.streak + 1),
        };
        localStorage.setItem(STATS_KEY, JSON.stringify(next));
        return next;
      });
    } else {
      setStats((prev) => {
        const next = { ...prev, totalAnswered: prev.totalAnswered + 1, streak: 0 };
        localStorage.setItem(STATS_KEY, JSON.stringify(next));
        return next;
      });
    }
  };

  const accuracy = stats.totalAnswered > 0 ? Math.round((stats.correct / stats.totalAnswered) * 100) : 0;
  const progress = (timeLeft / TIMER_SECONDS) * 100;

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="flex-none flex items-center justify-between px-4 pt-4 mb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-500 hover:text-gray-800" aria-label="Kembali">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-gray-800">Murajaah Makhraj Huruf</h2>
        <div className="w-10 text-right">
          {stats.streak > 1 && <span className="text-sm font-bold text-teal-600">🔥{stats.streak}</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-5 text-white">
          <p className="text-teal-100 text-sm mb-2">Tempat keluarnya suara</p>
          <div className="text-xl font-semibold leading-relaxed min-h-[5rem] flex flex-col justify-center">
            {question ? question.questionText : 'Memuat soal...'}
          </div>
        </div>
        <div className="h-1.5 bg-gray-100">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 3 ? 'bg-red-500' : 'bg-teal-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className={`grid gap-3 mb-4 ${question?.hurufOptions ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {question?.options.map((opt) => {
          const isCorrect = showResult && opt === question.correctAnswer;
          const isWrong = showResult && selected === opt && opt !== question.correctAnswer;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={showResult}
              className={`
                rounded-xl border-2 font-semibold transition-all
                ${question.hurufOptions ? 'py-5 text-5xl font-arabic' : 'py-4 px-4 text-left text-base'}
                ${isCorrect ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-lg shadow-teal-500/30 scale-[1.02]'
                  : isWrong ? 'border-red-400 bg-red-50 text-red-600'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50'}
                ${showResult && !isCorrect && !isWrong ? 'opacity-60' : ''}
              `}
              dir={question.hurufOptions ? 'rtl' : undefined}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`rounded-xl p-4 mb-4 text-center font-semibold ${selected === question?.correctAnswer ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-700'}`}>
          {selected === question?.correctAnswer ? 'MasyaAllah, benar!' : timeLeft === 0 && !selected ? 'Waktu habis!' : 'Kurang tepat.'}
          {selected !== question?.correctAnswer && question && (
            <span className="block mt-1 font-normal text-sm">
              Jawaban: <strong>{question.correctAnswer}</strong>
            </span>
          )}
          <button
            onClick={nextQuestion}
            className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
          >
            Soal Berikutnya
          </button>
        </div>
      )}
      </div>

      <div className="flex-none grid grid-cols-3 gap-3 text-center px-4 pb-24 pt-2">
        <div className="bg-white rounded-xl p-3 shadow">
          <p className="text-2xl font-bold text-gray-800">{stats.totalAnswered}</p>
          <p className="text-xs text-gray-500">Soal</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow">
          <p className="text-2xl font-bold text-teal-600">{accuracy}%</p>
          <p className="text-xs text-gray-500">Akurasi</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow">
          <p className="text-2xl font-bold text-gray-800">{stats.bestStreak}</p>
          <p className="text-xs text-gray-500">Streak Terbaik</p>
        </div>
      </div>
    </div>
  );
};

