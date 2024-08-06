import './App.css';

import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartProvider';
import Admin from './pages/Admin';




function App() {
  return (
    <div className="App">
      <div className="title-banner">
        <h1 className='site-title'>Sahara Stationery</h1>
      </div>
      <BrowserRouter>
        <Navbar />
        <CartProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
        </CartProvider>
      </BrowserRouter>   
    </div>
  );
}

export default App;
