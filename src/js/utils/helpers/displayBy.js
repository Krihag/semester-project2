import ifActive from "./listings/ifActive.js";
import thumbnail from "../../components/listing/thumbnail/index.js";
import createEle from "../element/createEle.js";
/**
 * Displays listings based on the selected button value.
 *
 * @param {Object} data - The data object containing listings and name.
 * @param {HTMLElement} btn - The button element that triggered the display.
 * @param {HTMLElement} container - The container element to display the listings.
 * @returns {void}
 */
export default function displayBy(data, btn, container) {
  if (btn.dataset.value === 0)
    return createEle("p", "text-center text-lg mt-4", "No listings found");
  if (btn.textContent.includes("Ongoing")) {
    data.listings.forEach((listing) => {
      listing.seller = { name: data.name };
      ifActive(listing.endsAt) && container.appendChild(thumbnail(listing));
    });
  } else if (btn.textContent.includes("Won")) {
    data.wins.forEach((listing) => {
      // Cant find the seller property or the bids (for price) in the data object (since its from profile)
      // Temporary solution, will try to find a better way (without having to fetch a specific listing data for each of them)
      listing.seller = { name: "user" };
      !ifActive(listing.endsAt) && container.appendChild(thumbnail(listing));
    });
  } else if (btn.textContent.includes("Ended")) {
    data.listings.forEach((listing) => {
      listing.seller = { name: data.name };

      console.log(listing);
      !ifActive(listing.endsAt) && container.appendChild(thumbnail(listing));
    });
  }
}
