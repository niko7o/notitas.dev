import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { sendEvent } from "../../utils/google-analytics";

import Button from "../Button";
import TodoItem from "../TodoItem";
import TextInput from "../TextInput";
import FormNoteError from "../FormNoteError";

import { LOCAL_STORAGE_KEY } from "../../utils/constants";

import { containerVariants, itemVariants } from "./animations";

import styles from "./TodoList.module.scss";

const TodoList = () => {
  const inputRef = useRef(null);
  const itemRef = useRef(null); // @TO-DO: implement scrollTo() after item is added

  const [todoList, setTodoList] = useState([]); // @TO-DO: use /notes endpoint
  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  useEffect(() => {
    const localTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localTodos?.length > 0) {
      setTodoList(JSON.parse(localTodos));
    }
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, [todoList]);

  const FORM_VALIDATIONS = {
    isNoteLongEnough: () => inputRef.current.value.length > 0,
  };

  const addTodoItem = () => {
    const inputValue = inputRef.current.value;
    const uniqueId = `${inputValue[0]}#${Date.now()}`;
    const date = new Date();

    const newTodo = {
      id: uniqueId,
      title: inputValue,
      // isEditing: false,
      isCompleted: false,
      creationDate: date,
    };

    const formValidationsPassed = FORM_VALIDATIONS.isNoteLongEnough();

    if (formValidationsPassed) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([...todoList, newTodo])
      );
      setTodoList([...todoList, newTodo]);
      inputRef.current.value = "";
      sendEvent({ category: "TodoItem", label: "Add", value: "Success" });
    } else {
      showErrorForSeconds(3);
      setErrorCount(errorCount + 1);
      sendEvent({ category: "TodoItem", label: "Add", value: "Error" });
    }
  };

  const removeTodoItem = (idToRemove) => {
    const filteredTodos = todoList.filter((item) => item.id !== idToRemove);
    setTodoList(filteredTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredTodos));
    sendEvent({ category: "TodoItem", label: "Remove", value: "Success" });
  };

  const handleKeyPress = (event) => {
    // @TO-DO: Implement keyboard navigation/shortcuts (arrows + del)
    if (event.key === "Enter") {
      addTodoItem();
    }
  };

  // const handleEditTodo = (editingIndex) => {
  //   setCurrentEditIndex(editingIndex);
  // };

  const handleEditSave = (newItem) => {
    // setCurrentEditIndex(null);

    const newTodoList = todoList.map((todo) => {
      if (todo.id === newItem.id) {
        return newItem;
      }
      return todo;
    });

    setTodoList(newTodoList);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodoList));
  };

  const showErrorForSeconds = (seconds) => {
    setHasError(true);
    setTimeout(() => {
      setHasError(false);
    }, seconds * 1000);
  };

  return (
    <div className={styles["todo-list"]}>
      <AnimatePresence>
        <motion.div
          key='todoContainer'
          variants={containerVariants}
          style={{ width: "100%" }}
          initial='entering'
          animate='active'
          exit='exiting'
        >
          {todoList.length > 0 &&
            todoList.map((item, i) => (
              <TodoItem
                id={item.id}
                key={item.id}
                title={item.title}
                creationDate={item.creationDate}
                isCompleted={item.isCompleted}
                onRemove={removeTodoItem}
                animationVariants={itemVariants}
                onEdit={() => handleEditTodo(i)}
                onEditSave={handleEditSave}
              />
            ))}
        </motion.div>

        <motion.div key='todoFormInput' layout className={styles["form"]}>
          <TextInput
            nodeRef={inputRef}
            onKeyPress={handleKeyPress}
            placeholder='Escribe aquí..'
          />
          <Button onClick={addTodoItem} title='Añadir nota (Enter)' />
          {hasError && <FormNoteError errorCount={errorCount} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/notes`);
  const notes = await res.json();

  return {
    props: {
      notes,
    },
  };
}

export default TodoList;
