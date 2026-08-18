import { motion } from "framer-motion";

import styles from "./TodoItem.module.scss";
import { useLocale } from "../../context/Locale";

const formatDate = (date, locale, fallback) => {
  if (!date) return fallback;
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return fallback;

  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "short",
  }).format(parsedDate);
};

const TodoItem = ({ id, title, priority, creationDate, isCompleted, isSelected, animationVariants, onSelect }) => {
  const { locale, t } = useLocale();
  const priorityLabel = priority ? t.todo.priorities[priority] : null;

  return (
    <motion.button
      layout
      key={id}
      className={`${styles.todo} ${isSelected ? styles.selected : ""} ${isCompleted ? styles.completed : ""}`}
      variants={animationVariants}
      onClick={onSelect}
      type="button"
      aria-current={isSelected ? "true" : undefined}
    >
      <span className={styles["note-preview"]}>{title}</span>
      <span className={styles.meta}>
        <span>{formatDate(creationDate, locale, t.todo.now)}</span>
        <span>{title.trim().split(/\s+/).length} {t.todo.wordAbbreviation}</span>
        {priorityLabel ? (
          <span className={`${styles.priority} ${styles[`priority-${priority}`]}`}>
            {priorityLabel}
          </span>
        ) : null}
        <span className={styles.arrow} aria-hidden="true">→</span>
      </span>
    </motion.button>
  );
};

export default TodoItem;
