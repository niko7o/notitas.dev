import Swal from "sweetalert2";

export const errorTriguer = () => {
  return Swal.fire({
    title: "Oupss...",
    text: "It seems like something went wrong. Please try again later.",
    icon: "warning",
    confirmButtonText: "Cool",
  });
};
