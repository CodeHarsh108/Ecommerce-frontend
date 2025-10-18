import './App.css'
import Products from './components/products/Products'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/shared/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import { Toaster } from 'react-hot-toast';
import Cart from './components/cart/Cart';
import Login from './components/auth/Login';
import PrivateRoutes from './components/PrivateRoutes';
import Register from './components/auth/Register';
import Checkout from './components/checkout/Checkout';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/dashboard/Dashboard';
import AdminProducts from './components/admin/products/AdminProducts';
import Sellers from './components/admin/sellers/Sellers';
import Category from './components/admin/categories/Category';
import Orders from './components/admin/orders/Orders';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/cart' element={<Cart/>} />

          <Route element={<PrivateRoutes />}>
            <Route path='/checkout' element={<Checkout />}/>
          </Route>

          <Route element={<PrivateRoutes publicPage />}>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register />} />
          </Route>

          {/* Admin Routes - Fixed Structure */}
          <Route element={<PrivateRoutes adminOnly />}>
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='sellers' element={<Sellers />} />
              <Route path='categories' element={<Category />} />
              <Route path='orders' element={<Orders/>} /> {/* Add this */}
            </Route>
          </Route>

        </Routes>
      </Router>
      <Toaster position='bottom-center' />
    </React.Fragment>
  )
}

export default App;