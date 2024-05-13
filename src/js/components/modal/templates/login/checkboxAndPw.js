import createEle from "../../../../utils/element/createEle.js";

export default function checkboxAndPw() {
  const container = createEle(
    "div",
    "w-full flex justify-between items-center mb-4",
  );
  const checkbox = createEle("div", "flex gap-2 items-center justify-between");
  const checkboxLabel = createEle("label", " ", "Remember me");
  const checkboxInput = createEle(
    "input",
    "form-checkbox h-5 w-5 text-puple-100",
  );
  checkboxInput.type = "checkbox";

  checkbox.append(checkboxInput, checkboxLabel);

  const forgotPw = createEle("div", "text-right text-gray-400 text-sm");
  const forgotPwLink = createEle("a", "text-pink-200", "Forgot password?");
  forgotPwLink.href = "#";
  forgotPw.append(forgotPwLink);

  container.append(checkbox, forgotPw);
  return container;
}
