import React from 'react'
import { Link } from 'react-router-dom';

import useFetch from "../hooks/useFetch"

import "./Home.css"


const Home = () => {
  const url = "http://localhost:3001/products";

  const { data: items, loading, error } = useFetch(url);

  return (
    <div>
      <h1>Produtos</h1>
      {error && <p>{error}</p>}
      <ul className="products">
        {items &&
          items.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>R$: {product.price}</p>
              {/* 4  - rota dinamica */}
              <Link to={`/products/${product.id}`}>Detalhes</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Home