import config from "../config.js";

/**
 * Represents authentication requests made to the Noroff Auction House API.
 */
export default class AuthRequest {
  /**
   * Creates an instance of AuthRequest.
   * @param {string} method - The HTTP method for the request.
   * @param {Object} headers - The headers for the request.
   * @param {string} endpoint - The endpoint for the request.
   * @param {Object|null} [body=null] - The body of the request (optional).
   *
   **/
  constructor(method, headers, endpoint, body = null) {
    this.method = method;
    this.headers = headers;
    this.endpoint = endpoint;
    this.body = body;

    console.log(this.endpoint);
    console.log(this.body);
  }

  /**
   * Fetches data from the specified endpoint.
   * @param {string} [endpoint=this.endpoint] - The endpoint to fetch data from (optional). Uses the instance endpoint if not provided.
   * @returns {Promise<Array>} - A promise that resolves to an array containing the fetched data and any error that occurred.
   */
  async fetch(endpoint = this.endpoint) {
    if (!endpoint) throw new Error("Missing endpoint");

    const url = `${config.BASE_URL}/${endpoint}`;
    console.log(url);
    try {
      const response = await fetch(url, {
        method: this.method,
        headers: this.headers,
        body: this.body ? JSON.stringify(this.body) : null,
      });

      if (response.status === 204) {
        return [response, null];
      }
      if (!response.ok) {
        const data = await response.json();

        if (data.errors) {
          return [null, data.errors[0].message];
        }

        throw new Error(data);
      }

      const data = await response.json();

      return [data, null];
    } catch (err) {
      console.error(err);
      return [null, err];
    }
  }
}
