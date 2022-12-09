import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import Product from './pages/Product';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <h1>React Router</h1>
      <BrowserRouter>
        <Navbar />

        {/* Search */}
        <SearchForm />

        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/about" element={< About />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/search" element={Search} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
