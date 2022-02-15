import Image from 'next/image';

import { AnimatePresence } from 'framer-motion';

import Author from '../Author';
import TodoList from '../TodoList';
import Modal from '../Modal';
import HowItWorks from '../HowItWorks';

import styles from './Hero.module.scss';

import { useModalHandle } from '../../utils/hooks';
import { LOCAL_STORAGE_KEY } from '../../utils/constants';

const Hero = () => {
  const { isModalOpen, openModal, closeModal } = useModalHandle();

  const persistedTodos = 
    typeof window !== 'undefined' 
    && localStorage.getItem(LOCAL_STORAGE_KEY) || [];
  
  return (
    <div className={styles.hero}>
      <div className={styles['hero-left']}>
        {persistedTodos && <TodoList items={persistedTodos} />}
      </div>

      <div className={styles['hero-right']}>
        <h1>Tu bloc de notitas, más rápido que nadie 🚀</h1>
        <div className={styles['hero-image']}>
          <Image
            src="/notes.svg"
            width={600}
            height={400}
            quality={100}
            priority 
          />
        </div>
      </div>

      <Author />
      
      <a className={styles['hiw-cta']} onClick={openModal}>
        Cómo funciona
      </a>
      
      <AnimatePresence>
        {isModalOpen && (
          <Modal key="animatedModal" closeModal={closeModal}>
            <HowItWorks />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Hero;