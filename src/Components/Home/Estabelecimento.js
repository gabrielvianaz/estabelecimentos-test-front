import React from 'react';
import styles from '../../Assets/Styles/Estabelecimento.module.css';
import img from '../../Assets/Images/img.png';

const Estabelecimento = () => {
  return (
    <div className={styles.estabelecimento}>
      <div className={styles.editar}></div>
      <div className={styles.content}>
        <img src={img} alt="Imagem" />
        <div className={styles.dados}>
          <h3>Nome do estabelecimento</h3>
          <p>Rua Seis, 15, Vila Serrana 2</p>
          <p>Vitória da Conquista, BA</p>
        </div>
      </div>
      <div className={styles.excluir}></div>
    </div>
  );
};

export default Estabelecimento;
