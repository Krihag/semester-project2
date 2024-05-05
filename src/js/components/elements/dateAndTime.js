import createEle from "../../utils/element/createEle.js";

export default function dateAndTime(ele) {
  const container = createEle("div", "flex flex-col  pb-4");

  const inputLabel = createEle("label", "", "Ending time");
  const date = createEle(
    "input",
    "w-full bg-purple-100 font-semibold text-primary text-sm rounded-full px-2 py-2.5 my-2 text-center outline-none",
  );

  const now = new Date();
  const oneWeek = new Date(now.setDate(now.getDate() + 7));
  console.log(oneWeek);
  date.type = "datetime-local";
  date.placeholder = "Enter date";
  date.id = "date";
  date.value = ele?.value
    ? new Date(ele?.value).toISOString().substring(0, 16)
    : oneWeek.toISOString().substring(0, 16);
  date.name = "date";
  date.required = true;

  container.append(inputLabel, date);

  return container;
}
