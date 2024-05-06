import init from "../../updates/init/index.js";
import parallax from "./parallax.js";
import fetchAllListings from "../../api/auth/advancedRequests/fetchAllListings.js";
import lazyLoadListings from "../../utils/helpers/listings/lazyLoadListings.js";
import sortBy from "../../utils/helpers/listings/sortBy.js";
import searchbar from "../../utils/helpers/searchbar/index.js";

// console.log(import.meta.env.VITE_API_KEY);
const container = document.getElementById("listings-container");
const sortByEle = document.getElementById("sort-listings");
const backToTop = document.getElementById("back-top-btn");

init();
const filteredListings = await fetchAllListings(true);

const sortedListings = filteredListings.sort(
  (a, b) => new Date(a.endsAt) - new Date(b.endsAt),
);

lazyLoadListings(sortedListings, container);
sortBy(filteredListings, sortByEle, container);

parallax();

searchbar(sortedListings);

console.log(window.scrollY);

window.addEventListener("scroll", () => {
  if (window.scrollY > 1500) {
    backToTop.classList.remove("hidden");
    backToTop.classList.add("flex");
  } else {
    backToTop.classList.add("hidden");
    backToTop.classList.remove("flex");
  }
});
