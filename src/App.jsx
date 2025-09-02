import './App.css'
import Products from './components/products/Products'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/products' element={ <Products/> } />
      </Routes>
    </Router>
  )
}

export default App;
