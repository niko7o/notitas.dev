import { motion } from "framer-motion";

import { entering, idle, exiting, customTransition } from "./animations";
import styles from "./Modal.module.scss";

const Modal = ({ children, closeModal, isCloseButtonShown }) => (
  <div className={styles["modal-root"]} role="presentation">
    <motion.div
      className={styles.modal}
      initial={entering}
      animate={idle}
      exit={exiting}
      transition={customTransition}
      role="dialog"
      aria-modal="true"
      aria-label="Cómo funciona notitas.dev"
    >
      {isCloseButtonShown ? (
        <button className={styles.close} onClick={closeModal} type="button" aria-label="Cerrar">
          ×
        </button>
      ) : null}
      {children}
    </motion.div>

    <motion.button
      onClick={closeModal}
      className={styles["modal-overlay"]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      type="button"
      aria-label="Cerrar información"
    />
  </div>
);

export default Modal;
