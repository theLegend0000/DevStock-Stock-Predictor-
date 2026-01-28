import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import StockChart from '../components/charts/StockChart';
import { stockApi } from '../services/api';
import './Dashboard.css';

/**
 * Analytics Page
 * Displays stock charts and price movement visualization.
 * Users can select different stocks to view their performance.
 */
function Analytics() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch stocks on mount
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await stockApi.getAll();
        setStocks(data);
        if (data.length > 0) {
          setSelectedStock(data[0]);
        }
      } catch (err) {
        console.error('Error fetching stocks:', err);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="analytics-page">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Analytics Dashboard</h1>
          <p className="dashboard-subtitle">
            Detailed stock performance and price movement analysis
          </p>
        </div>
      </div>

      {/* Stock Selection */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Select Stock to Analyze</h2>
        </div>

        <div className="stock-selector">
          {stocks.map((stock) => (
            <button
              key={stock.symbol}
              className={`stock-selector-btn ${
                selectedStock?.symbol === stock.symbol ? 'active' : ''
              }`}
              onClick={() => setSelectedStock(stock)}
            >
              <div className="stock-selector-symbol">{stock.symbol}</div>
              <div className="stock-selector-name">{stock.name}</div>
              <div className="stock-selector-price">${stock.price?.toFixed(2) || 'N/A'}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Chart Section */}
      {selectedStock && (
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp size={24} className="text-success" />
              {selectedStock.symbol} Price Movement
            </h2>
          </div>

          <div className="chart-container">
            <StockChart symbol={selectedStock.symbol} />
          </div>

          {/* Stock Stats */}
          <div className="stock-stats-grid">
            <div className="stat-card">
              <label>Current Price</label>
              <div className="stat-value">${selectedStock.price?.toFixed(2) || 'N/A'}</div>
            </div>
            <div className="stat-card">
              <label>Change</label>
              <div className={`stat-value ${selectedStock.changePercent >= 0 ? 'positive' : 'negative'}`}>
                {selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent?.toFixed(2) || 0}%
              </div>
            </div>
            <div className="stat-card">
              <label>Volume</label>
              <div className="stat-value">{selectedStock.volume || 'N/A'}</div>
            </div>
            <div className="stat-card">
              <label>Market Cap</label>
              <div className="stat-value">{selectedStock.marketCap || 'N/A'}</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Analytics;
