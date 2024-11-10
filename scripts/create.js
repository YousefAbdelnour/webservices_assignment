async function postUpdate(update_object) {
  try {
    const uri = "http://localhost/vgames-api/updates";
    const options = {
      method: "POST",
      body: JSON.stringify(update_object),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetchWrapper(uri, options);
    showAlert("Update Successfully Created!", "success");
  } catch (error) {
    showAlert(error.message, "danger");
  }
}
