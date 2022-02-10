import { motion } from 'framer-motion';

const ERROR_COPIES = {
  1: 'Pero escribe algo, cabesa! 🤔',
  2: '¿Quieres escribir?',
  3: 'Poeta de la familia.. no eres.',
}

const FormNoteError = ({ errorCount }) => (
  <motion.span
    layout
    initial={{ marginTop: '10px', opacity: 0, y: -20, color: 'crimson' }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
  >
    {ERROR_COPIES[errorCount] || 'Escribe algo anda.'}
  </motion.span>
)

export default FormNoteError;