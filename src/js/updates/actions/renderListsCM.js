import getRequest from "../../api/auth/requests/getRequest.js";
import thumbnail from "../../components/listing/thumbnail/index.js";
import modalToggle from "../../components/modal/handler/toggleModal.js";

/**
 * Renders the listings in the specified container and closes the modal.
 * @param {HTMLElement} [container=false] - The container element where the posts will be rendered. If not provided, the default container with the id "listings-container" will be used.
 * if this container does not exist (and another is not provided), the function will not render the posts.
 * @returns {Promise<void>} - A promise that resolves when the posts are rendered.
 */
export default async function renderListsCM(container = false) {
  container = container
    ? container
    : document.getElementById("listings-container");

  const data = await getRequest("auction/listings");

  if (data) {
    if (container) {
      container.innerHTML = "";
      data.data.forEach((listing) => {
        container.appendChild(thumbnail(listing));
      });
    }

    modalToggle.close();
  }
}
