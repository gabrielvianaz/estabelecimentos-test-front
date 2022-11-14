import React from 'react';
import styles from '../../Assets/Styles/Estabelecimento.module.css';
import Map from '../Map/Map';
import { Marker } from 'react-leaflet';
import { iconeResidencia, iconeComercio, iconeParque } from '../Map/icones';
import { useNavigate } from 'react-router-dom';
import Modal from './ModalExcluir';

const Estabelecimento = ({ dados, reload, setReload }) => {
  const navigate = useNavigate();
  const [icone, setIcone] = React.useState(iconeResidencia);
  const [exibirModal, setExibirModal] = React.useState(false);

  React.useEffect(() => {
    if (dados.tipo === 'r') setIcone(iconeResidencia);
    else if (dados.tipo === 'c') setIcone(iconeComercio);
    else if (dados.tipo === 'p') setIcone(iconeParque);
  }, [dados.tipo]);

  return (
    <div className={styles.estabelecimento}>
      <div
        className={styles.editar}
        onClick={() => navigate(`/editar/${dados.id}`)}
      ></div>
      <div className={styles.content}>
        <div className={styles.mapa}>
          <Map center={[dados.latitude, dados.longitude]}>
            <Marker
              position={[dados.latitude, dados.longitude]}
              icon={icone}
            ></Marker>
          </Map>
        </div>
        <div className={styles.dados}>
          <h3>{dados.nome}</h3>
          <p>
            {dados.logradouro}, {dados.numero}, {dados.bairro}
          </p>
          <p>
            {dados.cidade}, {dados.estado}
          </p>
          <p>{dados.cep}</p>
          <p className={styles.data}>
            Cadastrado em:{' '}
            {dados.createdAt
              .substr(0, 10)
              .replaceAll('-', '/')
              .split('/')
              .reverse()
              .join('/')}
          </p>
        </div>
      </div>
      <div
        className={styles.excluir}
        onClick={() => setExibirModal(true)}
      ></div>
      <Modal
        exibirModal={exibirModal}
        setExibirModal={setExibirModal}
        estabelecimentoId={dados.id}
        reload={reload}
        setReload={setReload}
      />
    </div>
  );
};

export default Estabelecimento;
