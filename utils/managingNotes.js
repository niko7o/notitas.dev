import { FORM_VALIDATIONS } from "./formValidation";
import { v4 as uuid } from "uuid";
import { LOCAL_STORAGE_KEY } from "./constants";
import { errorTriguer } from "./errorTriguer";

export const removeTodoItem = (idToRemove, todoList, setActualCategory) => {
  try {
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
    return newTodoListFiltered;
  } catch (error) {
    console.log(error);
    errorTriguer();
  }
};
