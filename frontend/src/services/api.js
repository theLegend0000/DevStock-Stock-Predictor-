// /**
//  * API Service
//  * Handles all API communications with the Django backend.
//  * Connected to Django REST API at localhost:8000
//  */

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// console.log("API_BASE_URL at runtime:", API_BASE_URL);



// /**
//  * Generic fetch wrapper with error handling
//  * @param {string} endpoint - API endpoint
//  * @param {Object} options - Fetch options
//  * @returns {Promise} Response data
//  */
// async function fetchApi(endpoint, options = {}) {
//   const url = `${API_BASE_URL}${endpoint}`;
  
//   const defaultOptions = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const mergedOptions = {
//     ...defaultOptions,
//     ...options,
//     headers: {
//       ...defaultOptions.headers,
//       ...options.headers,
//     },
//   };

//   try {
//     const response = await fetch(url, mergedOptions);
    
//     if (!response.ok) {
//       const error = await response.json().catch(() => ({}));
//       throw new Error(error.message || `HTTP error! status: ${response.status}`);
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error(`API Error (${endpoint}):`, error);
//     throw error;
//   }
// }

// /**
//  * Stock API methods
//  */
// export const stockApi = {
//   /**
//    * Get all stocks
//    * @returns {Promise<Array>} List of stocks
//    */
//   getAll: () => fetchApi('/stocks'),

//   /**
//    * Get stock by symbol
//    * @param {string} symbol - Stock ticker symbol
//    * @returns {Promise<Object>} Stock data
//    */
//   getBySymbol: (symbol) => fetchApi(`/stocks/${symbol}`),

//   /**
//    * Get stock price history
//    * @param {string} symbol - Stock ticker symbol
//    * @param {string} range - Time range (1d, 1w, 1m, 3m, 1y)
//    * @returns {Promise<Array>} Price history data
//    */
//   getHistory: (symbol, range = '1m') => fetchApi(`/stocks/${symbol}/history?range=${range}`),

//   /**
//    * Search stocks
//    * @param {string} query - Search query
//    * @returns {Promise<Array>} Matching stocks
//    */
//   search: (query) => fetchApi(`/stocks/search?q=${encodeURIComponent(query)}`),
// };

// /**
//  * Prediction API methods
//  */
// export const predictionApi = {
//   /**
//    * Get all predictions
//    * @returns {Promise<Array>} List of predictions
//    */
//   getAll: () => fetchApi('/predictions'),

//   /**
//    * Get prediction for specific stock
//    * @param {string} symbol - Stock ticker symbol
//    * @returns {Promise<Object>} Prediction data
//    */
//   getBySymbol: (symbol) => fetchApi(`/predictions/${symbol}`),

//   /**
//    * Get top predictions
//    * @param {number} limit - Number of predictions to fetch
//    * @returns {Promise<Array>} Top predictions
//    */
//   getTop: (limit = 5) => fetchApi(`/predictions/top?limit=${limit}`),
// };

// /**
//  * News API methods
//  */
// export const newsApi = {
//   /**
//    * Get all news articles
//    * @param {Object} params - Query parameters
//    * @returns {Promise<Array>} List of articles
//    */
//   getAll: (params = {}) => {
//     const query = new URLSearchParams(params).toString();
//     return fetchApi(`/news${query ? `?${query}` : ''}`);
//   },

//   /**
//    * Get news by category
//    * @param {string} category - News category
//    * @returns {Promise<Array>} Filtered articles
//    */
//   getByCategory: (category) => fetchApi(`/news?category=${category}`),

//   /**
//    * Get article by ID
//    * @param {string} id - Article ID
//    * @returns {Promise<Object>} Article data
//    */
//   getById: (id) => fetchApi(`/news/${id}`),
// };

// /**
//  * Market API methods
//  */
// export const marketApi = {
//   /**
//    * Get market indices
//    * @returns {Promise<Array>} Market index data
//    */
//   getIndices: () => fetchApi('/market/indices'),

//   /**
//    * Get market status
//    * @returns {Promise<Object>} Market status
//    */
//   getStatus: () => fetchApi('/market/status'),

//   /**
//    * Get top movers
//    * @param {string} type - 'gainers' or 'losers'
//    * @param {number} limit - Number of stocks to fetch
//    * @returns {Promise<Array>} Top moving stocks
//    */
//   getTopMovers: (type = 'gainers', limit = 5) => 
//     fetchApi(`/market/movers?type=${type}&limit=${limit}`),
// };

/**
 * API Service
 * Handles all API communications with the Django backend.
 * Connected to Django REST API at localhost:8000
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL at runtime:", API_BASE_URL);

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} Response data
 */
async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Stock API methods
 */
export const stockApi = {
  getAll: () => fetchApi('/stocks/'),
  getBySymbol: (symbol) => fetchApi(`/stocks/${symbol}/`),
  getHistory: (symbol, range = '1m') => fetchApi(`/stocks/${symbol}/history/?range=${range}`),
  search: (query) => fetchApi(`/stocks/search/?q=${encodeURIComponent(query)}`),
};

/**
 * Prediction API methods
 */
export const predictionApi = {
  getAll: () => fetchApi('/predictions/'),
  getBySymbol: (symbol) => fetchApi(`/predictions/${symbol}/`),
  getTop: (limit = 5) => fetchApi(`/predictions/top/?limit=${limit}`),
};

/**
 * News API methods
 */
export const newsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/news/${query ? `?${query}` : ''}`);
  },
  getByCategory: (category) => fetchApi(`/news/?category=${category}`),
  getById: (id) => fetchApi(`/news/${id}/`),
};

/**
 * Market API methods
 */
export const marketApi = {
  getIndices: () => fetchApi('/market/indices/'),
  getStatus: () => fetchApi('/market/status/'),
  getTopMovers: (type = 'gainers', limit = 5) => 
    fetchApi(`/market/movers/?type=${type}&limit=${limit}`),
};
