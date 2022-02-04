import { motion } from 'framer-motion';

import styles from './TextInput.module.scss';

const TextInput = ({ nodeRef, onKeyPress, placeholder }) => (
  <motion.input
    ref={nodeRef}
    type="text"
    onKeyPress={onKeyPress}
    placeholder={placeholder}
    className={styles['text-input']}
  />
)

export default TextInput;
