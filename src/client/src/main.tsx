import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/styles/styles.css';
import Application from '@/Application.tsx';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  const queryClient: QueryClient = new QueryClient();

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Application />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
