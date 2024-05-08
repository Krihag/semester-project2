import lazyLoadListings from "./lazyLoadListings.js";

/**
 * Sorts the listings based on the selected choice and updates the container with the sorted listings.
 *
 * @param {Array} listings - The array of listings to be sorted.
 * @param {HTMLElement} ele - The HTML element representing the select input.
 * @param {HTMLElement} container - The HTML element representing the container to update with the sorted listings.
 */
export default function sortBy(listings, ele, container) {
  ele.addEventListener("change", (e) => {
    const choice = e.target.value;

    const filteredListings = sortListings(listings, choice);
    console.log(filteredListings);
    lazyLoadListings(filteredListings, container);
  });
}

/**
 * Sorts the given array of listings based on the specified choice.
 *
 * @param {Array} listings - The array of listings to be sorted.
 * @param {string} choice - The sorting choice. Possible values are:
 *   - "ending-soon": Sorts the listings based on the end date in descending order.
 *   - "order": Sorts the listings alphabetically by title in ascending order.
 *   - "reverse": Sorts the listings alphabetically by title in descending order.
 *   - "new-listings": Sorts the listings based on the creation date in descending order.
 *   - "highest-price": Sorts the listings based on the highest bid amount in descending order.
 * @returns {Array} - The sorted array of listings.
 */
function sortListings(listings, choice) {
  switch (choice) {
    case "ending-soon":
      return listings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
    case "order":
      return listings.sort((a, b) => a.title.localeCompare(b.title));
    case "reverse":
      return listings.sort((a, b) => b.title.localeCompare(a.title));
    case "new-listings":
      return listings.sort((a, b) => new Date(b.created) - new Date(a.created));
    case "highest-price":
      return listings.sort(
        (a, b) =>
          Number(b.bids.length > 0 ? b.bids[b.bids.length - 1].amount : 0) -
          Number(a.bids.length > 0 ? a.bids[a.bids.length - 1].amount : 0),
      );
    default:
      return listings;
  }
}
