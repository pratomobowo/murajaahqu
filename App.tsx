import { useState } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { SurahList } from './components/SurahList';
import { MurojaahView } from './components/MurojaahView';
import { DalilView } from './components/DalilView';

function App() {
  const [activeTab, setActiveTab] = useState<'study' | 'quiz' | 'dalil'>('study');

  return (
    <Layout>
      <main className="flex-1 overflow-hidden">
        {activeTab === 'study' && <SurahList />}
        {activeTab === 'quiz' && <MurojaahView />}
        {activeTab === 'dalil' && <DalilView />}
      </main>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </Layout>
  );
}

export default App;