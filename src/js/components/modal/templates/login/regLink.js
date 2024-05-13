import createEle from "../../../../utils/element/createEle.js";
import modalToggle from "../../handler/toggleModal.js";
import registerModal from "../register/index.js";

export default function regLink() {
  const linkText = createEle(
    "div",
    "mt-4 text-gray-400 text-end text-sm",
    "No account? ",
  );
  const regLink = createEle("button", "cursor-pointer", "Register here");

  regLink.addEventListener("click", () => {
    modalToggle.close();
    registerModal();
  });

  linkText.append(regLink);

  return linkText;
}

{
  /* <div class="mt-4 text-gray-400 text-end text-sm">
No account?
<button href="#" class="text-pink-200" type="click">
  Register here
</button>
</div> */
}
