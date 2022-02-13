// import { useEffect } from 'react';

import Image from 'next/image';

import TodoList from '../TodoList';

import styles from './Hero.module.scss';

import { LOCAL_STORAGE_KEY } from '../../utils/constants';

const Hero = () => {
  const persistedTodos = 
    typeof window !== 'undefined' 
    && localStorage.getItem(LOCAL_STORAGE_KEY) || [];
  
  return (
    <div className={styles.hero}>
      <div className={styles['hero-left']}>
        {persistedTodos && <TodoList items={persistedTodos} />}
      </div>

      <div className={styles['hero-right']}>
        <h1>Guarda notitas a la velocidad de la luz.</h1>
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
    </div>
  )
}

export default Hero;