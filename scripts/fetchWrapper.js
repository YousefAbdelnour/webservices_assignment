async function fetchWrapper(uri, options = {}) {
  try {
    const response = await fetch(uri, options);

    if (!response.ok) {
      throw new Error(
        "Request failed: " + response.status + " " + response.statusText
      );
    }

    if (response.headers.get("content-type")?.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      console.log(response);
      throw new Error("Response is not in JSON format");
    }
  } catch (error) {
    console.error("Error: ", error.message);
    throw error;
  }
}
