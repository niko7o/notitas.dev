import { errorTriguer } from "../../utils/errorTriguer";
export const updateLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
    errorTriguer();
  }
};
