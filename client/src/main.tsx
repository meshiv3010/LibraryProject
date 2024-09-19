// src/main.tsx or src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your global styles
import App from './App'; // Main App component

// Create a root element to render the React app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
