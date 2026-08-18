import { motion } from 'framer-motion';

const ERROR_COPIES = {
  1: 'Escribe algo antes de guardar.',
  2: 'La nota todavía está vacía.',
  3: 'Añade una idea, aunque sea pequeña.',
  4: 'Necesitamos al menos una palabra.'
}

const FormNoteError = ({ errorCount }) => (
  <motion.span
    role="status"
    aria-live="polite"
    layout
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
  >
    {ERROR_COPIES[errorCount] || 'Escribe algo anda.'}
  </motion.span>
)

export default FormNoteError;
