import overlayStyle from './modal-overlay.module.css';
import { useEffect } from "react";
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {


  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    }
  }, [])

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      props.setIsOpen(false)
    }
  }

  return (
    <div className={overlayStyle.overlay_active} onClick={() => props.setIsOpen(false)} />
  )
}

ModalOverlay.propTypes = {
  setIsOpen: PropTypes.func.isRequired
}


export default ModalOverlay;