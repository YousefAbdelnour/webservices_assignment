// async function fetchWrapper(uri, options = {}) {
//   try {
//     const response = await fetch(uri, options);

//     if (!response.ok) {
//       throw new Error(
//         "Request failed: " + response.status + " " + response.statusText
//       );
//     }

//     if (response.headers.get("content-type")?.includes("application/json")) {
//       const data = await response.json();
//       return data;
//     } else {
//       console.log(response);
//       throw new Error("Response is not in JSON format");
//     }
//   } catch (error) {
//     console.error("Error: ", error.message);
//     throw error;
//   }
// }

export class FetchWrapper {
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
export class RequestFailedException extends Error {
  constructor(message, code, details) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
  }
}
