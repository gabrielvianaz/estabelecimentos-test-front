import React from 'react';
import axios from 'axios';
import styles from '../Assets/Styles/NovoEstabelecimento.module.css';
import Map from '../Components/Map/Map';
import DraggableMarker from '../Components/Map/DraggableMarker';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/ModalNovo';
import Spinner from '../Components/Spinner';
import { Animated } from 'react-animated-css';

const NovoEstabelecimento = () => {
  const [estabelecimento, setEstabelecimento] = React.useState({
    nome: '',
    tipo: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    latitude: '',
    longitude: '',
  });
  const [erro, setErro] = React.useState('');
  const [exibirModal, setExibirModal] = React.useState(false);
  const [tokenOk, setTokenOk] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const navigate = useNavigate();

  function handleChange({ target }) {
    const { id, value } = target;
    setEstabelecimento({ ...estabelecimento, [id]: value });
  }

  function handleCep({ target }) {
    const { value } = target;
    if (!isNaN(value)) {
      setEstabelecimento({ ...estabelecimento, cep: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro('');

    for (const chave in estabelecimento) {
      if (!estabelecimento[chave]) {
        setLoading(false);
        return setErro('É obrigatório o preenchimento de todos os campos!');
      }
    }

    axios
      .post(
        'https://estabelecimentos-back.herokuapp.com/estabelecimentos',
        estabelecimento,
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      )
      .then(() => {
        setExibirModal(true);
      })
      .finally(() => setLoading(false));
  }

  React.useEffect(() => {
    setPageLoading(true);

    if (localStorage.token) {
      axios
        .post(
          'https://estabelecimentos-back.herokuapp.com/verificar',
          {},
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        )
        .then(() => {
          setPageLoading(false);
          setTokenOk(true);
        })
        .catch(() => {
          localStorage.clear();
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  React.useEffect(() => {
    if (estabelecimento.cep.length === 8) {
      axios
        .all([
          axios.get(`https://viacep.com.br/ws/${estabelecimento.cep}/json`),
          axios.get(
            `https://api.tomtom.com/search/2/structuredGeocode.json?key=e299rwXhsQwkn8JZObN03HvAf5Wl2aBC&countryCode=BR&postalCode=${estabelecimento.cep}`
          ),
        ])
        .then(
          axios.spread((...res) => {
            setEstabelecimento({
              ...estabelecimento,
              logradouro: res[0].data.logradouro,
              bairro: res[0].data.bairro,
              cidade: res[0].data.localidade,
              estado: res[0].data.uf,
              latitude: res[1].data.results[0].position.lat,
              longitude: res[1].data.results[0].position.lon,
            });
          })
        );
    }
  }, [estabelecimento.cep]);

  return (
    <Animated>
      <section className={styles.container}>
        <div className={styles.header}>
          <p className="retornar" onClick={() => navigate('/')}>
            &lt;
          </p>
          <h1 className="tituloVerde">Novo estabelecimento</h1>
        </div>
        {pageLoading && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
        {tokenOk && (
          <form
            className={styles.novoEstabelecimentoForm}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Nome"
              id="nome"
              value={estabelecimento.nome}
              onChange={handleChange}
            />
            <select
              value={estabelecimento.tipo}
              onChange={({ target }) =>
                setEstabelecimento({ ...estabelecimento, tipo: target.value })
              }
              className={estabelecimento.tipo ? '' : styles.naoSelecionado}
            >
              <option value="" disabled>
                Selecione um tipo
              </option>
              <option value="r">Residência</option>
              <option value="c">Comércio</option>
              <option value="p">Parque</option>
            </select>
            <input
              type="tel"
              placeholder="CEP"
              id="cep"
              maxLength="8"
              value={estabelecimento.cep}
              onChange={handleCep}
            />
            {estabelecimento.latitude && estabelecimento.tipo && (
              <div className={styles.map}>
                <Map
                  center={[estabelecimento.latitude, estabelecimento.longitude]}
                >
                  <DraggableMarker
                    markerPosition={[
                      estabelecimento.latitude,
                      estabelecimento.longitude,
                    ]}
                    estabelecimento={estabelecimento}
                    setEstabelecimento={setEstabelecimento}
                  ></DraggableMarker>
                </Map>
              </div>
            )}
            <input
              type="text"
              placeholder="Logradouro"
              id="logradouro"
              value={estabelecimento.logradouro}
              disabled
            />
            <input
              type="text"
              placeholder="Número"
              id="numero"
              value={estabelecimento.numero}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Bairro"
              id="bairro"
              value={estabelecimento.bairro}
              disabled
            />
            <input
              type="text"
              placeholder="Cidade"
              id="cidade"
              value={estabelecimento.cidade}
              disabled
            />
            <input
              type="text"
              placeholder="Estado"
              id="estado"
              value={estabelecimento.estado}
              disabled
            />
            <div className={styles.divErro}>
              {erro && <p className="erro">{erro}</p>}
            </div>
            <button disabled={loading}>Cadastrar</button>
            {loading}
          </form>
        )}

        <Modal exibirModal={exibirModal} setExibirModal={setExibirModal} />
      </section>
    </Animated>
  );
};

export default NovoEstabelecimento;
