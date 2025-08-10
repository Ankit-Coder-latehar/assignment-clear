import { Routes, Route } from 'react-router-dom';
import HomePage from '../src/components/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MensCollection from './components/MensCollection';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import WomensCollection from './components/WomensCollection';
import OrderSummary from './components/OrderSummary';

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/mens" element={<MensCollection />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path='/category/womens' element={<WomensCollection />} />
        <Route path='/order-summary/:id' element={<OrderSummary />} />
      </Routes>
      <Footer/>
    </div>
  );
}

