// takes in listings data and returns a search bar element
const searchInput = document.getElementsById("search-input");
export default function searchbar() {
  searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value;
    const listings = document.querySelectorAll(".listing");
    listings.forEach((listing) => {
      const title = listing.querySelector(".listing-title").textContent;
      if (title.toLowerCase().includes(searchValue.toLowerCase())) {
        listing.style.display = "block";
      } else {
        listing.style.display = "none";
      }
    });
  });
}
