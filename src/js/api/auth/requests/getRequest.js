import AuthRequest from "../AuthRequest.js";
import headers from "../data/headers.js";

export default async function getRequest(endpoint) {
  const request = new AuthRequest("GET", headers(), endpoint);

  const [data, err] = await request.fetch();

  if (data) {
    return data;
  } else {
    console.error(err);
    return null;
  }
}
