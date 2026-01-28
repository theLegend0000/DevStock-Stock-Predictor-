import { memo } from 'react';
import { Clock, ExternalLink, TrendingUp, DollarSign, Zap, Globe } from 'lucide-react';
import './NewsCard.css';

/**
 * NewsCard Component
 * Displays a news article in card format.
 * Supports compact mode for sidebar display.
 * 
 * @param {Object} article - News article data
 * @param {boolean} compact - Whether to render compact version
 */
const NewsCard = memo(function NewsCard({ article, compact = false }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'stocks': return TrendingUp;
      case 'crypto': return DollarSign;
      case 'economy': return Zap;
      default: return Globe;
    }
  };

  const CategoryIcon = getCategoryIcon(article.category);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (compact) {
    return (
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="news-card-compact"
      >
        <div className="news-card-compact-content">
          <div className="news-card-meta-compact">
            <span className="news-category-badge">
              <CategoryIcon size={12} />
              {article.category}
            </span>
            <span className="news-time">
              <Clock size={12} />
              {formatDate(article.publishedAt)}
            </span>
          </div>
          <h3 className="news-card-title-compact">{article.title}</h3>
          <span className="news-source-compact">{article.source}</span>
        </div>
      </a>
    );
  }

  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="news-card"
    >
      <div className="news-card-image">
        {article.imageUrl ? (
          <img src={article.imageUrl} alt={article.title} loading="lazy" />
        ) : (
          <div className="news-card-image-placeholder">
            <CategoryIcon size={32} />
          </div>
        )}
      </div>
      
      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-category-badge">
            <CategoryIcon size={12} />
            {article.category}
          </span>
          <span className="news-time">
            <Clock size={12} />
            {formatDate(article.publishedAt)}
          </span>
        </div>
        
        <h3 className="news-card-title">{article.title}</h3>
        <p className="news-card-excerpt">{article.excerpt}</p>
        
        <div className="news-card-footer">
          <span className="news-source">{article.source}</span>
          <span className="news-read-more">
            Read More <ExternalLink size={14} />
          </span>
        </div>
      </div>
    </a>
  );
});

export default NewsCard;
