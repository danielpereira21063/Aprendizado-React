import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Product from './pages/Product';

function App() {
  return (
    <div className="App">
      <h1>React Router</h1>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={< Home />}></Route>
          <Route path="/about" element={< About />}></Route>
          <Route path="/products/:id" element={<Product />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
