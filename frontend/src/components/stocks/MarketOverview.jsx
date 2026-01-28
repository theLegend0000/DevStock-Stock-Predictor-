import { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StockCard.css';

/**
 * MarketOverview Component
 * Displays market index information (S&P 500, NASDAQ, etc.)
 * Memoized for performance optimization.
 * 
 * @param {Object} index - Market index data
 * @param {number} delay - Animation delay in seconds
 */
const MarketOverview = memo(function MarketOverview({ index, delay = 0 }) {
  const isPositive = index.changePercent >= 0;

  return (
    <div 
      className="market-overview-card card-animate" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="market-overview-header">
        <div>
          <div className="market-overview-name">{index.name}</div>
          <div className="market-overview-symbol">{index.symbol}</div>
        </div>
      </div>
      
      <div className="market-overview-value">
        {index.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </div>
      
      <div className={`market-overview-change ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span>
          {isPositive ? '+' : ''}{index.change.toFixed(2)} ({isPositive ? '+' : ''}{index.changePercent.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
});

export default MarketOverview;
