import modalToggle from "../../components/modal/handler/toggleModal.js";
import successMessage from "../../utils/helpers/successMessage.js";

export default function userAvatar(url) {
  modalToggle.close();
  successMessage("Avatar updated successfully");

  document.querySelector("#user-avatar").src = url;
  document.querySelector("#header-avatar").src = url;
}
