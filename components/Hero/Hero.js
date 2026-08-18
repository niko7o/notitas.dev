import Image from 'next/image';

import { AnimatePresence } from 'framer-motion';

import Author from '../Author';
import TodoList from '../TodoList';
import Modal from '../Modal';
import HowItWorks from '../HowItWorks';
import LanguageSwitcher from '../LanguageSwitcher';

import styles from './Hero.module.scss';

import { useModalHandle } from '../../utils/hooks';
import { LOCAL_STORAGE_KEY } from '../../utils/constants';
import { useLocale } from '../../context/Locale';

const Hero = () => {
  const { isModalOpen, openModal, closeModal } = useModalHandle();
  const { t } = useLocale();

  const persistedTodos = 
    typeof window !== 'undefined' 
    && localStorage.getItem(LOCAL_STORAGE_KEY) || [];
  
  return (
    <div className={styles.hero}>
      <div className={styles['hero-left']}>
        {persistedTodos && <TodoList items={persistedTodos} />}
      </div>

      <div className={styles['hero-right']}>
        <div className={styles['hero-image']}>
          <Image
            src="/bilingual-notes.png"
            width={720}
            height={480}
            quality={100}
            priority
            alt={t.hero.imageAlt}
          />
          <p>{t.hero.imageCaption}</p>
        </div>
      </div>

      <Author />
      
      <div className={styles.controls}>
        <LanguageSwitcher />
        <button className={styles['hiw-cta']} type="button" onClick={openModal}>
          {t.howItWorks}
        </button>
      </div>
      
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
