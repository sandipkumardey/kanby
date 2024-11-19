import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import Layout from './components/Layout';

function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Welcome to Kanby</h1>
        <p className="text-xl mb-4">
          A lightweight, user-friendly ticketing service for small teams
        </p>
        <div className="flex space-x-4">
          <a
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
          >
            Go to Dashboard
          </a>
          <a
            href="/board"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
          >
            View Kanban Board
          </a>
        </div>
      </div>
    </Layout>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found. Ensure there is a div with id="root" in your index.html.');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  );
}
