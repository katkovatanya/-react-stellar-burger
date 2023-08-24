import ReactDOM from "react-dom";
import modalStyle from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from "react";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModalProps {
  closeModal: () => void;
}


const Modal: FC<IModalProps> = ({ closeModal, children }) => {

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay closeModal={closeModal} />
        <div className={modalStyle.modal_open}>
          <button type='button' className={modalStyle.modal__closeButton} onClick={() => closeModal()}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </>
    ),
    modalRoot
  );
}


export default Modal;