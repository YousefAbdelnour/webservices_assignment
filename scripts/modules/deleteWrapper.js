import { FetchWrapper } from "./fetchWrapper.js";
import { showAlert } from "../requests.js";

/**
 * Class representing a wrapper for deleting updates.
 */
export class DeleteWrapper {
  /**
   * Sends a DELETE request to delete an update by its ID.
   * @param {Object} id - An object containing the ID of the update to be deleted.
   * @param {number|string} id.id - The ID of the update to delete.
   * @returns {Promise<Object|undefined>} A promise that resolves to the server's response data if successful, or undefined if an error occurs.
   * @throws Will show an alert with an error message if the request fails.
   * @example
   * const updateId = { id: 1 };
   * const deleteWrapper = new DeleteWrapper();
   * deleteWrapper.deleteUpdate(updateId).then(response => {
   *   console.log(response);
   * });
   */
  async deleteUpdate(id) {
    try {
      const uri = "http://localhost/vgames-api/updates";
      const options = {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const fetchWrapper = new FetchWrapper();
      const data = await fetchWrapper.sendRequest(uri, options);
      showAlert("Update Successfully Deleted!", "success");
      return data;
    } catch (error) {
      showAlert(error.message, "danger");
    }
  }
}
