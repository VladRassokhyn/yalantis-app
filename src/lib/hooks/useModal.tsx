import React from 'react';
import ReactDOM from 'react-dom';
import { useClickOutside } from './useClickOutside';

const ModalRoot: React.FC<{handleModal: ()=> void}> = ({children, handleModal}) => {

  const parent = document.querySelector('#modal-root');
  const contentRef = React.useRef<any>()

  if (!parent) return null;

  useClickOutside(contentRef, handleModal);

  return ReactDOM.createPortal(
    <div className={'modal-wrapper'} >
      <div
        ref={contentRef}
        className={'modal-content'}
      >
        {children}
      </div>
    </div>,
    parent
  );
};

export const useModal = () => {

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const Modal: React.FC = ({children}) => modalIsOpen
    ? <ModalRoot handleModal={handleModal}>{children}</ModalRoot>
    : null

  return { handleModal, Modal };
};