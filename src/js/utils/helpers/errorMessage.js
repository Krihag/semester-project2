import createEle from "../element/createEle.js";

export default function errorMessage(message) {
  const container = createEle(
    "div",
    "fixed top-0 left-0 w-screen h-screen flex justify-center z-50  items-center bg-black bg-opacity-20",
  );

  const error = createEle(
    "div",
    "fixed  bg-red-200 text-red-950 border border-red-950 rounded-md text-lg md:text-xl   text-center min-h-20 px-4 flex gap-4 items-center",
    message,
  );

  const icon = createEle(
    "i",
    "fa-solid fa-circle-exclamation text-xl md:text-2xl py-1",
  );
  error.prepend(icon);

  container.append(error);
  document.body.append(container);
  setTimeout(() => {
    container.remove();
  }, 5000);
}
