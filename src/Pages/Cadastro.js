import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../Components/Button';
import styles from '../Assets/Styles/Cadastro.module.css';

const Cadastro = () => {
  const navigate = useNavigate();
  const [tipoInputPassword, setTipoInputPassword] = React.useState('password');
  const [usuario, setUsuario] = React.useState({
    nome: '',
    email: '',
    senha: '',
  });
  const [erro, setErro] = React.useState('');

  function handleLogin() {
    navigate('/login');
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setUsuario({ ...usuario, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    if (!usuario.nome || !usuario.email || !usuario.senha)
      return setErro('Preencha os campos "Nome", "E-mail" e Senha!');
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(usuario.email))
      return setErro('E-mail inválido!');

    axios
      .post('http://localhost:8081/usuario', usuario)
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
        <h2 className="tituloBranco">Já possui uma conta?</h2>
        <button className="branco" onClick={handleLogin}>
          Entrar
        </button>
      </div>
      <div className={styles.cadastrar}>
        <h1 className="tituloVerde">Criar conta</h1>
        <form className={styles.cadastroForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            id="nome"
            value={usuario.nome}
            onChange={handleChange}
          />
          <input
            type="email"
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
            ></input>
            <span
              className={styles.exibirSenha}
              onMouseDown={exibirSenha}
              onMouseUp={ocultarSenha}
            ></span>
          </div>
          {erro && <p className={styles.erro}>{erro}</p>}
          <Button>Cadastrar</Button>
        </form>
      </div>
    </section>
  );
};

export default Cadastro;
