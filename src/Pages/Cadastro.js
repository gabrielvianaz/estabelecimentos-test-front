import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../Components/Button';
import styles from '../Assets/Styles/Cadastro.module.css';
import Modal from '../Components/Cadastro/ModalCadastro';
import { Animated } from 'react-animated-css';

const Cadastro = () => {
  const navigate = useNavigate();
  const [tipoInputPassword, setTipoInputPassword] = React.useState('password');
  const [usuario, setUsuario] = React.useState({
    nome: '',
    email: '',
    senha: '',
  });
  const [erro, setErro] = React.useState('');
  const [exibirModal, setExibirModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleLogin() {
    navigate('/login');
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setUsuario({ ...usuario, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro('');

    if (!usuario.nome || !usuario.email || !usuario.senha) {
      setLoading(false);
      return setErro('Preencha os campos "Nome", "E-mail" e Senha!');
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(usuario.email)
    ) {
      setLoading(false);
      return setErro('E-mail inválido!');
    }

    axios
      .post('https://estabelecimentos-back.herokuapp.com/usuario', usuario)
      .then(() => setExibirModal(true))
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
            {erro && <p className="erro">{erro}</p>}
            <Button disabled={loading}>Cadastrar</Button>
          </form>
        </div>
        <Modal exibirModal={exibirModal} setExibirModal={setExibirModal} />
      </section>
    </Animated>
  );
};

export default Cadastro;
