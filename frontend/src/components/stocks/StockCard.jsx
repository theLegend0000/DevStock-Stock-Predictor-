import { memo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StockCard.css';

/**
 * StockCard Component
 * Displays stock information in a card format.
 * Memoized to prevent unnecessary re-renders.
 * 
 * @param {Object} stock - Stock data object
 * @param {boolean} compact - Whether to render in compact mode
 * @param {number} delay - Animation delay in seconds
 */
const StockCard = memo(function StockCard({ stock, compact = false, delay = 0 }) {
  const isPositive = stock.changePercent >= 0;

  if (compact) {
    return (
      <Link 
        to={`/stock/${stock.symbol}`} 
        className="stock-card-compact card-animate"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="stock-card-left">
          <div className="stock-card-symbol">{stock.symbol}</div>
          <div className="stock-card-name">{stock.name}</div>
        </div>
        <div className="stock-card-right">
          <div className="stock-card-price">${stock.price.toFixed(2)}</div>
          <div className={`stock-card-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/stock/${stock.symbol}`} 
      className="stock-card card-animate"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="stock-card-header">
        <div className="stock-card-icon">
          {stock.symbol.charAt(0)}
        </div>
        <div className="stock-card-info">
          <div className="stock-card-symbol">{stock.symbol}</div>
          <div className="stock-card-name">{stock.name}</div>
        </div>
      </div>
      
      <div className="stock-card-body">
        <div className="stock-card-price-lg">${stock.price.toFixed(2)}</div>
        <div className={`stock-card-change-badge ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
        </div>
      </div>

      <div className="stock-card-footer">
        <div className="stock-card-stat">
          <span className="stat-label">Volume</span>
          <span className="stat-value">{stock.volume}</span>
        </div>
        <div className="stock-card-stat">
          <span className="stat-label">Mkt Cap</span>
          <span className="stat-value">{stock.marketCap}</span>
        </div>
      </div>
    </Link>
  );
});

export default StockCard;
