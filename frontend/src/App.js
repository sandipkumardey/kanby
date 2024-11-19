import React from 'react';
import { ThemeProvider } from 'next-themes';
import Layout from './components/Layout';
import './styles/globals.css';

export default function App({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}