import AuthRequest from "../AuthRequest.js";
import headers from "../data/headers.js";

/**
 * Fetches all the listings from the API using pages when sending requests. number of fetches depends on the number of pages available.
 * @param {boolean} [onlyActive=false] - Whether to fetch only active listings (false by default).
 * @param {number} [page=1] - The page number to fetch listings from.
 * @param {Array} [arr=[]] - The array to store the fetched listings.
 * @returns {Promise<Array>} - A promise that resolves to an array of fetched listings.
 */
export default async function fetchAllListings(
  onlyActive = false,
  page = 1,
  arr = [],
) {
  const request = new AuthRequest(
    "GET",
    headers(),
    `auction/listings?_seller=true&_bids=true&page=${page}`,
  );
  const [data, err] = await request.fetch();

  if (err) {
    console.error(err);
    return;
  }
  if (data) {
    arr = [...arr, ...data.data];
    if (!data.meta.isLastPage) {
      page++;
      return await fetchAllListings(onlyActive, page, arr);
    } else {
      onlyActive &&
        (arr = arr.filter((listing) => {
          const now = new Date().getTime();
          return new Date(listing.endsAt) > now;
        }));
      return arr;
    }
  }
}
