import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./FormTodo.module.scss";
import TextInput from "../Inputs/TextInput";
import SelectInput from "../Inputs/SelectInput";
import Button from "../Inputs/Button/Buton";
import { handleKeyPress } from "../../utils/handlePressKey";
import FormNoteError from "../FormNoteError";
//
export default function FormTodo({
  nodetitleRef,
  nodeDescriptionRef,
  categoryRef,
  addTodoItem,
  categoriesAbailable,
  hasError,
  setHasError,
  errorCount,
  setErrorCount,
  todoList,
}) {
  useEffect(() => {
    nodetitleRef.current.focus();
  }, [todoList]);

  return (
    <motion.div key="todoFormInput" layout className={styles.form}>
      <TextInput
        nodeRef={nodetitleRef}
        onKeyPress={handleKeyPress}
        placeholder="Título"
      />
      <TextInput
        nodeRef={nodeDescriptionRef}
        onKeyPress={handleKeyPress}
        placeholder="Descripción (opcional)"
      />
      <SelectInput nodeRef={categoryRef} categories={categoriesAbailable} />

      <Button onClick={addTodoItem} title="Añadir nota (Enter)" />
      <FormNoteError errorCount={errorCount} hasError={hasError} />
    </motion.div>
  );
}
