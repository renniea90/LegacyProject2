import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import Admin from './pages/Admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartProvider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
