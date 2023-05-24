import overlayStyle from './modal-overlay.module.css';

const ModalOverlay = (props) => {

  return (
    <div className={props.isOpen ? overlayStyle.overlay_active : overlayStyle.overlay}></div>
  )
}

export default ModalOverlay;