import React from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import axios from 'axios';

const Modal = ({
  exibirModal,
  setExibirModal,
  estabelecimentoId,
  reload,
  setReload,
}) => {
  const handleClose = () => {
    setExibirModal(false);
  };
  const [loading, setLoading] = React.useState(false);

  function excluirEstabelecimento() {
    setLoading(true);
    axios
      .delete(
        `https://estabelecimentos-back.herokuapp.com/estabelecimentos/${estabelecimentoId}`,
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      )
      .then(() => {
        setExibirModal(false);
        setReload(!reload);
      });
  }

  return (
    <BootstrapModal show={exibirModal} onHide={handleClose}>
      <BootstrapModal.Header>
        <BootstrapModal.Title style={{ fontWeight: 'bold', color: '#3aafa1' }}>
          Excluir Estabelecimento
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        Confirma a exclusão do estabelecimento?
      </BootstrapModal.Body>
      <BootstrapModal.Footer style={{ justifyContent: 'center' }}>
        <button
          onClick={excluirEstabelecimento}
          style={{ marginRight: '20px' }}
          disabled={loading}
        >
          Sim
        </button>
        <button onClick={handleClose}>Não</button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
