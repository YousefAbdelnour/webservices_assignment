async function getUpdates(uri) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const updates = await fetchWrapper(uri, options);
    showAlert("Updates Successfully Fetched!", "success");
    return updates;
  } catch (error) {
    showAlert(error.message, "danger");
  }
}

async function getCountries(uri) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const countries = await fetchWrapper(uri, options);
    showAlert("Countries Successfully Fetched!", "success");
    return countries;
  } catch (error) {
    showAlert(error.message, "danger");
  }
}

async function getGamesPerCountry(uri) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const games = await fetchWrapper(uri, options);
    showAlert("Games Successfully Fetched!", "success");
    return games;
  } catch (error) {
    showAlert(error.message, "danger");
  }
}

async function getTeamsInaLeague(uri) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const teams = await fetchWrapper(uri, options);
    showAlert("Teams Successfully Fetched!", "success");
    return teams;
  } catch (error) {
    showAlert(error.message, "danger");
  }
}
