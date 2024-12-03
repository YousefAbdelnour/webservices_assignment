import { PostWrapper } from "./modules/postWrapper.js";
import { GetWrapper } from "./modules/getWrapper.js";
import { DeleteWrapper } from "./modules/deleteWrapper.js";

/**
 * Toggles the visibility of forms based on the selected action.
 * Displays the appropriate form for creating, deleting, or reading data.
 */
function toggleForm() {
  const action = document.getElementById("action").value;
  document.getElementById("get-results").classList.add("d-none");

  const createForm = document.getElementById("create-form");
  const deleteForm = document.getElementById("delete-form");
  const collectionResource1Form = document.getElementById("countries-form");
  const collectionResource2Form = document.getElementById("updates-form");
  const subresourceForm = document.getElementById("games-per-country-form");
  const searchLeaguesForm = document.getElementById("search-leagues-form");

  createForm.classList.add("hidden");
  deleteForm.classList.add("hidden");
  collectionResource1Form.classList.add("hidden");
  collectionResource2Form.classList.add("hidden");
  subresourceForm.classList.add("hidden");
  searchLeaguesForm.classList.add("hidden");

  if (action === "create") {
    createForm.classList.remove("hidden");
  } else if (action === "delete") {
    deleteForm.classList.remove("hidden");
  } else if (action === "read-countries") {
    collectionResource1Form.classList.remove("hidden");
  } else if (action === "read-updates") {
    collectionResource2Form.classList.remove("hidden");
  } else if (action === "read-games-per-country") {
    subresourceForm.classList.remove("hidden");
  } else if (action === "search-leagues") {
    searchLeaguesForm.classList.remove("hidden");
  }
}

/**
 * Listens for changes in the "action" dropdown and triggers the toggleForm function.
 */
document.getElementById("action").addEventListener("change", toggleForm);

/**
 * Handles form submission for creating a new update.
 * Sends the form data to the PostWrapper for processing.
 */
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const updateData = {
    Limited_Time_Event: document.getElementById("Limited_Time_Event").value,
    Game_Id: document.getElementById("Game_Id").value,
    Date: document.getElementById("Date").value,
    Description: document.getElementById("Description").value,
    Version_Number: document.getElementById("Version_Number").value,
    Update_Size: document.getElementById("Update_Size").value,
    New_Features: document.getElementById("New_Features").value,
  };
  const postWrapper = new PostWrapper();
  const data = postWrapper.postUpdate(updateData);
});

/**
 * Handles form submission for deleting an update.
 * Sends the update ID to the DeleteWrapper for deletion.
 */
document.getElementById("delete-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const updateId = {
    id: document.getElementById("Update_ID").value,
  };
  const deleteWrapper = new DeleteWrapper();
  deleteWrapper.deleteUpdate(updateId);
});

/**
 * Handles form submission for fetching countries based on filter criteria.
 * Sends the request to the GetWrapper to fetch countries based on the provided filters.
 */
document
  .getElementById("countries-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const baseUri = "http://localhost/vgames-api/countries";
    const params = [];

    const languageFilter = document.getElementById("language-filter").value;
    if (languageFilter) {
      params.push(`language=${encodeURIComponent(languageFilter)}`);
    }

    const minAge = document.getElementById("min-age").value;
    if (minAge) {
      params.push(`min_age=${encodeURIComponent(minAge)}`);
    }

    const maxAge = document.getElementById("max-age").value;
    if (maxAge) {
      params.push(`max_age=${encodeURIComponent(maxAge)}`);
    }

    const uri = `${baseUri}?${params.join("&")}`;
    const getWrapper = new GetWrapper();
    getWrapper.getCountries(uri);
  });

/**
 * Handles form submission for fetching updates based on filter criteria.
 * Sends the request to the GetWrapper to fetch updates based on the provided filters.
 */
document
  .getElementById("updates-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const baseUri = "http://localhost/vgames-api/updates";
    const params = [];

    const description = document.getElementById("update-description").value;
    if (description) {
      params.push(`description=${encodeURIComponent(description)}`);
    }

    const minSize = document.getElementById("min-update-size").value;
    if (minSize) {
      params.push(`min_size=${encodeURIComponent(minSize)}`);
    }

    const maxSize = document.getElementById("max-update-size").value;
    if (maxSize) {
      params.push(`max_size=${encodeURIComponent(maxSize)}`);
    }

    const uri = `${baseUri}?${params.join("&")}`;
    const getWrapper = new GetWrapper();
    getWrapper.getUpdates(uri);
  });

/**
 * Handles form submission for fetching games related to a specific country.
 * Sends the request to the GetWrapper to fetch games for the selected country.
 */
document
  .getElementById("games-per-country-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const baseUri = "http://localhost/vgames-api/countries";
    const countryName = document.getElementById("country-name").value;
    const uri = `${baseUri}/${encodeURIComponent(countryName)}/games?`;
    const getWrapper = new GetWrapper();
    getWrapper.getGamesPerCountry(uri);
  });

/**
 * Handles form submission for searching leagues based on sport and country.
 * Sends the request to the GetWrapper to fetch teams in leagues based on search parameters.
 */
document
  .getElementById("search-leagues-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const sport = document.getElementById("sport").value;
    const country = document.getElementById("country").value;
    if (!sport && !country) {
      showAlert(
        "Please enter either a sport or a country to search leagues.",
        "warning"
      );
      return;
    }
    const baseUri =
      "https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php";
    const params = [];

    if (sport) {
      params.push(`s=${encodeURIComponent(sport)}`);
    }

    if (country) {
      params.push(`c=${encodeURIComponent(country)}`);
    }

    const uri = `${baseUri}?${params.join("&")}`;
    const getWrapper = new GetWrapper();
    getWrapper.getTeamsInaLeague(uri);
  });

/**
 * Shows an alert message to the user for a given type (success, warning, etc.).
 * The alert will be shown in the designated alert container and removed after 5 seconds.
 * @param {string} message - The message to display in the alert.
 * @param {string} type - The type of alert (e.g., "success", "warning").
 */
export function showAlert(message, type) {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.classList.remove("d-none");
  alertPlaceholder.append(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, 5000);
}

/**
 * Validates the minimum and maximum age and size inputs to ensure that the minimum is not greater than the maximum.
 */
document.getElementById("min-age").addEventListener("input", validateMinMax);
document.getElementById("max-age").addEventListener("input", validateMinMax);
document
  .getElementById("min-update-size")
  .addEventListener("input", validateMinMax);
document
  .getElementById("max-update-size")
  .addEventListener("input", validateMinMax);

/**
 * Validates that the minimum values for age and size are not greater than the maximum values.
 * If invalid, custom validation messages are displayed.
 */
function validateMinMax() {
  const minAge = document.getElementById("min-age");
  const maxAge = document.getElementById("max-age");

  if (minAge && maxAge && minAge.value && maxAge.value) {
    if (parseFloat(minAge.value) > parseFloat(maxAge.value)) {
      minAge.setCustomValidity(
        "Minimum age cannot be higher than maximum age."
      );
      maxAge.setCustomValidity("Maximum age cannot be lower than minimum age.");
    } else {
      minAge.setCustomValidity("");
      maxAge.setCustomValidity("");
    }
  }

  const minSize = document.getElementById("min-update-size");
  const maxSize = document.getElementById("max-update-size");

  if (minSize && maxSize && minSize.value && maxSize.value) {
    if (parseFloat(minSize.value) > parseFloat(maxSize.value)) {
      minSize.setCustomValidity(
        "Minimum size cannot be higher than maximum size."
      );
      maxSize.setCustomValidity(
        "Maximum size cannot be lower than minimum size."
      );
    } else {
      minSize.setCustomValidity("");
      maxSize.setCustomValidity("");
    }
  }
}
