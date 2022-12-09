import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import "./Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/" className={({isActive}) => (isActive) ? 'esta-ativo': 'nao-ativo'}>Home</NavLink>
            <br />
            <NavLink to="/about" /* className={({isActive}) => (isActive) ? 'esta-ativo': 'nao-ativo'} */>Sobre</NavLink>
        </nav>
    )
}

export default Navbar