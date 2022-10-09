import { motion } from "framer-motion";

import styles from "./Button.module.scss";

export default function Button({ title, onClick }) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={styles.button}
      whileHover={{ scale: 1.1 }}
    >
      {title}
    </motion.button>
  );
}
