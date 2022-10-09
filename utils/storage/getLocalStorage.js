import { errorTriguer } from "../../utils/errorTriguer";
export const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log(error);
    errorTriguer();
  }
};
