const modalContainer = document.getElementById("modal-container");
const modalHeader = document.getElementById("modal-header");
const modalContent = document.getElementById("modal-content");

/**
 * Object representing a modal toggle.
 * @namespace
 * @name modalToggle
 */
const modalToggle = {
  /**
   * Opens the modal.
   */
  open: function () {
    modalContainer.classList.remove("hidden");
    modalContainer.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  },
  /**
   * Closes the modal.
   */
  close: function () {
    modalContainer.classList.remove("flex");
    modalContainer.classList.add("hidden");
    modalContent.innerHTML = "";
    modalHeader.innerHTML = "";
    document.body.classList.remove("overflow-hidden");
  },
};

export default modalToggle;
