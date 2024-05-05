import createEle from "../../utils/element/createEle.js";

export default function inputLabel(ele) {
  const container = createEle(
    "div",
    "flex flex-col gap-2 mt-2 w-full max-w-full ",
  );
  const label = createEle("label", false, ele.text);
  label.for = ele.name;

  const input = createEle(
    "input",
    "rounded-full bg-purple-100 text-primary py-2 px-4 w-full max-w-full outline-none text-primary text-sm",
  );
  input.name = ele.name;
  input.type = ele.type;
  container.append(label);

  input.required && input.setAttribute("required", true);
  ele.inputText && (input.value = ele.inputText);
  ele.placeholder && (input.placeholder = ele.placeholder);
  ele.value && (input.value = ele.value);

  if (ele.btn) {
    const inputContainer = createEle(
      "div",
      "flex items-center gap-2 w-full max-w-full",
    );
    const btn = createEle(
      "button",
      "bg-secondary py-1 px-4 rounded-md shadow-md border border-pink-400 hover:bg-pink-400 hover:text-secondary duration-700 ",
      ele.btnText ? ele.btnText : "Add",
    );
    btn.type = "click";
    inputContainer.append(input, btn);
    container.append(inputContainer);
  } else container.append(input);

  return container;
}
