import './App.css';

import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartProvider';




function App() {
  return (
    <div className="App">
      <div className="title-banner">
        <h1 className='site-title'>seed theory</h1>
      </div>
      <BrowserRouter>
        <Navbar />
        <CartProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
        </CartProvider>
      </BrowserRouter>   
    </div>
  );
}

export default App;
