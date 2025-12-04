import { useState } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { SurahList } from './components/SurahList';
import { MurojaahView } from './components/MurojaahView';
import { DalilView } from './components/DalilView';
import { InfoView } from './components/InfoView';
import { SplashScreen } from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<'study' | 'quiz' | 'dalil' | 'info'>('study');

  if (showSplash) {
    return (
      <Layout>
        <SplashScreen onStart={() => setShowSplash(false)} />
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
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </Layout>
  );
}

export default App;