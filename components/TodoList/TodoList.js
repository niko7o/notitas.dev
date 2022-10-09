import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../Inputs/Button/Buton";
import TodoItem from "../TodoItem";
import TextInput from "../Inputs/TextInput";
import SelectInput from "../Inputs/SelectInput";
import FormNoteError from "../FormNoteError";
import { updateLocalStorage } from "../../utils/storage/updateLocalStorage";
import { getLocalStorage } from "../../utils/storage/getLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../utils/constants";
import { itemVariants } from "./animations";
import styles from "./TodoList.module.scss";
import Categories from "./Categories/Categories";
import { removeTodoItem } from "../../utils/managingNotes";
import { FORM_VALIDATIONS } from "../../utils/formValidation";
import FormTodo from "../FormTodo/FormTodo";

const TodoList = () => {
  // State
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const [actualCategory, setActualCategory] = useState("Todas");

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

  // get the todoList from localstorage everytime the web is opened
  useEffect(() => {
    const localNotes = getLocalStorage(LOCAL_STORAGE_KEY);
    localNotes && setTodoList(localNotes);
  }, []);

  // Take the focus event on change notes array

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

    const formValidationsPassed = FORM_VALIDATIONS.isNotEmpty(
      titleRef.current.value.length
    );
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
          Notitas{" "}
          {actualCategory !== "Todas" && <span>en {actualCategory}</span>}
        </h1>

        <Categories
          todoList={todoList}
          setTodoList={setTodoList}
          categoriesAbailable={categoriesAbailable}
          setActualCategory={setActualCategory}
          actualCategory={actualCategory}
        />
      </div>
      <motion.div className={styles["todo-list-container"]}>
        {allNotitas.length === 0
          ? ""
          : actualCategory === "Todas"
          ? allNotitas.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  creationDate={todo.creationDate}
                  isCompleted={todo.isCompleted}
                  animationVariants={itemVariants}
                  todoList={todoList}
                  actualCategory={actualCategory}
                  setActualCategory={setActualCategory}
                  setTodoList={setTodoList}
                />
              );
            })
          : //show the notes of the category selected
            todoList
              .filter((category) => category.title === actualCategory)
              .map((category) => {
                return category.content.map((todo) => {
                  return (
                    <TodoItem
                      id={todo.id}
                      title={todo.title}
                      description={todo.description}
                      creationDate={todo.creationDate}
                      isCompleted={todo.isCompleted}
                      animationVariants={itemVariants}
                      todoList={todoList}
                      actualCategory={actualCategory}
                      setActualCategory={setActualCategory}
                      setTodoList={setTodoList}
                    />
                  );
                });
              })}
      </motion.div>
      <FormTodo
        nodetitleRef={titleRef}
        nodeDescriptionRef={descriptionRef}
        categoryRef={categoryRef}
        addTodoItem={addTodoItem}
        categoriesAbailable={categoriesAbailable}
        hasError={hasError}
        setHasError={setHasError}
        errorCount={errorCount}
        setErrorCount={setErrorCount}
        todoList={todoList}
      />
    </div>
  );
};

export default TodoList;
