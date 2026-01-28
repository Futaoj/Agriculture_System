
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MarketDataView from './components/MarketDataView';
import PredictionEngine from './components/PredictionEngine';
import InventoryManager from './components/InventoryManager';
import AlgorithmIntro from './components/AlgorithmIntro';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/market" element={<MarketDataView />} />
          <Route path="/predict" element={<PredictionEngine />} />
          <Route path="/inventory" element={<InventoryManager />} />
          <Route path="/algorithms" element={<AlgorithmIntro />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
