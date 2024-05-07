import header from "../../components/header/index.js";
import bidsAndPrice from "../../components/listing/full/bidsAndPrice.js";
import getListing from "../../api/auth/requests/getListings.js";
import successMessage from "../../utils/helpers/successMessage.js";

/**
 * Fetches a specific listings data (based on the id in URL) and updates the DOM with the bids and price information.
 * ment only for the listing page.
 * @returns {Promise<void>} A promise that resolves when the DOM is updated.
 */
export default async function bidsAndCredits() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");

  console.log(id);

  const listingData = await getListing("/" + id);
  header();
  const data = listingData.data;

  document.getElementById("bids-and-price").remove();
  document.getElementById("listing-container").appendChild(bidsAndPrice(data));
  successMessage("Bid added");
}
