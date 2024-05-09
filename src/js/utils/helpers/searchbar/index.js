// takes in listings data and returns a search bar element
import lazyLoadListings from "../listings/lazyLoadListings.js";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const container = document.getElementById("listings-container");
const searchText = document.getElementById("search-text");
const seeAllBtn = document.getElementById("all-listings-btn");

export default function searchbar(listings) {
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchValue = searchInput.value;
    if (searchValue === "") return;
    search(searchValue, listings);
  });

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const searchValue = searchInput.value;
      if (searchValue === "") return;
      search(searchValue, listings);
    }
  });

  seeAllBtn.addEventListener("click", () => {
    lazyLoadListings(listings, container);
    searchText.textContent = "All listings";
    seeAllBtn.classList.add("hidden");
    seeAllBtn.classList.remove("flex");
  });
}

function search(searchValue, listings, result = []) {
  searchText.innerHTML = "";
  listings.forEach(
    (listing) =>
      listing.title.toLowerCase().includes(searchValue.toLowerCase()) &&
      result.push(listing),
  );

  seeAllBtn.classList.remove("hidden");
  seeAllBtn.classList.add("flex");
  console.log(seeAllBtn);

  searchText.textContent = `Search results for "${searchValue}" gave ${result.length} results.`;
  lazyLoadListings(result, container);
  searchInput.value = "";
}
