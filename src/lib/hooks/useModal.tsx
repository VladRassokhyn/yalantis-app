import React from 'react';
import ReactDOM from 'react-dom';

const ModalRoot: React.FC<{ handleModal: () => void }> = ({ children }) => {
  const parent = document.querySelector('#modal-root');

  if (!parent) return null;

  return ReactDOM.createPortal(
    <div className={'modal-wrapper'}>
      <div className={'modal-content'}>{children}</div>
    </div>,
    parent
  );
};

export const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const handleModal = React.useCallback(() => {
    setModalIsOpen((prev) => !prev);
  }, [modalIsOpen]);

  const Modal: React.FC = ({ children }) =>
    modalIsOpen ? (
      <ModalRoot handleModal={handleModal}>{children}</ModalRoot>
    ) : null;

  return { handleModal, Modal };
};
