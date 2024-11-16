import { FetchWrapper } from "./fetchWrapper.js";
import { showAlert } from "../requests.js";

export class DeleteWrapper {
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
