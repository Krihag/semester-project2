import modalToggle from "./handler/toggleModal.js";

/**
 * Opens a modal with the provided data.
 * provided data will usually be from "templates" and are using the "elements" to create the modal.
 * @module modal
 * @param {Object} data - The data for the modal.
 * @param {string} data.title - The title of the modal.
 * @param {HTMLElement} data.ele - The element to be appended to the modal body.
 */
export default function modal(data, clickOutsideClose = false) {
  const title = document.getElementById("modal-header");
  title.textContent = data.title ? data.title : "";
  const modalBody = document.getElementById("modal-content");
  modalBody.append(data.ele);
  modalToggle.open(clickOutsideClose);
}
