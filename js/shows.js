async function fetchShows() {
  //   console.log("Fetching shows...");
  const uri = "http://localhost/vgames-api/updates";
  const results = await fetchData(uri);
  let html = "";
  // results.forEach((result) => {
    /*
        id
        averageRuntime
        ended
        genres (array)
        image.medium
        rating.average
        summary
        status
        officialSite
    */
    console.log(results);
  //   html += `
  //     <tr>
  //       <td>${result.id}</td>
  //       <td>${result.averageRuntime}</td>
  //       <td>${result.ended}</td>
  //       <td>${result.genres}</td>
  //       <td><img = src='${result.image.medium}'></td>
  //       <td>${result.rating.average}</td>
  //       <td>${result.summary}</td>
  //       <td>${result.status}</td>
  //       <td>${result.officialSite}</td>
  //     </tr>
  //     `;
  // });
  // document.getElementById("shows").innerHTML = html;
  // });
}

async function fetchData(uri, method_requested = "GET") {
    const options = new Request(uri, {
      method: method_requested,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  const response = await fetch(uri);

  if (!response.ok) {
    throw new Error(
      "Request failed: " + response.status + " " + response.statusText
    );
  }

  const data = await response.json();
    // console.log(response.text);
  return data;
}
