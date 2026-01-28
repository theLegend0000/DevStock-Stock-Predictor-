# DevStock Frontend

A professional, production-ready React frontend for stock prediction and market analysis.

## Features

- **Stock Prediction Dashboard**: View AI-powered stock price predictions with interactive charts
- **Market Overview**: Real-time market indices and top movers
- **News Feed**: Curated stock market news with category filtering
- **Responsive Design**: Optimized for desktop and mobile viewing
- **Performance Optimized**: Memoized components and efficient rendering

## Tech Stack

- **React 18** - UI library with concurrent features
- **React Router 6** - Client-side routing
- **Recharts** - Responsive charting library
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool and dev server

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── charts/       # Chart components
│   │   ├── layout/       # Layout components (Header, Sidebar)
│   │   ├── news/         # News-related components
│   │   └── stocks/       # Stock-related components
│   ├── data/             # Mock data for development
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API service layer
│   ├── styles/           # Global styles and CSS
│   └── utils/            # Utility functions
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd DevStock/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Build output will be in the `dist` directory.

## Architecture Decisions

### Component Structure
- **Atomic Design**: Components are organized by domain (stocks, news, charts)
- **Memoization**: `React.memo` used on list items to prevent unnecessary re-renders
- **CSS Organization**: Component-scoped CSS files alongside components

### State Management
- React's built-in state and context for simplicity
- Ready for integration with state libraries if needed

### API Layer
- Centralized API service with consistent error handling
- Mock data included for development without backend

## Performance Considerations

- Memoized list components with `React.memo`
- Lazy loading ready for route-based code splitting
- Optimized Recharts configuration for smooth chart interactions
- CSS custom properties for theme consistency

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.
