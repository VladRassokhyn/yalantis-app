import React from 'react';
import ReactDOM from 'react-dom';

const ModalRoot: React.FC<{handleModal: ()=> void}> = ({children, handleModal}) => {

  const parent = document.querySelector('#modal-root');

  if (!parent) return null;

  const handleClick = (e: any) => {
    if(!e.target.classList.contains('modal-wrapper')) {
      return
    }
    handleModal()
  }

  return ReactDOM.createPortal(
    <div className={'modal-wrapper'} onClick={handleClick}>
      <div className={'modal-content'}>
        {children}
      </div>
    </div>,
    parent
  );
};

export const useModal = (component:React.FC) => {

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const Modal = () => modalIsOpen
    ? <ModalRoot handleModal={handleModal}>{component}</ModalRoot>
    : null

  return { handleModal, Modal };
};