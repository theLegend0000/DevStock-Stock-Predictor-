import { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';

/**
 * Header Component
 * Provides search functionality, notifications, and user profile access.
 * Responsive design with mobile menu support.
 */
function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Search functionality would integrate with stock lookup
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="mobile-menu-btn" aria-label="Toggle menu">
          <Menu size={20} />
        </button>

        <form className="header-search" onSubmit={handleSearch}>
          <Search size={18} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search stocks, news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
          />
        </form>
      </div>

      <div className="header-right">
        <button className="header-icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="header-notification-badge" aria-hidden="true"></span>
        </button>

        <div className="header-profile">
          <div className="header-avatar">JD</div>
          <div className="header-user-info">
            <div className="header-user-name">John Doe</div>
            <div className="header-user-role">Investor</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
