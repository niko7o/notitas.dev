import { LOCAL_STORAGE_KEY } from "./constants";

import Swal from "sweetalert2";

export const handleNewCategory = async (
  setActualCategory,
  setTodoList,
  todoList
) => {
  const { value: newCategory } = await Swal.fire({
    input: "text",
    inputLabel: "Name your new category",
    inputPlaceholder: "Category name",
  });

  if (newCategory) {
    const newTodoList = [
      ...todoList,
      {
        title: newCategory,
        content: [],
      },
    ];
    setActualCategory(newCategory);
    setTodoList(newTodoList);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodoList));
  }
};
