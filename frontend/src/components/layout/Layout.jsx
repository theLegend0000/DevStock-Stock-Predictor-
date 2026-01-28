import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

/**
 * Layout Component
 * Main layout wrapper that provides consistent structure across all pages.
 * Uses a sidebar + main content area pattern common in financial dashboards.
 */
function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Header />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
