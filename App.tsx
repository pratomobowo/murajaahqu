import { useState } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { SurahList } from './components/SurahList';
import { MurojaahView } from './components/MurojaahView';
import { DalilView } from './components/DalilView';
import { InfoView } from './components/InfoView';
import { SplashScreen } from './components/SplashScreen';

type TabType = 'study' | 'quiz' | 'dalil' | 'info';

// Splash screen akan muncul lagi setelah 24 jam tidak membuka aplikasi
const SPLASH_EXPIRY_HOURS = 24;

function App() {
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

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const saved = localStorage.getItem('murajaahqu_activeTab') as TabType | null;
    return saved && ['study', 'quiz', 'dalil', 'info'].includes(saved) ? saved : 'study';
  });

  // Save timestamp when splash is dismissed
  const handleStartApp = () => {
    localStorage.setItem('murajaahqu_lastVisit', Date.now().toString());
    setShowSplash(false);
  };

  // Save active tab and update last visit time
  const handleTabChange = (tab: TabType) => {
    localStorage.setItem('murajaahqu_activeTab', tab);
    localStorage.setItem('murajaahqu_lastVisit', Date.now().toString());
    setActiveTab(tab);
  };

  if (showSplash) {
    return (
      <Layout>
        <SplashScreen onStart={handleStartApp} />
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex-1 overflow-hidden">
        {activeTab === 'study' && <SurahList />}
        {activeTab === 'quiz' && <MurojaahView />}
        {activeTab === 'dalil' && <DalilView />}
        {activeTab === 'info' && <InfoView />}
      </main>
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
    </Layout>
  );
}

export default App;