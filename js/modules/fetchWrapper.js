export class FetchWrapper {
  async initiateRequest(uri) {
    return fetch(uri)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
