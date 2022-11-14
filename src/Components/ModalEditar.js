import React from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const Modal = ({ exibirModal, setExibirModal }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setExibirModal(false);
    navigate('/');
  };

  return (
    <BootstrapModal show={exibirModal} onHide={handleClose}>
      <BootstrapModal.Header>
        <BootstrapModal.Title style={{ fontWeight: 'bold', color: '#3aafa1' }}>
          Editar Estabelecimento
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        Estabelecimento editado com sucesso!
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <button onClick={handleClose}>Fechar</button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
