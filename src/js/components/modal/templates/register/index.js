import button from "../../../elements/button.js";
import inputLabel from "../../../elements/inputLabel.js";
import form from "../../../elements/form.js";
import modal from "../../index.js";
import registerListen from "../../../../api/events/eventListeners/auth/register.js";
import loginLink from "./loginLink.js";
import cancelBtn from "../../../elements/cancelBtn.js";
import avatar from "./avatar.js";

export default function registerModal() {
  const name = inputLabel({
    text: "Name",
    name: "name",
    type: "text",
    required: true,
  });

  const userAvatar = avatar();
  const email = inputLabel({
    text: "Email",
    name: "email",
    type: "email",
    required: true,
    pattern: "[\\w\\-.]+@(stud\\.)?noroff\\.no$",
  });

  const password = inputLabel({
    text: "Password",
    name: "password",
    type: "password",
    required: true,
  });

  const passwordConfirm = inputLabel({
    text: "Confirm password",
    name: "passwordConfirm",
    type: "password",
  });
  const cancel = cancelBtn();

  const submit = button({
    text: "Register",
  });

  submit.classList.add("mt-4");

  const linkToLogin = loginLink();

  // const linkToLogin = regLink();

  const newForm = form({ name: "register", listen: registerListen });
  newForm.append(
    name,
    userAvatar,
    email,
    password,
    passwordConfirm,

    submit,
    cancel,
    linkToLogin,
  );

  modal({
    ele: newForm,
    title: "Register new user",
  });
}
