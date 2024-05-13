/**
 * Toggles the visibility of a container element when the provided element is clicked.
 * If clicked anywhere outside of the container while its open, the container will close.
 * @param {HTMLElement} ele - The element that triggers the container visibility toggle.
 * @param {HTMLElement} container - The container element whose visibility will be toggled.
 * @param {string} [display="block"] - The display value to be set when the container is visible.
 * @param {boolean} [clickInside=true] - Whether or not you should be able to click inside the container without closing it.
 * (clickInside can be good to set to false if all options the container should close when clicked, and you dont want to handle them individually)
 */
export default function (
  ele,
  container,
  clickInside = true,
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
