import { useState, useRef } from "react";

import { motion } from "framer-motion";

import Pill from "../Pill";

import styles from "./TodoItem.module.scss";

import { hoverAnimation } from "./animations";

import { useFeatureFlags } from '../../hooks/useFeatureFlags';

const TodoItem = ({ id, title, animationVariants, onRemove, onEditSave }) => {
  const itemRef = useRef({});
  const [todoText, setTodoText] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const { flags: featureFlags = [] } = useFeatureFlags();
  const isRedesign = featureFlags?.includes('redesign') || false;

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
          <Pill text={"Editando"} />
        </div>
      ) : (
        <span className={styles["item"]}>{title}</span>
      )}

      <motion.div className={styles["edit"]} onClick={handleClickEdit}>
        {isEditing ? "✔️" : "✏️"}
      </motion.div>

      <motion.div
        className={styles["delete"]}
        whileHover={hoverAnimation}
        onClick={() => onRemove(id)}
      >
        <span>✘</span>
      </motion.div>
    </motion.div>
  );
};

export default TodoItem;
