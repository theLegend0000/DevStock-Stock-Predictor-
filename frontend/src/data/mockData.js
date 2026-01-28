/**
 * Mock Data for DevStock
 * This file contains realistic mock data for development and demonstration.
 * In production, this would be replaced with API calls to backend services.
 */

// Mock Stock Data
export const mockStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 185.92,
    change: 3.45,
    changePercent: 1.89,
    volume: '52.3M',
    marketCap: '2.89T',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 141.80,
    change: 2.15,
    changePercent: 1.54,
    volume: '24.1M',
    marketCap: '1.78T',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.91,
    change: 5.23,
    changePercent: 1.40,
    volume: '18.7M',
    marketCap: '2.81T',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.25,
    change: 4.12,
    changePercent: 2.37,
    volume: '45.2M',
    marketCap: '1.86T',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 721.28,
    change: 18.45,
    changePercent: 2.62,
    volume: '38.9M',
    marketCap: '1.78T',
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 484.03,
    change: -8.21,
    changePercent: -1.67,
    volume: '15.3M',
    marketCap: '1.23T',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.50,
    change: -12.35,
    changePercent: -4.74,
    volume: '89.4M',
    marketCap: '790.2B',
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 183.27,
    change: -2.14,
    changePercent: -1.15,
    volume: '8.2M',
    marketCap: '528.4B',
  },
];

// Mock Market Indices
export const mockMarketIndices = [
  {
    symbol: 'SPX',
    name: 'S&P 500',
    value: 4927.93,
    change: 25.61,
    changePercent: 0.52,
  },
  {
    symbol: 'DJI',
    name: 'Dow Jones',
    value: 38503.69,
    change: 134.21,
    changePercent: 0.35,
  },
  {
    symbol: 'IXIC',
    name: 'NASDAQ',
    value: 15609.00,
    change: 78.81,
    changePercent: 0.51,
  },
  {
    symbol: 'VIX',
    name: 'Volatility Index',
    value: 13.26,
    change: -0.45,
    changePercent: -3.28,
  },
];

// Mock AI Predictions
export const mockPredictions = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 185.92,
    targetPrice: 198.50,
    expectedChange: 6.77,
    direction: 'bullish',
    confidence: 87,
    timeframe: '7 days',
    analysis: 'Strong technical indicators suggest continued momentum. RSI showing bullish divergence with MACD crossover imminent. Volume patterns indicate accumulation phase.',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    currentPrice: 721.28,
    targetPrice: 785.00,
    expectedChange: 8.84,
    direction: 'bullish',
    confidence: 92,
    timeframe: '7 days',
    analysis: 'AI sector momentum continues. Strong earnings forecast and data center demand driving price action. Support levels holding strong.',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    currentPrice: 248.50,
    targetPrice: 228.00,
    expectedChange: -8.25,
    direction: 'bearish',
    confidence: 74,
    timeframe: '7 days',
    analysis: 'Increased competition in EV market and production concerns. Breaking below key support levels. Short-term bearish outlook.',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 378.91,
    targetPrice: 395.00,
    expectedChange: 4.25,
    direction: 'bullish',
    confidence: 85,
    timeframe: '7 days',
    analysis: 'Cloud revenue growth exceeding expectations. AI integration driving enterprise adoption. Strong buy signals on weekly chart.',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    currentPrice: 178.25,
    targetPrice: 192.00,
    expectedChange: 7.71,
    direction: 'bullish',
    confidence: 81,
    timeframe: '7 days',
    analysis: 'AWS growth acceleration and retail margin improvements. Technical breakout above resistance. Positive market sentiment.',
  },
];

// Mock News Data
export const mockNews = [
  {
    id: 1,
    title: 'Federal Reserve Signals Potential Rate Cuts in Coming Months',
    excerpt: 'The Federal Reserve indicated a shift in monetary policy, suggesting that interest rate cuts could be on the horizon as inflation shows signs of cooling. Markets responded positively to the dovish stance.',
    source: 'Financial Times',
    category: 'economy',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: null,
  },
  {
    id: 2,
    title: 'NVIDIA Surpasses Microsoft in Market Cap Following AI Chip Demand Surge',
    excerpt: 'NVIDIA briefly became the world\'s most valuable company as demand for AI chips continues to exceed expectations. The semiconductor giant reported record-breaking quarterly revenues.',
    source: 'Bloomberg',
    category: 'stocks',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: null,
  },
  {
    id: 3,
    title: 'Bitcoin Approaches All-Time High Amid Institutional Adoption',
    excerpt: 'Bitcoin surged past $68,000 as major financial institutions announce plans to offer cryptocurrency services to clients. ETF inflows continue to break records.',
    source: 'CoinDesk',
    category: 'crypto',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: null,
  },
  {
    id: 4,
    title: 'Apple Unveils Revolutionary AI Features for iPhone 16 Pro',
    excerpt: 'Apple announced groundbreaking AI capabilities for its upcoming iPhone release, including advanced on-device machine learning and enhanced Siri functionality.',
    source: 'TechCrunch',
    category: 'stocks',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: null,
  },
  {
    id: 5,
    title: 'Global Markets Rally on Strong Economic Data',
    excerpt: 'Stock markets worldwide experienced significant gains following the release of better-than-expected employment figures and manufacturing data from major economies.',
    source: 'Reuters',
    category: 'economy',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: null,
  },
  {
    id: 6,
    title: 'Ethereum Upgrade Promises 10x Faster Transactions',
    excerpt: 'The Ethereum network completed its latest upgrade, dramatically improving transaction speeds and reducing gas fees. Developers hail it as a major milestone.',
    source: 'Decrypt',
    category: 'crypto',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: null,
  },
  {
    id: 7,
    title: 'Tesla Announces Record Deliveries Despite Market Challenges',
    excerpt: 'Tesla reported its highest-ever quarterly deliveries, exceeding analyst expectations despite increased competition in the electric vehicle market.',
    source: 'Wall Street Journal',
    category: 'stocks',
    publishedAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: null,
  },
  {
    id: 8,
    title: 'Oil Prices Surge on Middle East Tensions',
    excerpt: 'Crude oil prices jumped over 5% following escalating geopolitical tensions in the Middle East, raising concerns about global supply disruptions.',
    source: 'CNBC',
    category: 'economy',
    publishedAt: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: null,
  },
  {
    id: 9,
    title: 'Amazon Web Services Launches New AI Development Platform',
    excerpt: 'AWS unveiled a comprehensive AI development platform aimed at enterprise customers, featuring pre-built models and simplified deployment tools.',
    source: 'VentureBeat',
    category: 'stocks',
    publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: null,
  },
  {
    id: 10,
    title: 'Solana Network Experiences Major Growth in DeFi Activity',
    excerpt: 'The Solana blockchain has seen a 300% increase in decentralized finance activity, with total value locked reaching new highs.',
    source: 'The Block',
    category: 'crypto',
    publishedAt: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    url: '#',
    imageUrl: null,
  },
];

/**
 * Generate mock chart data for stock visualization
 * @param {string} symbol - Stock ticker symbol
 * @returns {Array} Array of price data points
 */
export function generateChartData(symbol) {
  const stock = mockStocks.find(s => s.symbol === symbol) || mockStocks[0];
  const basePrice = stock.price;
  const data = [];
  const now = new Date();
  
  // Generate 30 days of historical data
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some realistic price variation
    const volatility = 0.02;
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const trendFactor = (30 - i) / 30 * (stock.changePercent / 100);
    const price = basePrice * (0.95 + Math.random() * 0.05) * (1 + trendFactor + randomChange);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(2)),
      volume: `${(Math.random() * 50 + 10).toFixed(1)}M`,
      isPrediction: false,
    });
  }
  
  // Add 7 days of predicted data
  const lastPrice = data[data.length - 1].price;
  const prediction = mockPredictions.find(p => p.symbol === symbol);
  const targetPrice = prediction ? prediction.targetPrice : lastPrice * 1.05;
  const priceStep = (targetPrice - lastPrice) / 7;
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    const predictedPrice = lastPrice + priceStep * i + (Math.random() - 0.5) * 2;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: null,
      prediction: parseFloat(predictedPrice.toFixed(2)),
      isPrediction: true,
    });
  }
  
  return data;
}
