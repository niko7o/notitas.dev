import { motion } from 'framer-motion';

import styles from './TodoItem.module.scss';

import { hoverAnimation } from './animations';

export default function TodoItem({ 
  id,
  title,
  animationVariants,
  creationDate,
  isCompleted,
  onRemove
}) {
  return (
    <motion.div
      layout
      key={id}
      className={styles.todo}
      variants={animationVariants}
    >
      <span>{title}</span>
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