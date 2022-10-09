import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import Button from "../Button";
import TodoItem from "../TodoItem";
import TextInput from "../Inputs/TextInput";
import SelectInput from "../Inputs/SelectInput";

import FormNoteError from "../FormNoteError";

import { LOCAL_STORAGE_KEY } from "../../utils/constants";

import { itemVariants } from "./animations";
import styles from "./TodoList.module.scss";
import Categories from "./Categories/Categories";

const TodoList = () => {
  const [actualCategory, setActualCategory] = useState("Todas");
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

  const [todoList, setTodoList] = useState([
    {
      title: "Todas",
      content: [],
    },
  ]);
  const categoriesAbailable = [];
  // add categories to categoriesAbailable
  todoList.forEach((category) => {
    categoriesAbailable.push(category.title);
  });

  const allNotitas = todoList.reduce(
    (acc, category) => [...acc, ...category.content],
    []
  );

  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const localNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (localNotes) {
      setTodoList(localNotes);
    }
  }, []);

  // Take the focus event on change notes array
  useEffect(() => {
    titleRef.current.focus();
  }, [todoList]);

  const FORM_VALIDATIONS = {
    isNoteLongEnough: () => titleRef.current.value.length > 0,
  };

  const addTodoItem = () => {
    const inputValue = titleRef.current.value;
    const descriptionValue = descriptionRef.current.value;
    const category = categoryRef.current.value;
    const uniqueId = `${inputValue[0]}#${Date.now()}`;
    const date = new Date();

    const newTodo = {
      id: uniqueId,
      title: inputValue,
      description: descriptionValue,
      category: category,
      isCompleted: false,
      creationDate: date,
    };

    const formValidationsPassed = FORM_VALIDATIONS.isNoteLongEnough();
    if (formValidationsPassed) {
      //if the category is not in the list, add it to the todoList and localstorage
      if (!categoriesAbailable.includes(category)) {
        const newCategory = {
          title: category,
          content: [newTodo],
        };
        setTodoList([...todoList, newCategory]);
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify([...todoList, newCategory])
        );
      } else {
        //if the category is in the list, add the note to the category and localstorage
        const newTodoList = todoList.map((category) => {
          if (category.title === newTodo.category) {
            return {
              ...category,
              content: [...category.content, newTodo],
            };
          } else {
            return category;
          }
        });
        setTodoList(newTodoList);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodoList));
      }

      //move the actual category to the one that has the new note
      setActualCategory(category);

      titleRef.current.value = "";
      descriptionRef.current.value = "";
    } else {
      showErrorForSeconds(5);
      setErrorCount(errorCount + 1);
    }
  };

  const removeTodoItem = (idToRemove) => {
    // we need to delete the note from the category and localstorage
    const newTodoList = todoList.map((category) => {
      return {
        ...category,
        content: category.content.filter((note) => note.id !== idToRemove),
      };
    });

    //if its category is empty, it is deleted unless is the "Todas" category
    const newTodoListFiltered = newTodoList.filter(
      (category) => category.content.length > 0 || category.title === "Todas"
    );
    //if some category got deleted, the actual category is set to "Todas"
    if (newTodoListFiltered.length < newTodoList.length) {
      setActualCategory("Todas");
    }

    setTodoList(newTodoListFiltered);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(newTodoListFiltered)
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodoItem();
    }
  };

  const showErrorForSeconds = (seconds) => {
    setHasError(true);
    setTimeout(() => {
      setHasError(false);
    }, seconds * 1000);
  };

  return (
    <div className={styles["todo-list"]}>
      <div className={styles["todo-list__header"]}>
        <h1 className={styles["todo-list__title"]}>
          Notitas en {actualCategory}
        </h1>
        <Categories
          todoList={todoList}
          setTodoList={setTodoList}
          categoriesAbailable={categoriesAbailable}
          setActualCategory={setActualCategory}
          actualCategory={actualCategory}
        />
      </div>
      <motion.div
        className={styles["todo-list-container"]}
        key="todoContainer"
        initial="entering"
        exit="exiting"
      >
        {allNotitas.length === 0
          ? ""
          : actualCategory === "Todas"
          ? allNotitas.map((todo) => {
              return (
                <div key={todo.id}>
                  <>
                    <TodoItem
                      id={todo.id}
                      title={todo.title}
                      description={todo.description}
                      creationDate={todo.creationDate}
                      isCompleted={todo.isCompleted}
                      onRemove={removeTodoItem}
                      animationVariants={itemVariants}
                    />
                  </>
                </div>
              );
            })
          : //show the notes of the category selected
            todoList
              .filter((category) => category.title === actualCategory)
              .map((category) => {
                return category.content.map((todo) => {
                  return (
                    <div key={todo.id}>
                      <>
                        <TodoItem
                          id={todo.id}
                          title={todo.title}
                          description={todo.description}
                          creationDate={todo.creationDate}
                          isCompleted={todo.isCompleted}
                          onRemove={removeTodoItem}
                          animationVariants={itemVariants}
                        />
                      </>
                    </div>
                  );
                });
              })}
      </motion.div>
      <motion.div key="todoFormInput" layout className={styles["form"]}>
        <TextInput
          nodeRef={titleRef}
          onKeyPress={handleKeyPress}
          placeholder="Título"
        />
        <TextInput
          nodeRef={descriptionRef}
          onKeyPress={handleKeyPress}
          placeholder="Descripción (opcional)"
        />
        <SelectInput nodeRef={categoryRef} categories={categoriesAbailable} />

        <Button onClick={addTodoItem} title="Añadir nota (Enter)" />
        {hasError && <FormNoteError errorCount={errorCount} />}
      </motion.div>
    </div>
  );
};

export default TodoList;
