import { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import modalStyle from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { Typography, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");


const Modal = (props) => {

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
        <div className={props.isOpen ? (modalStyle.modal + " " + modalStyle.modal_open) : (modalStyle.modal)}>
          <button type='button' className={modalStyle.modal__closeButton} onClick={() => props.setIsOpen(false)}>
            <CloseIcon type="primary" />
          </button>
          {props.children}
        </div>
      </>
    ),
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func
}

export default Modal;