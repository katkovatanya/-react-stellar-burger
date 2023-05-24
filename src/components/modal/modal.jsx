import { useState, useEffect } from 'react';
import modalStyle from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { Typography, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Modal = ({ isOpen, setISOpen }) => {

  return (
    <div className={isOpen ? (modalStyle.modal + " " + modalStyle.modal_open) : (modalStyle.modal)}>
      <button type='button' className={modalStyle.modal__closeButton} onClick={() => setISOpen(false)}>
        <CloseIcon type="primary" />
      </button>
      <p className="text text_type_digits-large">034536</p>
      <p className={modalStyle.modal__subtitle + " text text_type_main-medium"}>
        Идентификатор заказа
      </p>
      <div className={modalStyle.modal__done} />
      <p className={"text text_type_main-default " + modalStyle.modal__paragraph}>
        Ваш заказ начали готовить
      </p>
      <p className={"text text_type_main-default text_color_inactive " + modalStyle.modal__paragraph_inactive}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default Modal;