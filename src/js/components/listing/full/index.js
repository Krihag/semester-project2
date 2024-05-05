import countdown from "../../../utils/helpers/listings/countdown.js";
import listingMedia from "./listingMedia.js";
import details from "./details.js";
import bidsAndPrice from "./bidsAndPrice.js";
import storage from "../../../utils/storage/index.js";
import createEle from "../../../utils/element/createEle.js";

/**
 * Renders a specific full listing with the provided data.
 * @param {Object} data - The data object containing information about the listing.
 */
export default function fullListing(data) {
  const profile = storage.load("profile");
  const isOwner = profile?.name === data.seller.name;

  const listingContainer = document.getElementById("listing-container");
  listingContainer.innerHTML = "";

  const container = createEle(
    "div",
    " sm:flex  sm:justify-between gap-8 sm:gap-4 lg:gap-10 ",
  );
  countdown(data);

  container.appendChild(listingMedia(data));
  container.appendChild(details(data, isOwner));
  listingContainer.append(container);
  listingContainer.appendChild(bidsAndPrice(data));
}
