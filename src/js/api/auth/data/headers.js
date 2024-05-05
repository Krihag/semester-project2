import storage from "../../../utils/storage/index.js";
import config from "../../config.js";

/**
 * Generates the headers object for API requests.
 * @param {boolean} [contentType=true] - Determines whether to include the "Content-Type" in headers (true by default).
 * @returns {Object} - The headers object.
 */
export default function headers(contentType = true) {
  const token = storage.load("token");

  if (!contentType) {
    return {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": config.API_KEY,
    };
  } else if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": config.API_KEY,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
}
