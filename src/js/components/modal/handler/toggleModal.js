const modalContainer = document.getElementById("modal-container");
const modalHeader = document.getElementById("modal-header");
const modalContent = document.getElementById("modal-content");
const modalMain = document.getElementById("modal-main");

/**
 * @description
 * This module is responsible for toggling the modal (open/close).
 * @namespace
 * @name modalToggle
 */
const modalToggle = {
  /**
   * Opens the modal.
   */
  open: function (clickOutsideClose = false) {
    modalContainer.classList.remove("hidden");
    modalContainer.classList.add("flex");
    document.body.classList.add("overflow-hidden");

    if (clickOutsideClose) {
      const clickOutside = (e) => {
        if (modalMain.contains(e.target)) return;
        modalContainer.removeEventListener("click", clickOutside);
        modalToggle.close();
      };
      modalContainer.addEventListener("click", clickOutside);
    }
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
