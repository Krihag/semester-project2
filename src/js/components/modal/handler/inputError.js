import createEle from "../../../utils/element/createEle.js";

export default function inputError(
  form,
  inputName,
  message = "* Cannot be empty",
) {
  const input = form.elements[inputName];
  if (input && input.value.trim() === "") {
    const allreadyError = input.parentNode.querySelector(".error-display");
    if (allreadyError) allreadyError.remove();

    const error = createEle(
      "div",
      "text-red-500 text-sm error-display",
      message,
    );
    input.parentNode.appendChild(error);
    setTimeout(() => error.remove(), 7000);
    return error;
  }
  return false;
}
