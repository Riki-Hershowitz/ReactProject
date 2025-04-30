import './App.css';
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './pages/HomePage';
import GlassesOverlay from './components/GlassesOverlay';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import Header from "./components/Header";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/Cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </Provider>
  );
}

export default App;
