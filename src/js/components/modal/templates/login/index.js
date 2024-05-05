import button from "../../../elements/button.js";
import inputLabel from "../../../elements/inputLabel.js";
import form from "../../../elements/form.js";
import modal from "../../index.js";
import regLink from "./regLink.js";
import checkboxAndPw from "./checkboxAndPw.js";
import loginListen from "../../../../api/events/eventListeners/auth/login.js";
import cancelBtn from "../../../elements/cancelBtn.js";

/**
 * displaying login form in a modal
 */
export default function login() {
  const email = inputLabel({
    text: "Email",
    name: "email",
    type: "email",
    required: true,
  });

  const password = inputLabel({
    text: "Password",
    name: "password",
    type: "password",
    required: true,
  });

  const checkAndPassword = checkboxAndPw();

  const cancel = cancelBtn();
  const submit = button({
    text: "Login",
  });

  const linkToReg = regLink();

  const newForm = form({
    name: "login",
    listen: loginListen,
  });
  newForm.append(email, password, checkAndPassword, submit, cancel, linkToReg);

  modal({
    ele: newForm,
    title: "Login to continue",
  });
}
