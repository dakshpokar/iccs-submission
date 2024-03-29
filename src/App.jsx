import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import PageLayout from './pages/PageLayout';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

function App() {
  return (
    <ShoppingCartProvider>      
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index  element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
      </ShoppingCartProvider>
  );
}

export default App;
