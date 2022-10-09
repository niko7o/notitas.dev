import { FORM_VALIDATIONS } from "./formValidation";
import { v4 as uuid } from "uuid";

export const addTodoItem = (titleRef, descriptionRef) => {
  console.log(titleRef, descriptionRef);
  const newTodo = {
    id: uuid(),
    title: "1",
    description: "2",
    isCompleted: false,
    creationDate: new Date(),
  };

  const formValidationsPassed = FORM_VALIDATIONS.isNoteLongEnough(
    newTodo.title
  );

  if (formValidationsPassed) {
    !!window
      ? window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify([...todoList, newTodo])
        )
      : "";

    setTodoList([...todoList, newTodo]);
    // titleRef.current.value = "";
    // descriptionRef.current.value = "";
    setErrorCount(0);
  } else {
    showErrorForSeconds(5);
    setErrorCount(errorCount + 1);
  }
};
