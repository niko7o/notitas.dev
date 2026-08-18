import { motion } from "framer-motion";

import styles from "./TodoItem.module.scss";

const formatDate = (date) => {
  if (!date) return "Ahora";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Ahora";

  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" }).format(parsedDate);
};

const TodoItem = ({ id, title, creationDate, isSelected, animationVariants, onSelect }) => (
  <motion.button
    layout
    key={id}
    className={`${styles.todo} ${isSelected ? styles.selected : ""}`}
    variants={animationVariants}
    onClick={onSelect}
    type="button"
    aria-current={isSelected ? "true" : undefined}
  >
    <span className={styles["note-preview"]}>{title}</span>
    <span className={styles.meta}>
      <span>{formatDate(creationDate)}</span>
      <span>{title.trim().split(/\s+/).length} pal.</span>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </span>
  </motion.button>
);

export default TodoItem;
