import { PostWrapper } from "./modules/postWrapper.js";
import { GetWrapper } from "./modules/getWrapper.js";
import { DeleteWrapper } from "./modules/deleteWrapper.js";

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

document.getElementById("action").addEventListener("change", toggleForm);

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

document.getElementById("delete-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const updateId = {
    id: document.getElementById("Update_ID").value,
  };
  const deleteWrapper = new DeleteWrapper();
  deleteWrapper.deleteUpdate(updateId);
});

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
document.getElementById("min-age").addEventListener("input", validateMinMax);
document.getElementById("max-age").addEventListener("input", validateMinMax);
document
  .getElementById("min-update-size")
  .addEventListener("input", validateMinMax);
document
  .getElementById("max-update-size")
  .addEventListener("input", validateMinMax);

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
