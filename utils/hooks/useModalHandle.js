import { useState } from 'react';

export const useModalHandle = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  
  return {
    isModalOpen,
    setModalOpen,
    openModal,
    closeModal,
  };
}