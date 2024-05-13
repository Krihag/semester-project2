import createEle from "../../../../utils/element/createEle.js";
import modalToggle from "../../handler/toggleModal.js";
import loginModal from "../login/index.js";

export default function loginLink() {
  const linkText = createEle(
    "div",
    "mt-4 text-gray-400 text-end text-sm",
    "Allready have an account? ",
  );
  const regLink = createEle("button", "cursor-pointer", "Login here");

  regLink.addEventListener("click", () => {
    modalToggle.close();
    loginModal();
  });

  linkText.append(regLink);

  return linkText;
}
