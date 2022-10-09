import { motion } from "framer-motion";
import { useState } from "react";

import styles from "./TodoItem.module.scss";
import { CgClose } from "react-icons/cg";

const TodoItem = ({
  id,
  title,
  description,
  creationDate,
  isCompleted,
  onRemove,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      key={id}
      className={styles.todo}
      // drag
      onClick={() => setOpen(!open)}
      // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      // dragElastic={0.5}
      // dragMomentum={true}
      // dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
      whileHover="hover"
      whileTap="hover"
    >
      <span>{title}</span>
      {open ? <p className={styles["description"]}>{description}</p> : ""}

      <motion.div className={styles["delete"]} onClick={() => onRemove(id)}>
        <span>
          <CgClose size={15} />
        </span>
      </motion.div>
    </motion.div>
  );
};

export default TodoItem;
