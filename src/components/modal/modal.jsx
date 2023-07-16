import ReactDOM from "react-dom";
import modalStyle from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { Typography, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");


const Modal = ({ closeModal, children }) => {

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

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Modal;