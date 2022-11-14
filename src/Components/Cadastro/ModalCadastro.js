import React from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const Modal = ({ exibirModal, setExibirModal }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setExibirModal(false);
    navigate('/login');
  };

  return (
    <BootstrapModal show={exibirModal} onHide={handleClose}>
      <BootstrapModal.Header>
        <BootstrapModal.Title style={{ fontWeight: 'bold', color: '#3aafa1' }}>
          Cadastro efetuado com sucesso
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        Enviamos um link de confirmação para o seu e-mail. Acesse o link e ative
        sua conta!
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <button onClick={handleClose}>Fechar</button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
