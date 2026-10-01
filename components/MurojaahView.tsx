import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MurojaahMenu } from './MurojaahMenu';
import { Quiz } from './Quiz';
import { HafalanView } from './HafalanView';
import { TebakAyatQuiz } from './TebakAyatQuiz';
import { SifatHurufQuiz } from './SifatHurufQuiz';
import { SifatHurufStudy } from './SifatHurufStudy';
import { MakhrajQuiz } from './MakhrajQuiz';
import { MakhrajStudy } from './MakhrajStudy';
import { TopikHub } from './TopikHub';
import { QuizMode } from '../types';

export const MurojaahView: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useParams();
  const selectedMode = mode ? mode.toUpperCase() : null;

  if (selectedMode === 'HAFALAN') {
    return <HafalanView onBack={() => navigate('/murajaah')} />;
  }

  if (selectedMode === 'TEBAK_AYAT') {
    return <TebakAyatQuiz onBack={() => navigate('/murajaah')} />;
  }

  if (selectedMode === 'SIFAT_HURUF') {
    return (
      <TopikHub
        title="Sifat Huruf"
        subtitle="Materi & kuis sifat huruf hijaiyah"
        headerClass="from-sky-600 to-sky-500"
        tabActiveClass="text-sky-600"
        onBack={() => navigate('/murajaah')}
        materi={<SifatHurufStudy />}
        renderKuis={(kembaliKeMateri) => <SifatHurufQuiz onBack={kembaliKeMateri} />}
      />
    );
  }

  if (selectedMode === 'MAKHRAJ') {
    return (
      <TopikHub
        title="Makhraj Huruf"
        subtitle="Materi & kuis tempat keluar huruf"
        headerClass="from-teal-600 to-teal-500"
        tabActiveClass="text-teal-600"
        onBack={() => navigate('/murajaah')}
        materi={<MakhrajStudy />}
        renderKuis={(kembaliKeMateri) => <MakhrajQuiz onBack={kembaliKeMateri} />}
      />
    );
  }

  if (selectedMode) {
    return <Quiz mode={selectedMode as QuizMode} onBack={() => navigate('/murajaah')} />;
  }

  return <MurojaahMenu onSelectMode={(m) => navigate(`/murajaah/${m.toLowerCase()}`)} />;
};