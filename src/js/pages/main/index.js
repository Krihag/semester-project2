import init from "../../updates/init/index.js";
import parallax from "./parallax.js";
import fetchAllListings from "../../api/auth/advancedRequests/fetchAllListings.js";
import lazyLoadListings from "../../utils/helpers/listings/lazyLoadListings.js";
import sortBy from "../../utils/helpers/listings/sortBy.js";

const container = document.getElementById("listings-container");
const sortByEle = document.getElementById("sort-listings");

init();
const filteredListings = await fetchAllListings(true);

const sortedListings = filteredListings.sort(
  (a, b) => new Date(a.endsAt) - new Date(b.endsAt),
);

console.log(filteredListings);

lazyLoadListings(sortedListings, container);
sortBy(filteredListings, sortByEle, container);

parallax();
