import { motion } from 'framer-motion';

import styles from './TodoItem.module.scss';

export default function TodoItem({ id, title, animationVariants, creationDate, isCompleted, onRemove }) {
  return (
    <motion.div
      layout
      key={id}
      className={styles.todo}
      variants={animationVariants}
    >
      <span>{title}</span>
      <motion.span
        className={styles['todo-trash']}
        whileHover={{ scale: 1.4, rotate: 30 }}
        onClick={() => onRemove(id)}
      >
        x
      </motion.span>
    </motion.div>
  );
}