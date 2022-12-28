import React from 'react';
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <h3>Escreva sobre o que você tem enteresse</h3>
            <p>Mini Blog &copy; {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer