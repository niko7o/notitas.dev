import { motion } from 'framer-motion';

import { useLocale } from '../../context/Locale';

const FormNoteError = ({ errorCount }) => {
  const { t } = useLocale();
  const errorCopy = t.todo.errors[errorCount - 1] || t.todo.fallbackError;

  return (
    <motion.span
      role="status"
      aria-live="polite"
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
    >
      {errorCopy}
    </motion.span>
  );
};

export default FormNoteError;
