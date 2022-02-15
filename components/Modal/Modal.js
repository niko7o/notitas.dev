import { motion } from 'framer-motion';

import { entering, idle, exiting, customTransition } from './animations';

import styles from './Modal.module.scss'

const Modal = ({ children, closeModal, isCloseButtonShown }) => (
  <>
    <motion.div 
      className={styles.modal}
      initial={entering}
      animate={idle}
      exit={exiting}
      transition={customTransition}
    >
      {children}
    </motion.div>
    
    <motion.div
      onClick={closeModal}
      className={styles['modal-overlay']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1  }}
      exit={{ opacity: 0 }}
    />

    {isCloseButtonShown && <button onClick={closeModal}>x</button>}
  </>
)

export default Modal;