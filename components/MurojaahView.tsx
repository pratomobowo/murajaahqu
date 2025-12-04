import React, { useState } from 'react';
import { MurojaahMenu } from './MurojaahMenu';
import { Quiz } from './Quiz';
import { QuizMode } from '../types';

export const MurojaahView: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<QuizMode | null>(null);

  if (selectedMode) {
    return <Quiz mode={selectedMode} onBack={() => setSelectedMode(null)} />;
  }

  return <MurojaahMenu onSelectMode={setSelectedMode} />;
};