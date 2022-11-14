import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../Assets/Styles/Ativar.module.css';
import Spinner from '../Components/Spinner';

const Ativar = () => {
  const [mensagem, setMensagem] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const effectRan = React.useRef(false);

  React.useEffect(() => {
    if (effectRan.current === false) {
      setLoading(true);
      axios
        .post(`https://estabelecimentos-back.herokuapp.com/ativar/${token}`)
        .then(() => {
          setMensagem(
            'Conta confirmada com sucesso! Você será redirecionado para a tela de login em 5 segundos.'
          );
        })
        .catch(({ response }) => {
          setMensagem(
            `${response.data.msg} Você será redirecionado para a tela de login em 5 segundos.`
          );
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            navigate('/login');
          }, 5000);
        });

      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  return (
    <section className={styles.container}>
      <h1 className="tituloVerde">Ativação da conta</h1>

      {loading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.mensagemDiv}>
          <h3 className={styles.mensagemAtivacao}>{mensagem}</h3>
        </div>
      )}
    </section>
  );
};

export default Ativar;
