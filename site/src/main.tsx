import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// Sadece Türkçe için gereken alt kümeler (latin + latin-ext: İ Ş Ğ Ç Ö Ü)
import '@fontsource/antonio/latin-700.css';
import '@fontsource/antonio/latin-ext-700.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-ext-500.css';
import './index.css';
import App from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Build'de HTML önceden render edilir (prerender.mjs) → hydrate; dev'de boş → create
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
