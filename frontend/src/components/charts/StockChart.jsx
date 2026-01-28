import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { generateChartData } from '../../data/mockData';
import './StockChart.css';

/**
 * StockChart Component
 * Renders an interactive area chart for stock price visualization.
 * Uses Recharts for performant, responsive charting.
 * 
 * @param {string} symbol - Stock ticker symbol
 * @param {boolean} showPrediction - Whether to show prediction overlay
 */
function StockChart({ symbol, showPrediction = false }) {
  // Generate mock chart data - memoized to prevent regeneration
  const chartData = useMemo(() => generateChartData(symbol), [symbol]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    const isPrediction = data.isPrediction;

    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-date">{label}</p>
        <p className="chart-tooltip-price">
          ${payload[0].value.toFixed(2)}
          {isPrediction && <span className="chart-tooltip-prediction"> (Predicted)</span>}
        </p>
        {data.volume && (
          <p className="chart-tooltip-volume">Vol: {data.volume}</p>
        )}
      </div>
    );
  };

  // Find the transition point between actual and predicted data
  const predictionStartIndex = chartData.findIndex(d => d.isPrediction);
  const predictionStartDate = predictionStartIndex > 0 
    ? chartData[predictionStartIndex].date 
    : null;

  return (
    <div className="stock-chart">
      <div className="chart-header">
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color legend-actual"></span>
            <span>Actual Price</span>
          </div>
          {showPrediction && (
            <div className="legend-item">
              <span className="legend-color legend-prediction"></span>
              <span>AI Prediction</span>
            </div>
          )}
        </div>
        <div className="chart-timeframes">
          <button className="timeframe-btn">1D</button>
          <button className="timeframe-btn">1W</button>
          <button className="timeframe-btn active">1M</button>
          <button className="timeframe-btn">3M</button>
          <button className="timeframe-btn">1Y</button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#334155" 
            vertical={false}
          />
          
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            dy={10}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
            domain={['auto', 'auto']}
            dx={-10}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          {showPrediction && predictionStartDate && (
            <ReferenceLine 
              x={predictionStartDate} 
              stroke="#8b5cf6" 
              strokeDasharray="5 5"
              label={{ 
                value: 'Prediction Start', 
                fill: '#8b5cf6', 
                fontSize: 11,
                position: 'top'
              }}
            />
          )}
          
          <Area
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
          
          {showPrediction && (
            <Area
              type="monotone"
              dataKey="prediction"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorPrediction)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;
