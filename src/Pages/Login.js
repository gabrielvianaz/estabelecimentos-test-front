import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../Components/Button';
import styles from '../Assets/Styles/Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [tipoInputPassword, setTipoInputPassword] = React.useState('password');
  const [usuario, setUsuario] = React.useState({
    email: '',
    senha: '',
  });
  const [erro, setErro] = React.useState('');

  function handleCadastro() {
    navigate('/cadastro');
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setUsuario({ ...usuario, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    if (!usuario.email || !usuario.senha)
      return setErro('Preencha os campos "E-mail" e Senha!');
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(usuario.email))
      return setErro('E-mail inválido!');

    axios
      .post('http://localhost:8081/login', usuario)
      .then(({ data }) => {
        localStorage.token = data;
        navigate('/');
      })
      .catch(({ response }) => {
        if (response.data.msg) setErro(response.data.msg);
      });
  }

  function exibirSenha() {
    setTipoInputPassword('text');
  }

  function ocultarSenha() {
    setTipoInputPassword('password');
  }

  return (
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
          {erro && <p className={styles.erro}>{erro}</p>}
          <Button>Login</Button>
        </form>
      </div>
      <div className={styles.cadastrar}>
        <h2 className="tituloBranco">Não possui uma conta?</h2>
        <button className="branco" onClick={handleCadastro}>
          Cadastrar
        </button>
      </div>
    </section>
  );
};

export default Login;
