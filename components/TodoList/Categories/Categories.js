import styles from "./Categories.module.scss";
import { AiOutlinePlus } from "react-icons/ai";

export default function Categories({
  setActualCategory,
  actualCategory,
  categoriesAbailable,
  setTodoList,
  todoList,
}) {
  const handleNewCategory = () => {
    const newCategory = prompt("Ingrese el nombre de la nueva categoria");
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
  //if a category is empty, it is deleted

  return (
    <div className={styles.container}>
      {categoriesAbailable.map((category) => (
        <p
          className={
            actualCategory === category ? styles.active : styles.inactive
          }
          key={category}
          onClick={() => {
            setActualCategory(category);
          }}
        >
          {category}
        </p>
      ))}
      <AiOutlinePlus onClick={handleNewCategory} />
    </div>
  );
}
