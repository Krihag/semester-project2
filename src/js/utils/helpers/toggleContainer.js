/**
 * Toggles the visibility of a container element when the provided element is clicked.
 * @param {HTMLElement} ele - The element that triggers the container visibility toggle.
 * @param {HTMLElement} container - The container element whose visibility will be toggled.
 * @param {string} [display="block"] - The display value to be set when the container is visible.
 * @param {boolean} [clickInside=false] - Set to false by default (container closes if clicked inside it or anywhere else on the page).
 * If changed to true clicking inside container will  not close it anymore (will stil close if clicked outside of this).
 */
export default function (
  ele,
  container,
  clickInside = false,
  display = "block",
) {
  function showContainer(e) {
    e.stopPropagation();
    container.classList.remove("hidden");
    container.classList.add(display);

    ele.removeEventListener("click", showContainer);

    function hideContainer(event) {
      if (clickInside && container.contains(event.target)) return;
      container.classList.add("hidden");
      document.removeEventListener("click", hideContainer);
      ele.addEventListener("click", showContainer);
    }

    document.addEventListener("click", hideContainer);
  }
  ele.addEventListener("click", showContainer);
}
