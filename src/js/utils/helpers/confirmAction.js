import createEle from "../element/createEle.js";
import storage from "../storage/index.js";
import errorMessage from "./errorMessage.js";

export default function confirmAction(
  request,
  endpoint,
  profilePage = false,
  text = false,
  btnText = false,
) {
  const container = createEle(
    "div",
    "fixed top-0 left-0 w-screen h-screen flex justify-center z-50  items-center  bg-white bg-opacity-5 backdrop-blur-sm ",
  );
  const content = createEle(
    "div",
    "bg-modalBg p-4 rounded-lg w-5/6 max-w-md border border-lighterPurple shadow-lg",
  );
  const message = createEle(
    "p",
    "text-center",
    text ? text : "Are you sure you want to delete this listing?",
  );

  const btnContainer = createEle("div", "flex gap-4  justify-center mt-4");

  const confirmBtn = createEle(
    "button",
    "w-32 py-2 bg-cta  rounded-full text-primary",
    btnText ? btnText : "Delete",
  );

  const cancelBtn = createEle(
    "button",
    "w-32 py-2  rounded-full border border-purple-100 ",
    "Cancel",
  );

  btnContainer.append(confirmBtn, cancelBtn);
  content.append(message, btnContainer);
  container.append(content);

  cancelBtn.addEventListener("click", () => {
    container.remove();
  });

  confirmBtn.addEventListener("click", async () => {
    if (request) {
      const data = endpoint ? await request(endpoint) : await request();

      if (data) {
        if (profilePage) {
          storage.save("successMessage", "Listing successfully deleted");
          window.location.href = "/profile/";
        }

        return data;
      } else {
        errorMessage("An error occurred. Please try again later.");
      }
    }
    container.remove();
  });

  document.body.append(container);
}
