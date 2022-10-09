import { motion } from "framer-motion";

export const ERROR_COPIES = {
  1: "Pero escribe algo, cabesa! 🤔",
  2: "¿Quieres escribir?",
  3: "Poeta de la familia... no eres.",
  4: "No te rindas, sigue intentando.",
  5: "¿No te gusta escribir?",
  6: "Ummm...",
};

const FormNoteError = ({ errorCount, hasError }) => (
  <motion.span
    layout
    initial={{ marginTop: "10px", opacity: 0, y: -20, color: "crimson" }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
  >
    {hasError && (ERROR_COPIES[errorCount] || "Necesitas ayuda? 🤔")}
  </motion.span>
);

export default FormNoteError;
