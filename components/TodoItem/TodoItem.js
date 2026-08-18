import { useState, useRef } from "react";

import { motion } from "framer-motion";

import Pill from "../Pill";

import styles from "./TodoItem.module.scss";

import { hoverAnimation } from "./animations";

import { useFeatureFlags } from '../../hooks/useFeatureFlags';
import { useLocale } from '../../context/Locale';

const TodoItem = ({ id, title, animationVariants, onRemove, onEditSave }) => {
  const itemRef = useRef({});
  const [todoText, setTodoText] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const { flags: featureFlags = [] } = useFeatureFlags();
  const { t } = useLocale();
  const isRedesign = featureFlags?.includes('redesign') || false;

  const handleClickEdit = () => {
    itemRef.current.focus();
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
    console.log(itemRef.current);
    onEditSave({ id, title: todoText });
  };

  return (
    <motion.div
      layout
      key={id}
      className={`${styles.todo} ${isRedesign && styles['todo-redesign']}`}
      variants={animationVariants}
      ref={itemRef}
    >
      {isEditing ? (
        <div style={{ position: "relative" }}>
          <input
            className={styles["editing"]}
            type='text'
            value={todoText}
            onChange={(e) => setTodoText(e.currentTarget.value)}
          />
          <Pill text={t.todo.editing} />
        </div>
      ) : (
        <span className={styles["item"]}>{title}</span>
      )}

      <motion.button
        type="button"
        className={styles["edit"]}
        onClick={handleClickEdit}
        aria-label={isEditing ? t.todo.save : t.todo.edit}
      >
        {isEditing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12 4 4L19 6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
            <path d="m14 7 3 3" />
          </svg>
        )}
      </motion.button>

      <motion.button
        type="button"
        className={styles["delete"]}
        whileHover={hoverAnimation}
        onClick={() => onRemove(id)}
        aria-label={t.todo.remove}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 7h14M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default TodoItem;
