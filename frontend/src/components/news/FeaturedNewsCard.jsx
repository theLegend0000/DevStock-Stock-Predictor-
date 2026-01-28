import { memo } from 'react';
import { Clock, ExternalLink, TrendingUp, DollarSign, Zap, Globe, Bookmark } from 'lucide-react';
import './NewsCard.css';

/**
 * FeaturedNewsCard Component
 * Displays a featured/hero news article with larger layout.
 * 
 * @param {Object} article - News article data
 */
const FeaturedNewsCard = memo(function FeaturedNewsCard({ article }) {
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
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="featured-article"
    >
      <div className="featured-article-image">
        {article.imageUrl ? (
          <img src={article.imageUrl} alt={article.title} loading="lazy" />
        ) : (
          <CategoryIcon size={64} />
        )}
      </div>
      
      <div className="featured-article-content">
        <div className="featured-article-meta">
          <span className="featured-article-category">
            <CategoryIcon size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {article.category}
          </span>
          <span className="featured-article-date">
            <Clock size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {formatDate(article.publishedAt)}
          </span>
        </div>
        
        <h2 className="featured-article-title">{article.title}</h2>
        <p className="featured-article-excerpt">{article.excerpt}</p>
        
        <div className="featured-article-footer">
          <div className="featured-article-source">
            <span className="source-label">Source:</span>
            <span className="source-name">{article.source}</span>
          </div>
          <div className="featured-article-actions">
            <button 
              className="action-btn" 
              onClick={(e) => e.preventDefault()}
              aria-label="Bookmark article"
            >
              <Bookmark size={18} />
            </button>
            <span className="read-article">
              Read Article <ExternalLink size={14} />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
});

export default FeaturedNewsCard;
