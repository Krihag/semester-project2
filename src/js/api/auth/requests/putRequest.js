import headers from "../data/headers.js";
import AuthRequest from "../AuthRequest.js";

export default async function putRequest(endpoint, body = null) {
  return new AuthRequest("PUT", headers(), endpoint, body);
}
