import createEle from "../../utils/element/createEle.js";

export default function addTags(ele) {
  const container = createEle("div", "flex flex-col gap-2 py-2");

  const label = createEle("label", "", "Tags");
  const inputBtnContainer = createEle("div", "flex gap-2 text-primary");

  const addBtn = createEle(
    "button",
    "bg-cta rounded-full text-primary px-4 py-2 ",
    "Add",
  );
  const input = createEle(
    "input",
    "bg-purple-100 rounded-full py-2 px-4 outline-none w-full",
  );

  inputBtnContainer.append(input, addBtn);

  const tagsContainer = createEle("div", "flex flex-wrap gap-2 mt-1");
  ele.id && (tagsContainer.id = ele.id);
  container.append(label, inputBtnContainer, tagsContainer);
  addBtn.type = "button";
  addBtn.addEventListener("click", () => {
    if (input.value) {
      const tagWithClose = createEle(
        "div",
        "flex justify-center gap-3 items-center relative border rounded-full px-3 ",
      );
      const tag = createEle(
        "div",
        " text-white  py-1  relative create-tag ",
        `#${input.value}`,
      );

      const tagClose = createEle("i", " fa-solid fa-xmark ");

      tagClose.addEventListener("click", () => {
        tagWithClose.remove();
      });
      tagWithClose.append(tag, tagClose);

      tagsContainer.append(tagWithClose);
      input.value = "";
    }
  });

  if (Array.isArray(ele.tags)) {
    ele.tags.forEach((tagValue) => {
      const tagWithClose = createEle(
        "div",
        "flex justify-center gap-3 items-center relative border rounded-full px-3 ",
      );
      const tag = createEle(
        "div",
        " text-white  py-1  relative create-tag ",
        `#${tagValue}`,
      );

      const tagClose = createEle("i", " fa-solid fa-xmark ");

      tagClose.addEventListener("click", () => {
        tagWithClose.remove();
      });
      tagWithClose.append(tag, tagClose);

      tagsContainer.append(tagWithClose);
    });
  }

  return container;
}
