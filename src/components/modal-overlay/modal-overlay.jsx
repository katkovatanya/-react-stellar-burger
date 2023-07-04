import overlayStyle from './modal-overlay.module.css';
import { useEffect } from "react";
import PropTypes from 'prop-types';

const ModalOverlay = ({closeModal}) => {


  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    }
  }, [])

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  return (
    <div className={overlayStyle.overlay_active} onClick={() => closeModal()} />
  )
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
}


export default ModalOverlay;
