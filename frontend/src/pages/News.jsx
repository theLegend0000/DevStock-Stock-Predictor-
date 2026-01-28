import { useState, useMemo } from 'react';
import { Newspaper, TrendingUp, DollarSign, Globe, Zap } from 'lucide-react';
import NewsCard from '../components/news/NewsCard';
import FeaturedNewsCard from '../components/news/FeaturedNewsCard';
import { mockNews } from '../data/mockData';
import './Dashboard.css';

/**
 * News Page
 * Displays stock market news with filtering capabilities.
 * Features a hero article section and category-based filtering.
 */
function News() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All News', icon: Globe },
    { id: 'stocks', label: 'Stocks', icon: TrendingUp },
    { id: 'crypto', label: 'Crypto', icon: DollarSign },
    { id: 'economy', label: 'Economy', icon: Zap },
  ];

  // Filter news based on selected category
  const filteredNews = useMemo(() => {
    if (activeFilter === 'all') return mockNews;
    return mockNews.filter(article => article.category === activeFilter);
  }, [activeFilter]);

  const featuredArticle = filteredNews[0];
  const sideArticles = filteredNews.slice(1, 4);
  const remainingArticles = filteredNews.slice(4);

  return (
    <div className="news-page">
      {/* Page Header */}
      <div className="news-header">
        <div>
          <h1 className="news-title">Market News</h1>
          <p className="news-subtitle">
            Stay informed with the latest stock market updates and financial news
          </p>
        </div>

        <div className="news-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`news-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <filter.icon size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured News Section */}
      {featuredArticle && (
        <section className="featured-news">
          <FeaturedNewsCard article={featuredArticle} />
          <div className="side-articles">
            {sideArticles.map((article) => (
              <NewsCard key={article.id} article={article} compact />
            ))}
          </div>
        </section>
      )}

      {/* News Grid */}
      {remainingArticles.length > 0 && (
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              <Newspaper size={20} />
              Latest Articles
            </h2>
          </div>
          <div className="news-grid">
            {remainingArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <div className="empty-state">
          <Newspaper size={48} />
          <h3>No articles found</h3>
          <p>Try selecting a different category</p>
        </div>
      )}
    </div>
  );
}

export default News;
