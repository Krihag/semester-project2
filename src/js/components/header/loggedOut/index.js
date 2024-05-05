import createEle from "../../../utils/element/createEle.js";
import loginModal from "../../modal/templates/login/index.js";
import registerModal from "../../modal/templates/register/index.js";

export default function loggedOut(container) {
  const homeContainer = createEle(
    "a",
    "flex text-lg items-center gap-5 lg:gap-12 p-1 lg:hidden",
  );
  const homeIcon = createEle("i", "fas fa-home lg:hidden");
  const home = createEle("span", false, "Home");
  homeContainer.href = "/";
  homeContainer.append(homeIcon, home);

  const loginContainer = createEle(
    "a",
    "flex items-center text-lg gap-4 p-1 cursor-pointer lg:px-8  lg:mt-0 lg:order-5 lg:bg-cta lg:text-primary lg:rounded-full",
  );

  const loginIcon = createEle("i", "fas fa-sign-in-alt lg:hidden");
  const login = createEle("span", false, "Login");

  loginContainer.append(loginIcon, login);

  const registerContainer = createEle(
    "a",
    "flex items-center text-lg gap-4 p-1 cursor-pointer lg:px-8  lg:mt-0 lg:order-5 lg:border lg:rounded-full lg:border-purple-100",
  );

  const registerIcon = createEle("i", "fas fa-user-plus lg:hidden");
  const register = createEle("span", null, "Register");

  registerContainer.append(registerIcon, register);

  container.append(homeContainer, loginContainer, registerContainer);

  login.addEventListener("click", loginModal);
  register.addEventListener("click", registerModal);

  return null;
}
