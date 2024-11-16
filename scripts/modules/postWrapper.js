import { FetchWrapper } from "./fetchWrapper.js";
import { showAlert } from "../requests.js";

export class PostWrapper {
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
