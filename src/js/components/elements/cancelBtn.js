import createEle from "../../utils/element/createEle.js";
import modalToggle from "../modal/handler/toggleModal.js";
import storage from "../../utils/storage/index.js";

export default function cancelBtn(ele) {
  const btn = createEle(
    "button",
    " bg-purple-200 text-primary px-4 py-2 border rounded-full ",
    ele?.text ? ele.text : "Cancel",
  );

  btn.type = "button";

  btn.addEventListener("click", async () => {
    const response = ele?.onClick && (await ele.onClick(ele.endpoint));
    modalToggle.close();
    if (ele?.delete && response?.ok) {
      storage.save("successMessage", "Listing successfully deleted");

      // User relocated to profile page after deleting a listing successfully.
      window.location.href = "/profile";
    }
  });

  return btn;
}
