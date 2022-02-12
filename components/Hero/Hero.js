import Image from 'next/image';

import TodoList from '../TodoList';

import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles['hero-list']}>
        <TodoList />
      </div>
      <div className={styles['hero-illustration']}>
        <Image
          src="/notes.svg"
          width={600}
          height={400}
          quality={100}
          priority 
        />
      </div>
    </div>
  )
}

export default Hero;