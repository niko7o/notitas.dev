import { motion } from 'framer-motion';

import { useLocale } from '../../context/Locale';

const FormNoteError = ({ errorCount }) => {
  const { t } = useLocale();
  const errorCopy = t.todo.errors[errorCount - 1] || t.todo.fallbackError;

  return (
    <motion.span
      role="alert"
      layout
      initial={{ marginTop: '10px', opacity: 0, y: -20, color: 'crimson' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {errorCopy}
    </motion.span>
  );
};

export default FormNoteError;
