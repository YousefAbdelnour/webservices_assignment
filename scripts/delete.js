async function deleteUpdate(id) {
  try {
    const uri = "http://localhost/vgames-api/updates";
    const options = {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetchWrapper(uri, options);
    showAlert("Update Successfully Deleted!", "success");
  } catch (error) {
    showAlert("Failure: " + error.message, "danger");
  }
}
