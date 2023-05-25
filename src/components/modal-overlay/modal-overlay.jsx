import overlayStyle from './modal-overlay.module.css';
import { useEffect } from "react";

const ModalOverlay = ({ isOpen, setIsOpen }) => {


  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen])

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className={isOpen ? overlayStyle.overlay_active : overlayStyle.overlay} onClick={() => setIsOpen(false)}></div>
  )
}

export default ModalOverlay;