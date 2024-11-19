import React from 'react';

export const Card = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-300 dark:border-gray-700">
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="text-gray-700 dark:text-gray-300">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return (
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </h2>
  );
};
