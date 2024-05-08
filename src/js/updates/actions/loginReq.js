import modalToggle from "../../components/modal/handler/toggleModal.js";
import header from "../../components/header/index.js";
import successMessage from "../../utils/helpers/successMessage.js";

export default function loginReq() {
  header();
  modalToggle.close();
  successMessage("Logged in");
}
