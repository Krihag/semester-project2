import AuthRequest from "../AuthRequest.js";
import headers from "../data/headers.js";

export default async function getListings(
  id = "",
  endpoint = `auction/listings${id}?_seller=true&_bids=true`,
) {
  const request = new AuthRequest("GET", headers(), endpoint);

  const [data, err] = await request.fetch();
  if (data) {
    return data;
  } else {
    console.error(err);
    return null;
  }
}
