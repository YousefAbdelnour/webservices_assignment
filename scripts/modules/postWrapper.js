import { FetchWrapper } from "./fetchWrapper.js";
import { showAlert } from "../requests.js";

/**
 * Class representing a wrapper for posting updates.
 */
export class PostWrapper {
  /**
   * Sends a POST request to create a new update.
   * @param {Object} update_object - The update data to be sent to the server.
   * @returns {Promise<Object|undefined>} A promise that resolves to the server's response data if successful, or undefined if an error occurs.
   * @throws Will show an alert with an error message if the request fails.
   * @example
   * const updateData = {
   * Limited_Time_Event: 0,
   * Game_Id: 1,
   * Date: 2024-12-02,
   * Description: "Game Update",
   * Version_Number: "1.1f",
   * Update_Size: 12,
   * New_Features: "bug fixes, balancing",
   * };
   * const postWrapper = new PostWrapper();
   * const data = postWrapper.postUpdate(updateData);
   */
  async postUpdate(update_object) {
    try {
      const uri = "http://localhost/vgames-api/updates";
      const options = {
        method: "POST",
        body: JSON.stringify(update_object),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const fetchWrapper = new FetchWrapper();
      const data = await fetchWrapper.sendRequest(uri, options);
      showAlert("Update Successfully Created!", "success");
      return data;
    } catch (error) {
      showAlert(error.message, "danger");
    }
  }
}
