import createEle from "../../utils/element/createEle.js";

export default function form(ele) {
  const newForm = createEle("form", "flex flex-col gap-2 w-full max-w-lg");
  ele.name && (newForm.id = `${ele.name}-form`);

  ele.listen && ele.listen(newForm, ele.endpoint ? ele.endpoint : null);

  return newForm;
}
