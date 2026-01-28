import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Shield, 
  ArrowRight,
  Play,
  ChevronDown
} from 'lucide-react';
import './Welcome.css';

/**
 * Welcome Page - Animated Landing Experience
 * High-impact entry point designed for competition-grade visual impression
 */
function Welcome() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning models analyze market patterns to predict stock movements with high accuracy.'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Live market data visualization with interactive charts and comprehensive technical indicators.'
    },
    {
      icon: Zap,
      title: 'Instant Insights',
      description: 'Get actionable trading signals and market insights delivered in real-time to your dashboard.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Smart portfolio analysis with risk assessment tools to protect your investments.'
    }
  ];

  const stats = [
    { value: '95%', label: 'Prediction Accuracy' },
    { value: '500+', label: 'Stocks Analyzed' },
    { value: '24/7', label: 'Market Monitoring' },
    { value: '10K+', label: 'Active Traders' }
  ];

  return (
    <div className={`welcome-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated Background */}
      <div className="welcome-bg">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
        <div className="bg-glow bg-glow-1"></div>
        <div className="bg-glow bg-glow-2"></div>
        <div className="bg-glow bg-glow-3"></div>
        
        {/* Floating particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
        
        {/* Animated chart lines */}
        <svg className="bg-chart-lines" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <path className="chart-line chart-line-1" d="M0,400 Q360,300 720,350 T1440,300" />
          <path className="chart-line chart-line-2" d="M0,500 Q360,400 720,450 T1440,380" />
          <path className="chart-line chart-line-3" d="M0,600 Q360,500 720,520 T1440,450" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="welcome-nav">
        <div className="nav-brand">
          <div className="nav-logo">
            <TrendingUp size={24} />
          </div>
          <span className="nav-title">Dev<span>Stock</span></span>
        </div>
        
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#stats" className="nav-link">Stats</a>
          <a href="#about" className="nav-link">About</a>
        </div>
        
        <Link to="/dashboard" className="nav-cta">
          Launch App
          <ArrowRight size={16} />
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} />
            <span>AI-Powered Stock Prediction</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line title-line-1">Stock Market</span>
            <span className="title-line title-line-2 gradient-text">Prediction</span>
          </h1>
          
          <p className="hero-subtitle">
            Welcome to the future of investing. Harness the power of artificial intelligence 
            to predict market movements and make smarter trading decisions.
          </p>
          
          <div className="hero-actions">
            <Link to="/dashboard" className="btn-primary">
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
            <button className="btn-secondary">
              <Play size={18} />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Floating Stats */}
          <div className="hero-floating-stats">
            <div className="floating-stat floating-stat-1">
              <div className="stat-icon positive">
                <TrendingUp size={16} />
              </div>
              <div className="stat-info">
                <span className="stat-value">+24.5%</span>
                <span className="stat-label">AAPL</span>
              </div>
            </div>
            <div className="floating-stat floating-stat-2">
              <div className="stat-icon positive">
                <TrendingUp size={16} />
              </div>
              <div className="stat-info">
                <span className="stat-value">+18.2%</span>
                <span className="stat-label">NVDA</span>
              </div>
            </div>
            <div className="floating-stat floating-stat-3">
              <div className="stat-icon positive">
                <TrendingUp size={16} />
              </div>
              <div className="stat-info">
                <span className="stat-value">+31.8%</span>
                <span className="stat-label">MSFT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="stat-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">
            Everything you need to predict, analyze, and profit from the stock market
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`feature-card ${activeFeature === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveFeature(index)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="feature-icon">
                <feature.icon size={28} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Predicting?</h2>
          <p className="cta-subtitle">
            Join thousands of traders using AI to make smarter investment decisions
          </p>
          <Link to="/dashboard" className="btn-primary btn-large">
            <span>Launch Dashboard</span>
            <ArrowRight size={20} />
          </Link>
        </div>
        <div className="cta-glow"></div>
      </section>

      {/* Footer */}
      <footer className="welcome-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <TrendingUp size={20} />
            <span>DevStock</span>
          </div>
          <p className="footer-text">
            © 2026 DevStock. Built for the future of trading.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;
