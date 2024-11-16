export class ParseWrapper {
  constructor() {
    document.getElementById("countries-body").innerHTML = ``;
    document.getElementById("updates-body").innerHTML = ``;
    document.getElementById("games-body").innerHTML = ``;
    document.getElementById("dev-body").innerHTML = ``;
    document.getElementById("genre-body").innerHTML = ``;
    document.getElementById("league-body").innerHTML = ``;

    document.getElementById("countries-container").classList.add("d-none");
    document.getElementById("updates-container").classList.add("d-none");
    document.getElementById("games-container").classList.add("d-none");
    document.getElementById("devs-container").classList.add("d-none");
    document.getElementById("genres-container").classList.add("d-none");
    document.getElementById("leagues-container").classList.add("d-none");
  }

  parseUpdates(updates) {
    const body = document.getElementById("updates-body");
    body.innerHTML = "";

    updates.forEach((update) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${update.Update_Id}</td>
      <td>${update.Limited_Time_Event}</td>
      <td>${update.Game_Id}</td>
      <td>${update.Date}</td>
      <td>${update.Description}</td>
      <td>${update.Version_Number}</td>
      <td>${update.Update_Size}</td>
      <td>${update.New_Features}</td>
      `;
      body.appendChild(row);
    });

    document.getElementById("updates-container").classList.remove("d-none");
    document.getElementById("get-results").classList.remove("d-none");
  }
  parseCountries(countries) {
    const body = document.getElementById("countries-body");
    body.innerHTML = "";

    countries.forEach((country) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${country.Country_Name}</td>
      <td>${country.Most_Played_Game_Id}</td>
      <td>${country.Development_Companies}</td>
      <td>${country.Most_Popular_Genre}</td>
      <td>${country.Average_Age}</td>
      <td>${country.Average_Internet_Speed}</td>
      <td>${country.Language}</td>
      `;
      body.appendChild(row);
    });

    document.getElementById("countries-container").classList.remove("d-none");
    document.getElementById("get-results").classList.remove("d-none");
  }
  parseGames(games) {
    const body = document.getElementById("games-body");
    body.innerHTML = "";

    games.forEach((game) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${game.Game_Id}</td>
      <td>${game.Developer_Id}</td>
      <td>${game.Genre_Name}</td>
      <td>${game.Name}</td>
      <td>${game.Founder}</td>
      <td>${game.Release_Date}</td>
      <td>${game.Country_Name}</td>
      <td>${game.ESRB}</td>
      <td>${game.Price}</td>
      <td>${game.Number_Of_Players}</td>
      `;
      this.parseDev(game.developer);
      this.parseGenre(game.genre);
      body.appendChild(row);
    });

    document.getElementById("games-table").classList.remove("d-none");
    document.getElementById("get-results").classList.remove("d-none");
  }
  parseDev(dev) {
    const body = document.getElementById("dev-body");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${dev.Dev_Id}</td>
    <td>${dev.Dev_Name}</td>
    <td>${dev.Founder}</td>
    <td>${dev.Headquarters}</td>
    <td>${dev.Type}</td>
    <td>${dev.Parent}</td>
    <td>${dev.Prog_Lang}</td>
    <td>${dev.Number_Games_Made}</td>
    <td>${dev.Founded_Date}</td>
    <td>${dev.Number_Of_Employees}</td>
    `;
    body.appendChild(row);
    document.getElementById("devs-container").classList.remove("d-none");
  }
  parseGenre(genre) {
    const body = document.getElementById("genre-body");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${genre.Genre_Name}</td>
    <td>${genre.Description}</td>
    <td>${genre.Popularity_Score}</td>
    <td>${genre.Target_Audience}</td>
    <td>${genre.Average_Rating}</td>
    <td>${genre.Average_Game_Length}</td>
    `;
    body.appendChild(row);
    document.getElementById("genres-container").classList.remove("d-none");
  }
  parseLeagues(leagues) {
    const body = document.getElementById("league-body");
    body.innerHTML = "";

    leagues.forEach((league) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${league.idLeague}</td>
      <td>${league.dateFirstEvent}</td>
      <td>${league.intFormedYear}</td>
      <td>${league.strCountry}</td>
      <td>${league.strSport}</td>
      <td>${league.strGender}</td>
      <td>${league.strLeague}</td>
      <td>${league.strCurrentSeason}</td>
      <td>${league.strDescriptionEN}</td>
      <td>${league.strFacebook}</td>
      <td>
        <img src="${league.strLogo}" height = 50/>
      </td>
      `;
      body.appendChild(row);
    });

    document.getElementById("leagues-container").classList.remove("d-none");
    document.getElementById("get-results").classList.remove("d-none");
  }
}