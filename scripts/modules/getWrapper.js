import { FetchWrapper } from "./fetchWrapper.js";
import { showAlert } from "../requests.js";
import { ParseWrapper } from "./parsingWrapper.js";

/**
 * Class responsible for handling API requests and passing the fetched data to the parsing functions.
 * It manages fetching data from various endpoints (updates, countries, games, teams) 
 * and displays the results using the ParseWrapper class.
 */
export class GetWrapper {
  
  /**
   * Fetches and displays update data from the provided URI.
   * It handles pagination and displays the updates in a table.
   * @param {string} uri - The endpoint URI to fetch the update data from.
   * @param {number} [page=1] - The page number for pagination (default is 1).
   * @param {number} [pageSize=2] - The number of items per page for pagination (default is 2).
   */
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

  /**
   * Fetches and displays country data from the provided URI.
   * It handles pagination and displays the countries in a table.
   * @param {string} uri - The endpoint URI to fetch the country data from.
   * @param {number} [page=1] - The page number for pagination (default is 1).
   * @param {number} [pageSize=2] - The number of items per page for pagination (default is 2).
   */
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

  /**
   * Fetches and displays game data for a specific country from the provided URI.
   * It handles pagination and displays the games and related country data.
   * @param {string} uri - The endpoint URI to fetch the game data from.
   * @param {number} [page=1] - The page number for pagination (default is 1).
   * @param {number} [pageSize=2] - The number of items per page for pagination (default is 2).
   */
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

  /**
   * Fetches and displays team data for a specific league from the provided URI.
   * @param {string} uri - The endpoint URI to fetch the league data from.
   */
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
