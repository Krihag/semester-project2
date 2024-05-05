import thumbnail from "../../components/listing/thumbnail/index.js";
import modalToggle from "../../components/modal/handler/toggleModal.js";
import storage from "../../utils/storage/index.js";
import successMessage from "../../utils/helpers/successMessage.js";

/**
 * Closes modal and displays the new listing if your on index page
 * If its on profile page, it reloads the page.
 * else it just closes modal
 * @param {Object} data - The data of the new listing.
 */
export default function addNewListing(data) {
  console.log(data);

  const newListing = thumbnail(data);

  let listingsContainer;

  if (window.location.pathname === "/profile/") {
    storage.save("successMessage", "Listing successfully created");
    window.location.reload();
  }

  if (window.location.pathname === "/" || window.location.pathname === "") {
    listingsContainer = document.getElementById("listings-container");

    const allListings = Array.from(listingsContainer.children);

    const index = allListings.findIndex(
      (listing) => new Date(listing.dataset.endsAt) > new Date(data.endsAt),
    );
    console.log(index);

    if (index === -1) {
      listingsContainer.appendChild(newListing);
    } else {
      listingsContainer.insertBefore(newListing, allListings[index]);
    }
  }

  successMessage("Listing successfully created");

  modalToggle.close();
}
