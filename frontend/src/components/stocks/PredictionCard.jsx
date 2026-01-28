import { memo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import './StockCard.css';

/**
 * PredictionCard Component
 * Displays AI prediction information for a specific stock.
 * Includes confidence level, direction, and price targets.
 * 
 * @param {Object} prediction - Prediction data
 * @param {boolean} detailed - Whether to show detailed view
 * @param {number} delay - Animation delay in seconds
 */
const PredictionCard = memo(function PredictionCard({ prediction, detailed = false, delay = 0 }) {
  const isBullish = prediction.direction === 'bullish';

  return (
    <Link 
      to={`/stock/${prediction.symbol}`} 
      className="prediction-card card-animate"
      style={{ textDecoration: 'none', animationDelay: `${delay}s` }}
    >
      <div className="prediction-header">
        <div className="prediction-stock">
          <div className="prediction-icon">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="prediction-symbol">{prediction.symbol}</div>
            <div className="prediction-name">{prediction.name}</div>
          </div>
        </div>
        
        <div className="prediction-confidence">
          <span className="confidence-label">Confidence</span>
          <span className="confidence-value">{prediction.confidence}%</span>
        </div>
      </div>

      <div className="prediction-body">
        <div className={`prediction-direction ${isBullish ? 'bullish' : 'bearish'}`}>
          {isBullish ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
          <span>
            {isBullish ? 'Bullish' : 'Bearish'} - Expected {isBullish ? 'Increase' : 'Decrease'}
          </span>
        </div>

        <div className="prediction-targets">
          <div className="prediction-target">
            <span className="target-label">Current Price</span>
            <span className="target-value">${prediction.currentPrice.toFixed(2)}</span>
          </div>
          <div className="prediction-target">
            <span className="target-label">Target Price</span>
            <span className={`target-value ${isBullish ? 'bullish' : 'bearish'}`}>
              ${prediction.targetPrice.toFixed(2)}
            </span>
          </div>
          <div className="prediction-target">
            <span className="target-label">Expected Move</span>
            <span className={`target-value ${isBullish ? 'bullish' : 'bearish'}`}>
              {isBullish ? '+' : ''}{prediction.expectedChange.toFixed(2)}%
            </span>
          </div>
        </div>

        {detailed && (
          <div style={{ 
            marginTop: 'var(--spacing-md)', 
            paddingTop: 'var(--spacing-md)', 
            borderTop: '1px solid var(--color-border)' 
          }}>
            <p style={{ 
              fontSize: 'var(--font-size-sm)', 
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6'
            }}>
              {prediction.analysis || 'Based on technical analysis and market sentiment, our AI model predicts this stock will show significant movement in the coming days.'}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
});

export default PredictionCard;
