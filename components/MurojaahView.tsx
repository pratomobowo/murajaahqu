import React, { useState } from 'react';
import { MurojaahMenu } from './MurojaahMenu';
import { Quiz } from './Quiz';
import { HafalanView } from './HafalanView';
import { QuizMode } from '../types';

type ViewMode = QuizMode | 'HAFALAN' | null;

export const MurojaahView: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<ViewMode>(null);

  if (selectedMode === 'HAFALAN') {
    return <HafalanView onBack={() => setSelectedMode(null)} />;
  }

  if (selectedMode) {
    return <Quiz mode={selectedMode as QuizMode} onBack={() => setSelectedMode(null)} />;
  }

  return <MurojaahMenu onSelectMode={setSelectedMode} />;
};