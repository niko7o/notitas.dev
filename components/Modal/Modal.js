import { useRef, useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { useMousePosition } from '../../utils/hooks';

import { entering, idle, exiting, customTransition } from './animations';

import styles from './Modal.module.scss'

const Modal = ({ children, closeModal, isCloseButtonShown }) => {
  const modalRef = useRef(null);
  const { mousePosition } = useMousePosition();
  const { x: cursorX, y: cursorY } = mousePosition;

  const handleClickOutside = event => {
    if (!modalRef.current.contains(event.target)) {
      closeModal();
      document.body.style.cursor = 'default';
    }
  }

  useEffect(() => {
    const modalBounds = modalRef.current.getBoundingClientRect();
    const isCursorOutOfModalBounds =
      // extra check to ensure modal is mounted here 
      cursorX > modalBounds.right 
      || cursorX < modalBounds.left
      || cursorY < modalBounds.top
      || cursorY > modalBounds.bottom;

    if (isCursorOutOfModalBounds) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [modalRef, mousePosition])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  return (
    <motion.div 
      className={styles.modal}
      initial={entering}
      animate={idle}
      exit={exiting}
      transition={customTransition}
      ref={modalRef}
    >
      {children}
      {isCloseButtonShown && <button onClick={closeModal}>x</button>}
    </motion.div>
  )
}

export default Modal;