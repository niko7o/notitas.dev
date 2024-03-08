import { motion } from 'framer-motion';

import NoteIcon from '../../icons/Note';

import styles from './Button.module.scss';

import useFeatureFlags from '../../hooks/useFeatureFlags';

export default function Button({ title, onClick }) {
  const { flags: featureFlags = [] } = useFeatureFlags();
  const isButtonRedesigned = featureFlags?.includes('redesign') || false;

  return featureFlags.length > 0 ? (
    <motion.button
      layout
      onClick={onClick} 
      whileHover={{ scale: 1.1 }}
      className={`${styles.button} ${isButtonRedesigned && styles['button-redesign']}`}
    >
      {isButtonRedesigned && <NoteIcon />}
      {title}
    </motion.button>
  ) : null
}