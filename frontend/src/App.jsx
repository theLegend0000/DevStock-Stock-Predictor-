import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import StockDetail from './pages/StockDetail';
import Predictions from './pages/Predictions';
import Analytics from './pages/Analytics';
import DebugEnv from './pages/DebugEnv';

function App() {
  return (
    <Routes>
      {/* Welcome/Landing Page - Full Screen Experience */}
      <Route path="/" element={<Welcome />} />
      
      {/* Main App with Layout */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/news" element={<Layout />}>
        <Route index element={<News />} />
      </Route>
      <Route path="/predictions" element={<Layout />}>
        <Route index element={<Predictions />} />
      </Route>
      <Route path="/analytics" element={<Layout />}>
        <Route index element={<Analytics />} />
      </Route>
      <Route path="/stock/:symbol" element={<Layout />}>
        <Route index element={<StockDetail />} />
      </Route>
      <Route path="/debug-env" element={<Layout />}>
        <Route index element={<DebugEnv />} />
      </Route>
    </Routes>
  );
}

export default App;
