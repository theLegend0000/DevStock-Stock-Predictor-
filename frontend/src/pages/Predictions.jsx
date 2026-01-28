import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { predictionApi, stockApi } from '../services/api';
import './Dashboard.css';

/**
 * Predictions Page
 * Allows users to select a stock and view AI-powered predictions
 * with detailed analysis tables.
 */
function Predictions() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available stocks on mount
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await stockApi.getAll();
        setStocks(data);
        // Select first stock by default
        if (data.length > 0) {
          setSelectedStock(data[0]);
        }
      } catch (err) {
        console.error('Error fetching stocks:', err);
        setError('Failed to load stocks');
      }
    };

    fetchStocks();
  }, []);

  // Fetch prediction when selected stock changes
  useEffect(() => {
    const fetchPrediction = async () => {
      if (!selectedStock) return;

      setLoading(true);
      setError(null);
      try {
        const data = await predictionApi.getBySymbol(selectedStock.symbol);
        setPrediction(data);
      } catch (err) {
        console.error('Error fetching prediction:', err);
        setError(`Failed to load prediction for ${selectedStock.symbol}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [selectedStock]);

  return (
    <div className="predictions-page">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Stock Predictions</h1>
          <p className="dashboard-subtitle">
            AI-powered price predictions and market analysis
          </p>
        </div>
      </div>

      {/* Stock Selection Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Select a Stock to Analyze</h2>
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

      {/* Prediction Results Section */}
      {selectedStock && (
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp size={24} className="text-success" />
              Prediction for {selectedStock.symbol}
            </h2>
          </div>

          {error && (
            <div className="alert alert-error">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading prediction data...</p>
            </div>
          ) : prediction ? (
            <div className="prediction-details">
              {/* Main Prediction Card */}
              <div className="prediction-main-card">
                <div className="prediction-info-grid">
                  <div className="prediction-info-item">
                    <label>Company Name</label>
                    <div className="prediction-value">{prediction.name || selectedStock.name}</div>
                  </div>
                  <div className="prediction-info-item">
                    <label>Stock Symbol</label>
                    <div className="prediction-value">{prediction.symbol}</div>
                  </div>
                  <div className="prediction-info-item">
                    <label>Current Price</label>
                    <div className="prediction-value">${selectedStock.price?.toFixed(2) || 'N/A'}</div>
                  </div>
                  <div className="prediction-info-item">
                    <label>Predicted Price</label>
                    <div className="prediction-value text-success">
                      ${prediction.nextPrice?.toFixed(2) || 'N/A'}
                    </div>
                  </div>
                  <div className="prediction-info-item">
                    <label>Confidence Level</label>
                    <div className="prediction-value">
                      <div className="confidence-bar">
                        <div
                          className="confidence-fill"
                          style={{ width: `${prediction.confidence || 0}%` }}
                        />
                      </div>
                      <span className="confidence-text">{prediction.confidence || 0}%</span>
                    </div>
                  </div>
                  <div className="prediction-info-item">
                    <label>Market Trend</label>
                    <div className={`prediction-value trend-${prediction.trend || 'neutral'}`}>
                      {prediction.trend?.charAt(0).toUpperCase() + prediction.trend?.slice(1) || 'Neutral'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Tables */}
              <div className="analysis-tables">
                {/* Technical Indicators Table */}
                <div className="analysis-table-section">
                  <h3>Technical Indicators</h3>
                  <div className="table-container">
                    <table className="analysis-table">
                      <thead>
                        <tr>
                          <th>Indicator</th>
                          <th>Value</th>
                          <th>Signal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>RSI (14)</td>
                          <td>65.2</td>
                          <td><span className="signal-strong">Strong</span></td>
                        </tr>
                        <tr>
                          <td>MACD</td>
                          <td>0.45</td>
                          <td><span className="signal-bullish">Bullish</span></td>
                        </tr>
                        <tr>
                          <td>Moving Average (50)</td>
                          <td>${(selectedStock.price * 0.98).toFixed(2)}</td>
                          <td><span className="signal-above">Above</span></td>
                        </tr>
                        <tr>
                          <td>Moving Average (200)</td>
                          <td>${(selectedStock.price * 0.95).toFixed(2)}</td>
                          <td><span className="signal-above">Above</span></td>
                        </tr>
                        <tr>
                          <td>Bollinger Bands</td>
                          <td>Mid: ${selectedStock.price?.toFixed(2)}</td>
                          <td><span className="signal-neutral">Neutral</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Market Sentiment Table */}
                <div className="analysis-table-section">
                  <h3>Market Sentiment Analysis</h3>
                  <div className="table-container">
                    <table className="analysis-table">
                      <thead>
                        <tr>
                          <th>Factor</th>
                          <th>Score</th>
                          <th>Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Price Momentum</td>
                          <td>78%</td>
                          <td><span className="impact-positive">Positive</span></td>
                        </tr>
                        <tr>
                          <td>Volume Trend</td>
                          <td>65%</td>
                          <td><span className="impact-positive">Positive</span></td>
                        </tr>
                        <tr>
                          <td>Volatility Index</td>
                          <td>42%</td>
                          <td><span className="impact-neutral">Moderate</span></td>
                        </tr>
                        <tr>
                          <td>Sector Performance</td>
                          <td>72%</td>
                          <td><span className="impact-positive">Positive</span></td>
                        </tr>
                        <tr>
                          <td>News Sentiment</td>
                          <td>81%</td>
                          <td><span className="impact-positive">Positive</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Risk Assessment Table */}
                <div className="analysis-table-section">
                  <h3>Risk Assessment</h3>
                  <div className="table-container">
                    <table className="analysis-table">
                      <thead>
                        <tr>
                          <th>Risk Factor</th>
                          <th>Level</th>
                          <th>Mitigation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Market Volatility</td>
                          <td><span className="risk-medium">Medium</span></td>
                          <td>Diversify portfolio</td>
                        </tr>
                        <tr>
                          <td>Concentration Risk</td>
                          <td><span className="risk-low">Low</span></td>
                          <td>Monitor allocation</td>
                        </tr>
                        <tr>
                          <td>Liquidity Risk</td>
                          <td><span className="risk-low">Low</span></td>
                          <td>Good trading volume</td>
                        </tr>
                        <tr>
                          <td>Earnings Risk</td>
                          <td><span className="risk-medium">Medium</span></td>
                          <td>Track earnings dates</td>
                        </tr>
                        <tr>
                          <td>Geopolitical Risk</td>
                          <td><span className="risk-low">Low</span></td>
                          <td>Monitor news</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      )}
    </div>
  );
}

export default Predictions;
