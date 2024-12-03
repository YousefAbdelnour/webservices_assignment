/**
 * Class for handling HTTP requests with customizable options.
 */
export class FetchWrapper {
  /**
   * Sends an HTTP request using the Fetch API.
   * @param {string} uri - The URI of the resource to request.
   * @param {Object} [options={}] - Additional request options.
   * @param {string} [options.method="GET"] - The HTTP method to use (e.g., "GET", "POST", "DELETE").
   * @param {Object} [options.headers] - Headers to include in the request.
   * @param {string} [options.cache="no-cache"] - The cache mode for the request.
   * @returns {Promise<Object>} A promise that resolves to the JSON-parsed response data.
   * @throws {RequestFailedException} If the response status is not OK.
   * @example
   * const options = {
   *   method: "GET",
   *   headers: {
   *     "Content-Type": "application/json",
   *     Accept: "application/json",
   *   },
   * };
   * const fetchWrapper = new FetchWrapper();
   * const data = fetchWrapper.sendRequest("http://localhost/vgames-api/updates?page=1&page_size=10", options)
   * console.log(data)
   */
  async sendRequest(uri, options = {}) {
    const defaultOptions = {
      method: "GET",
      cache: "no-cache",
    };
    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };
    try {
      const response = await fetch(uri, requestOptions);
      if (!response.ok) {
        const errorInfo = await response.json();
        throw new RequestFailedException(
          `Request failed with status ${response.status}`,
          response.status,
          errorInfo
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Error during fetch operation:", error);
      throw error;
    }
  }
}

/**
 * Custom error class for handling failed requests.
 */
export class RequestFailedException extends Error {
  /**
   * @param {string} message - The error message.
   * @param {number} code - The HTTP status code of the failed request.
   * @param {Object} details - Additional details about the error.
   */
  constructor(message, code, details) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
  }
}
