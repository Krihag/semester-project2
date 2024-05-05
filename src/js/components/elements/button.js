import createEle from "../../utils/element/createEle.js";

export default function button(ele) {
  const btn = createEle(
    "button",
    "bg-cta text-primary py-2 px-4 shadow-md rounded-full my-1    ",
    ele.text,
  );
  btn.type = ele.type ? ele.type : "submit";

  btn.type === "submit" ? (btn.id = "submit") : null;

  return btn;
}
