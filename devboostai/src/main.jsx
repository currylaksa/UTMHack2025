import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // <-- Import BrowserRouter

// Global error handler for uncaught errors
window.onerror = (message, source, lineno, colno, error) => {
  // Prevent the "message port closed" error from showing to users
  if (message.includes('message port closed')) {
    console.warn('Message port closed:', { message, source, lineno, colno });
    return true; // Prevents the error from bubbling up
  }
  return false; // Let other errors propagate normally
};

// Handle unhandled promise rejections
window.onunhandledrejection = (event) => {
  if (event.reason?.message?.includes('message port closed')) {
    console.warn('Unhandled message port closure:', event.reason);
    event.preventDefault(); // Prevents the error from showing in console
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

