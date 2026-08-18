import { motion } from 'framer-motion';

import styles from './TextInput.module.scss';

const TextInput = ({ nodeRef, onKeyPress, placeholder, ariaLabel }) => (
  <motion.input
    ref={nodeRef}
    type="text"
    onKeyPress={onKeyPress}
    placeholder={placeholder}
    aria-label={ariaLabel}
    className={styles['text-input']}
  />
)

export default TextInput;
