import { FetchWrapper } from "./fetchWrapper.js";
import { showAlert } from "../requests.js";
import { ParseWrapper } from "./parsingWrapper.js";

export class GetWrapper {
  async getUpdates(uri) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const fetchWrapper = new FetchWrapper();
      const data = await fetchWrapper.sendRequest(uri, options);
      showAlert("Updates Successfully Fetched!", "success");
      const parseWrapper = new ParseWrapper();
      parseWrapper.parseUpdates(data.updates.data);
    } catch (error) {
      showAlert(error.message, "danger");
    }
  }

  async getCountries(uri) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const fetchWrapper = new FetchWrapper();
      const data = await fetchWrapper.sendRequest(uri, options);
      showAlert("Countries Successfully Fetched!", "success");
      const parseWrapper = new ParseWrapper();
      parseWrapper.parseCountries(data.countries.data);
    } catch (error) {
      showAlert(error.message, "danger");
    }
  }

  async getGamesPerCountry(uri) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const fetchWrapper = new FetchWrapper();
      const data = await fetchWrapper.sendRequest(uri, options);
      showAlert("Games Successfully Fetched!", "success");
      const parseWrapper = new ParseWrapper();
      parseWrapper.parseCountries([data.country]);

      parseWrapper.parseGames(data.country.games.data);
    } catch (error) {
      showAlert(error.message, "danger");
    }
  }

  async getTeamsInaLeague(uri) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const fetchWrapper = new FetchWrapper();
      const data = await fetchWrapper.sendRequest(uri, options);
      showAlert("Teams Successfully Fetched!", "success");
      const parseWrapper = new ParseWrapper();
      console.log(data);
      
      parseWrapper.parseLeagues(data.countries);
    } catch (error) {
      showAlert(error.message, "danger");
    }
  }
}
