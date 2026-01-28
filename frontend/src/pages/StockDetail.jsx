import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Star, Bell } from 'lucide-react';
import StockChart from '../components/charts/StockChart';
import PredictionCard from '../components/stocks/PredictionCard';
import { mockStocks, mockPredictions } from '../data/mockData';
import './Dashboard.css';

/**
 * Stock Detail Page
 * Displays detailed stock information, charts, and predictions
 * for a specific stock symbol.
 */
function StockDetail() {
  const { symbol } = useParams();
  
  // Find stock data
  const stock = mockStocks.find(s => s.symbol === symbol) || mockStocks[0];
  const prediction = mockPredictions.find(p => p.symbol === symbol) || mockPredictions[0];
  
  const isPositive = stock.changePercent >= 0;

  const stats = [
    { label: 'Market Cap', value: stock.marketCap },
    { label: 'Volume', value: stock.volume },
    { label: '52W High', value: `$${(stock.price * 1.25).toFixed(2)}` },
    { label: '52W Low', value: `$${(stock.price * 0.75).toFixed(2)}` },
  ];

  return (
    <div className="stock-detail">
      {/* Back Navigation */}
      <Link to="/" className="section-link" style={{ width: 'fit-content' }}>
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      {/* Stock Header */}
      <div className="stock-detail-header">
        <div className="stock-info">
          <div className="stock-logo">
            {stock.symbol.charAt(0)}
          </div>
          <div className="stock-name-group">
            <span className="stock-symbol-tag">{stock.symbol}</span>
            <h1 className="stock-company-name">{stock.name}</h1>
          </div>
        </div>

        <div className="stock-price-group">
          <div className="stock-current-price">${stock.price.toFixed(2)}</div>
          <div className={`stock-price-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span>
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
        <button className="btn btn-primary btn-lg">
          <Star size={18} />
          Add to Watchlist
        </button>
        <button className="btn btn-secondary btn-lg">
          <Bell size={18} />
          Set Alert
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Price Chart & Prediction</h2>
        </div>
        <div className="chart-container">
          <StockChart symbol={stock.symbol} showPrediction />
        </div>
      </section>

      {/* AI Prediction */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">AI Prediction Analysis</h2>
          <span className="section-badge">AI Powered</span>
        </div>
        <div style={{ maxWidth: '400px' }}>
          <PredictionCard prediction={prediction} detailed />
        </div>
      </section>
    </div>
  );
}

export default StockDetail;
