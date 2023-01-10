import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import styles from "./Home.module.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={styles.searchForm}>
        <input type="text" placeholder='Ou busque por tags...' onChange={(e) => setQuery(e.target.value)} />
        <button className='btn btn-dark'>Pesquisar</button>
      </form>

      <div className="posts">
        <h1>Posts...</h1>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link className='btn' to={"/posts/create"}>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;