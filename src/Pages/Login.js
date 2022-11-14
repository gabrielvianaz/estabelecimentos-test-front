import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../Components/Button';
import styles from '../Assets/Styles/Login.module.css';
import { Animated } from 'react-animated-css';

const Login = () => {
  const navigate = useNavigate();
  const [tipoInputPassword, setTipoInputPassword] = React.useState('password');
  const [usuario, setUsuario] = React.useState({
    email: '',
    senha: '',
  });
  const [erro, setErro] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function handleCadastro() {
    navigate('/cadastro');
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setUsuario({ ...usuario, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro('');

    if (!usuario.email || !usuario.senha) {
      setLoading(false);
      return setErro('Preencha os campos "E-mail" e Senha!');
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(usuario.email)
    ) {
      setLoading(false);
      return setErro('E-mail inválido!');
    }

    axios
      .post('https://estabelecimentos-back.herokuapp.com/login', usuario)
      .then(({ data }) => {
        localStorage.token = `Bearer ${data}`;
        navigate('/');
      })
      .catch(({ response }) => {
        if (response.data.msg) setErro(response.data.msg);
      })
      .finally(() => setLoading(false));
  }

  function exibirSenha() {
    setTipoInputPassword('text');
  }

  function ocultarSenha() {
    setTipoInputPassword('password');
  }

  React.useEffect(() => {
    if (localStorage.token) navigate('/');
  }, []);

  return (
    <Animated>
      <section className={styles.container}>
        <div className={styles.login}>
          <h1 className="tituloVerde">Fazer login</h1>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="E-mail"
              id="email"
              value={usuario.email}
              onChange={handleChange}
            />
            <div className={styles.senha}>
              <input
                type={tipoInputPassword}
                className={styles.senha}
                placeholder="Senha"
                id="senha"
                value={usuario.senha}
                onChange={handleChange}
              />
              <span
                className={styles.exibirSenha}
                onMouseDown={exibirSenha}
                onMouseUp={ocultarSenha}
              ></span>
            </div>
            {erro && <p className="erro">{erro}</p>}
            <Button disabled={loading}>Login</Button>
          </form>
        </div>
        <div className={styles.cadastrar}>
          <h2 className="tituloBranco">Não possui uma conta?</h2>
          <button className="branco" onClick={handleCadastro}>
            Cadastrar
          </button>
        </div>
      </section>
    </Animated>
  );
};

export default Login;
