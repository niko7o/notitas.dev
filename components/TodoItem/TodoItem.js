import { motion } from 'framer-motion';

import styles from './TodoItem.module.scss';

import { hoverAnimation } from './animations';

export default function TodoItem({ 
  id,
  title,
  animationVariants,
  creationDate,
  onRemove
}) {
  const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  // const getFormattedDate = () => {
  //   return creationDate.toLocaleDateString('es-ES', dateOptions)
  // }

  return (
    <motion.div
      layout
      key={id}
      className={styles.todo}
      variants={animationVariants}
    >
      <span>{title}</span>
      
      {/* <span className={styles.date}>
        {getFormattedDate()}
      </span> */}
      
      <motion.div
        className={styles['delete']}
        whileHover={hoverAnimation}
        onClick={() => onRemove(id)}
      >
        <span>
          ✘
        </span>
      </motion.div>
    </motion.div>
  );
}