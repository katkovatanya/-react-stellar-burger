import overlayStyle from "./modal-overlay.module.css";
import { FC, useEffect } from "react";
import PropTypes from "prop-types";

interface IModalOverlayProps {
  closeModal: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ closeModal }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <div className={overlayStyle.overlay_active} onClick={() => closeModal()} />
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
