import React from 'react';
import styles from '../../Assets/Styles/Estabelecimentos.module.css';
import Estabelecimento from './Estabelecimento.js';

const Estabelecimentos = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className="tituloVerde">Estabelecimentos</h1>
        <button>Novo</button>
      </div>
      <div className={styles.estabelecimentos}>
        <Estabelecimento />
        <Estabelecimento />
        <Estabelecimento />
        <Estabelecimento />
      </div>
    </section>
  );
};

export default Estabelecimentos;
