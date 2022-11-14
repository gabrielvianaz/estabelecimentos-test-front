import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../Assets/Styles/Estabelecimentos.module.css';
import Estabelecimento from './Estabelecimento.js';
import Spinner from '../Spinner';

const Estabelecimentos = () => {
  const navigate = useNavigate();
  const [estabelecimentos, setEstabelecimentos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [reload, setReload] = React.useState(false);

  function novoEstabelecimento() {
    navigate('/novo');
  }

  React.useEffect(() => {
    setLoading(true);
    axios
      .get('https://estabelecimentos-back.herokuapp.com/estabelecimentos', {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setEstabelecimentos(data);
      });
  }, [reload]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className="tituloVerde">Meus estabelecimentos</h1>
        <button onClick={novoEstabelecimento}>Novo</button>
      </div>
      <div className={styles.estabelecimentos}>
        {!loading &&
          estabelecimentos.map((estabelecimento) => (
            <Estabelecimento
              key={estabelecimento.id}
              dados={estabelecimento}
              reload={reload}
              setReload={setReload}
            />
          ))}
        {!loading && !estabelecimentos.length && (
          <div className={styles.naoCadastrou}>
            <h2>
              Você ainda não cadastrou nenhum estabelecimento. Clique em "Novo"
              para fazer o seu primeiro cadastro!
            </h2>
          </div>
        )}
        {loading && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
};

export default Estabelecimentos;
