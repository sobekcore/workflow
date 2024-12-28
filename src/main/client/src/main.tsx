import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/styles.css';
import Application from '@/Application.tsx';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Application />
    </React.StrictMode>,
  );
}
