import React from 'react'
import { Link } from 'react-router-dom';
import "./Auth.css"

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div id='register'>
      <h2>ReactGram</h2>
      <p className='subtitlel'>Cadastre-se para ver as fotos dos seus amigos.</p>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome"></input>
        <input type="email" placeholder="Email"></input>
        <input type="password" placeholder="Senha"></input>
        <input type="password" placeholder="Confirme a senha"></input>
        <input type="submit" value="Cadastrar"></input>
      </form>

      <p>
        Já tem conta? <Link to={"/login"}>Clique aqui.</Link>
      </p>
    </div>
  )
}

export default Register;