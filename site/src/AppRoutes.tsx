import { Routes, Route } from 'react-router-dom';
import App from './App';
import BlogPage from './pages/BlogPage';
import IngredientPage from './pages/IngredientPage';

/** Tüm uygulama rotaları — BrowserRouter (istemci) veya StaticRouter (SSR) ile sarılır. */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<IngredientPage />} />
    </Routes>
  );
}
