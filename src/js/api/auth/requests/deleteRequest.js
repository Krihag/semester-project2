import AuthRequest from "../AuthRequest.js";
import headers from "../data/headers.js";

export default async function deleteRequest(endpoint) {
  const request = new AuthRequest("DELETE", headers(), endpoint);
  const [data, err] = await request.fetch();

  if (data) {
    return data;
  } else {
    console.error(err);
    return null;
  }
}
