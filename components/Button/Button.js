import { useEffect } from 'react';

import { motion } from 'framer-motion';

import styles from './Button.module.scss';

import useFeatureFlags from '../../hooks/useFeatureFlags';

export default function Button({ title, onClick }) {
  const { flags } = useFeatureFlags();
  
  useEffect(() => {    
    console.log('Button flags', flags)
  }, [flags])

  return (
    <motion.button
      layout
      onClick={onClick} 
      className={styles.button}
      whileHover={{ scale: 1.1 }}
    >
      {title}
    </motion.button>
  )
}