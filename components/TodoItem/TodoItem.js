import { motion } from 'framer-motion';

import styles from './TodoItem.module.scss';

export default function TodoItem({ id, title, creationDate, isCompleted, onRemove }) {
  return (
    <motion.div
      layout
      key={id}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.todo}
    >
      <span>{title}</span>
      <motion.span
        className={styles['todo-trash']}
        whileHover={{ scale: 1.4, rotate: -30 }}
        onClick={() => onRemove(id)}
      >
        ✖
      </motion.span>
    </motion.div>
  );
}