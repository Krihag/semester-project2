import getListings from "../../api/auth/requests/getListings.js";
import pageLoad from "../../updates/init/index.js";
import thumbnail from "../../components/listing/thumbnail/index.js";

const data = await getListings();
pageLoad();
console.log("test");
const listings = data.data;
const now = new Date().getTime();
const filteredListings = listings.filter(
  (listing) => new Date(listing.endsAt) > now,
);

console.log(new Date());

const sortedListings = filteredListings.sort(
  (a, b) => new Date(a.endsAt) - new Date(b.endsAt),
);

console.log(sortedListings);

const container = document.getElementById("listings-container");

sortedListings.forEach((listing) => {
  container.appendChild(thumbnail(listing));
});
