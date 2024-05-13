import createEle from "../element/createEle.js";

export default function successMessage(message) {
  const container = createEle(
    "div",
    "fixed top-0 left-0 w-screen h-screen flex justify-center z-50  items-center bg-black bg-opacity-20",
  );

  const success = createEle(
    "div",
    "fixed  bg-green-200 text-green-950 border border-green-950 rounded-md text-xl   text-center py-2 px-4   ",
    message,
  );

  const icon = createEle("i", "fa-solid fa-check text-2xl ml-2");
  success.append(icon);

  container.append(success);
  document.body.append(container);
  setTimeout(() => {
    container.remove();
  }, 3000);
}
