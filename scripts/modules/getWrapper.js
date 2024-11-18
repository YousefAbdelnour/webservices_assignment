import { FetchWrapper } from "./fetchWrapper.js";
import { showAlert } from "../requests.js";
import { ParseWrapper } from "./parsingWrapper.js";

export class GetWrapper {
  async getUpdates(uri, page = 1, pageSize = 2) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const fetchWrapper = new FetchWrapper();
      const data = await fetchWrapper.sendRequest(
        `${uri}page=${page}&page_size=${pageSize}`,
        options
      );
      const updatesMeta = data.updates.meta;
      const updatesData = data.updates.data;
      showAlert("Updates Successfully Fetched!", "success");
      const parseWrapper = new ParseWrapper();
      parseWrapper.parseUpdates(updatesData, updatesMeta, (newPage) =>
        this.getUpdates(uri, newPage, pageSize)
      );
    } catch (error) {
      showAlert(error.message, "danger");
    }
  }

  async getCountries(uri, page = 1, pageSize = 2) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const fetchWrapper = new FetchWrapper();
      const data = await fetchWrapper.sendRequest(
        `${uri}page=${page}&page_size=${pageSize}`,
        options
      );
      const countriesMeta = data.countries.meta;
      const countriesData = data.countries.data;
      showAlert("Countries Successfully Fetched!", "success");
      const parseWrapper = new ParseWrapper();
      parseWrapper.parseCountries(countriesData, countriesMeta, (newPage) =>
        this.getCountries(uri, newPage, pageSize)
      );
    } catch (error) {
      showAlert(error.message, "danger");
    }
  }

  async getGamesPerCountry(uri, page = 1, pageSize = 2) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const fetchWrapper = new FetchWrapper();
      const data = await fetchWrapper.sendRequest(
        `${uri}page=${page}&page_size=${pageSize}`,
        options
      );
      showAlert("Games Successfully Fetched!", "success");
      const parseWrapper = new ParseWrapper();
      const countryData = [data.country];
      const gamesMeta = data.country.games.meta;
      const gamesData = data.country.games.data;
      parseWrapper.parseCountries(countryData);
      parseWrapper.parseGames(gamesData, gamesMeta, (newPage) =>
        this.getGamesPerCountry(uri, newPage, pageSize)
      );
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
      parseWrapper.parseLeagues(data.countries);
    } catch (error) {
      showAlert(error.message, "danger");
    }
  }
}
