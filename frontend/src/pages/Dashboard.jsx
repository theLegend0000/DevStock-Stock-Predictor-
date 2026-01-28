import { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import StockChart from '../components/charts/StockChart';
import StockCard from '../components/stocks/StockCard';
import MarketOverview from '../components/stocks/MarketOverview';
import PredictionCard from '../components/stocks/PredictionCard';
import { mockStocks, mockPredictions, mockMarketIndices } from '../data/mockData';
import './Dashboard.css';

/**
 * Dashboard Page
 * Main landing page displaying stock predictions, market overview,
 * and trending stocks. Designed for at-a-glance financial insights.
 */
function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('Dashboard mounted');
    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Memoize sorted stocks to prevent unnecessary recalculations
  const topGainers = useMemo(() => {
    return [...mockStocks]
      .sort((a, b) => (b.changePercent || 0) - (a.changePercent || 0))
      .slice(0, 4);
  }, []);

  const topLosers = useMemo(() => {
    return [...mockStocks]
      .sort((a, b) => (a.changePercent || 0) - (b.changePercent || 0))
      .slice(0, 4);
  }, []);

  return (
    <div className={`dashboard ${isLoaded ? 'dashboard-loaded' : ''}`}>
      {/* Page Header */}
      <div className="dashboard-header animate-section" style={{ animationDelay: '0.1s' }}>
        <div>
          <h1 className="dashboard-title">Stock Predictions</h1>
          <p className="dashboard-subtitle">
            AI-powered market analysis and price predictions
          </p>
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Market Overview Section */}
      <section className="dashboard-section animate-section" style={{ animationDelay: '0.2s' }}>
        <div className="section-header">
          <h2 className="section-title">Market Overview</h2>
        </div>
        <div className="market-indices-grid">
          {mockMarketIndices.map((index, i) => (
            <MarketOverview key={index.symbol || i} index={index} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Predictions Section */}
      <section className="dashboard-section animate-section" style={{ animationDelay: '0.3s' }}>
        <div className="section-header">
          <h2 className="section-title">Today's Top Predictions</h2>
          <span className="section-badge">AI Powered</span>
        </div>
        <div className="predictions-grid">
          {mockPredictions.slice(0, 3).map((prediction, i) => (
            <PredictionCard key={prediction.symbol} prediction={prediction} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Main Chart Section */}
      <section className="dashboard-section animate-section" style={{ animationDelay: '0.4s' }}>
        <div className="section-header">
          <h2 className="section-title">Featured Prediction: AAPL</h2>
          <Link to="/stock/AAPL" className="section-link">
            View Details <ArrowRight size={16} />
          </Link>
        </div>
        <div className="chart-container">
          <StockChart symbol="AAPL" />
        </div>
      </section>

      {/* Top Movers Grid */}
      <div className="movers-grid animate-section" style={{ animationDelay: '0.5s' }}>
        {/* Top Gainers */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp size={20} className="text-success" />
              Top Gainers
            </h2>
          </div>
          <div className="stocks-list">
            {topGainers.map((stock, i) => (
              <StockCard key={stock.symbol} stock={stock} compact delay={i * 0.05} />
            ))}
          </div>
        </section>

        {/* Top Losers */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingDown size={20} className="text-danger" />
              Top Losers
            </h2>
          </div>
          <div className="stocks-list">
            {topLosers.map((stock, i) => (
              <StockCard key={stock.symbol} stock={stock} compact delay={i * 0.05} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
