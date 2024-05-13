import "/src/css/input.css";

import modalToggle from "../../components/modal/handler/toggleModal.js";
import header from "../../components/header/index.js";
import storage from "../../utils/storage/index.js";
import successMessage from "../../utils/helpers/successMessage.js";
successMessage;

const modalClose = document.getElementById("modal-close");
/**
 *
 * @name init
 * init - Initializes the page.
 * Runs functions and components that are needed on all pages on page load.
 * @module updates/init
 */
export default function init() {
  const data = header();
  modalClose.addEventListener("click", modalToggle.close);
  const message = storage.load("successMessage");
  if (message) {
    successMessage(message);
    storage.remove("successMessage");
  }

  return data;
}
