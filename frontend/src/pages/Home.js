import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to Kanby</h1>
      <p className="text-xl mb-4">
        A lightweight, user-friendly ticketing service for small teams
      </p>
      <div className="flex space-x-4">
        <Link
          to="/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/board"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
        >
          View Kanban Board
        </Link>
      </div>
    </div>
  );
}