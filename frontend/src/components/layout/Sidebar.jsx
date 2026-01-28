import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  TrendingUp, 
  BarChart3,
  Settings,
  HelpCircle,
  Home
} from 'lucide-react';

/**
 * Sidebar Component
 * Provides main navigation for the application.
 * Uses NavLink for active state management.
 */
function Sidebar() {
  const location = useLocation();

  const mainNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/news', label: 'Market News', icon: Newspaper },
  ];

  const analysisNavItems = [
    { path: '/predictions', label: 'Predictions', icon: TrendingUp },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/" className="sidebar-logo-link">
          <div className="sidebar-logo">
            <TrendingUp />
          </div>
          <div className="sidebar-brand">
            Dev<span>Stock</span>
          </div>
        </NavLink>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Main Menu</div>
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <item.icon />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="sidebar-section-title">Analysis</div>
        {analysisNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <item.icon />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div
          className="sidebar-nav-item"
          style={{ opacity: 0.5, cursor: 'not-allowed' }}
          title="Coming soon"
        >
          <Settings size={20} />
          <span>Settings</span>
        </div>
        <div
          className="sidebar-nav-item"
          style={{ opacity: 0.5, cursor: 'not-allowed' }}
          title="Coming soon"
        >
          <HelpCircle size={20} />
          <span>Help Center</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
