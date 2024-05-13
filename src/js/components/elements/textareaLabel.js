import createEle from "../../utils/element/createEle.js";

export default function textareaLabel(ele) {
  const container = createEle("div", "flex flex-col gap-2  w-full max-w-full");
  const label = createEle("label", false, ele.text);
  label.for = ele.name;

  const textarea = createEle(
    "textarea",
    "rounded-md text-primary py-2 px-4 w-full max-w-full h-32 bg-purple-100 outline-none",
  );
  textarea.name = ele.name;

  container.append(label);

  textarea.required && textarea.setAttribute("required", true);
  ele.inputText && (textarea.value = ele.inputText);
  ele.placeholder && (textarea.placeholder = ele.placeholder);
  ele.value && (textarea.value = ele.value);

  container.append(textarea);

  return container;
}
