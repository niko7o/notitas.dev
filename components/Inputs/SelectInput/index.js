import styles from "./SelectInput.module.scss";

const SelectInputElement = ({ nodeRef, categories }) => (
  <select ref={nodeRef} className={styles.select}>
    {categories.map((category) => (
      <option value={category} key={category}>
        {category}
      </option>
    ))}
  </select>
);

export default SelectInputElement;
