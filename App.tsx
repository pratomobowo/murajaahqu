import { useState } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { SurahList } from './components/SurahList';
import { MurojaahView } from './components/MurojaahView';
import { DzikirView } from './components/DzikirView';
import { DoaView } from './components/DoaView';
import { InfoView } from './components/InfoView';
import { SplashScreen } from './components/SplashScreen';
import { InstallPrompt } from './components/InstallPrompt';
import { OnboardingTutorial } from './components/OnboardingTutorial';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Splash screen akan muncul lagi setelah 24 jam tidak membuka aplikasi
const SPLASH_EXPIRY_HOURS = 24;

function App() {
  const location = useLocation();

  // Check if splash should be shown based on last visit time
  const [showSplash, setShowSplash] = useState(() => {
    const lastVisit = localStorage.getItem('murajaahqu_lastVisit');
    if (!lastVisit) return true;

    const lastVisitTime = parseInt(lastVisit, 10);
    const now = Date.now();
    const hoursSinceLastVisit = (now - lastVisitTime) / (1000 * 60 * 60);

    // Show splash if more than SPLASH_EXPIRY_HOURS have passed
    return hoursSinceLastVisit >= SPLASH_EXPIRY_HOURS;
  });

  // Save timestamp when splash is dismissed
  const handleStartApp = () => {
    localStorage.setItem('murajaahqu_lastVisit', Date.now().toString());
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <Layout>
        <SplashScreen onStart={handleStartApp} />
      </Layout>
    );
  }

  // Determine active tab for Navigation based on path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/study')) return 'study';
    if (path.startsWith('/quiz')) return 'quiz';
    if (path.startsWith('/dzikir')) return 'dzikir';
    if (path.startsWith('/doa')) return 'doa';
    if (path.startsWith('/info')) return 'info';
    return 'study';
  };

  return (
    <Layout>
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/study" element={<SurahList />} />
          <Route path="/study/:nomor" element={<SurahList />} />
          <Route path="/quiz" element={<MurojaahView />} />
          <Route path="/quiz/:mode" element={<MurojaahView />} />
          <Route path="/quiz/:mode/:id" element={<MurojaahView />} />
          <Route path="/dzikir" element={<DzikirView />} />
          <Route path="/dzikir/:type" element={<DzikirView />} />
          <Route path="/doa" element={<DoaView />} />
          <Route path="/doa/:id" element={<DoaView />} />
          <Route path="/info" element={<InfoView />} />
          <Route path="/" element={<Navigate to="/study" replace />} />
        </Routes>
      </main>
      <Navigation activeTab={getActiveTab()} />
      <InstallPrompt />
      <OnboardingTutorial />
    </Layout>
  );
}

export default App;