import AuthRequest from "../AuthRequest.js";
import headers from "../data/headers.js";

export default async function postRequest(body, endpoint = "auth/login") {
  return new AuthRequest("POST", headers(), endpoint, body);
}
