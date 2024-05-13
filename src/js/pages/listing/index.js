import init from "../../updates/init/index.js";
import getListing from "../../api/auth/requests/getListings.js";
import fullListing from "../../components/listing/full/index.js";

init();

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

if (!id) {
  window.location.href = "/";
}

const data = await getListing("/" + id);

const listing = data.data;

fullListing(listing);
