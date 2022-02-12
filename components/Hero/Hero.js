import Image from 'next/image';

import TodoList from '../TodoList';

import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles['hero-left']}>
        <TodoList />
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