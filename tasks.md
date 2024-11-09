# Project Checklist: Implementing a JavaScript-Based HTTP Client

## OVERVIEW

This assignment involves creating a web-based client application that consumes a REST web service. The application will use HTML5 and Bootstrap to enable users to interact with web resources via Fetch API requests. Users should be able to input required data and trigger requests, with responses rendered in HTML after processing.

---

## Part I: Fetch API Wrapper

**Goal:** Create a reusable function for making HTTP requests using the Fetch API with enhanced error handling and response parsing.

### Define fetchWrapper

- [ ] **1.1**: Create a `fetchWrapper.js` file in the `scripts/` directory.
- [ ] **1.2**: Define `fetchWrapper(uri, options)` with two parameters:
  - **1.2.1**: `uri` (string) - The URI to send the request to.
  - **1.2.2**: `options` (object) - Request configurations (e.g., method, headers, body).
- [ ] **1.3**: Implement error handling:
  - **1.3.1**: Check response status (200-299). If outside this range, throw an error with the status and status text.
  - **1.3.2**: Catch network errors (e.g., unreachable URL) and throw an appropriate error message.
- [ ] **1.4**: Ensure the wrapper returns a Promise that resolves to parsed JSON if the response type is `application/json`.

---

## Part II: Create and Delete Operations

**Goal:** Create HTML forms and JavaScript functions to enable users to add and remove resources from the collection.

### HTML UI for Create and Delete

- [ ] **2.1**: Create an HTML form in `index.html` for creating resources:
  - **2.1.1**: Include input fields for the required data.
  - **2.1.2**: Add a submit button to trigger a POST request.
- [ ] **2.2**: Create an HTML form for deleting resources:
  - **2.2.1**: Include an input field for Resource ID.
  - **2.2.2**: Add a submit button to trigger a DELETE request.

### JavaScript Functions for Create and Delete

- [ ] **2.3**: Implement `postResource()` in `scripts/create.js`:
  - **2.3.1**: Validate input data before making the request.
  - **2.3.2**: Use `fetchWrapper` to send a POST request in JSON format.
  - **2.3.3**: Display success/error messages using Bootstrap alerts.
- [ ] **2.4**: Implement `deleteResource()` in `scripts/delete.js`:
  - **2.4.1**: Validate the Resource ID.
  - **2.4.2**: Use `fetchWrapper` to send a DELETE request.
  - **2.4.3**: Display success/error messages using Bootstrap alerts.

---

## Part III: Read Operations

**Goal:** Create interfaces and functions for fetching and displaying data from local and remote resources with filters.

### HTML UI for Read Operations

- [ ] **3.1**: Create forms in `index.html` for each read operation:
  - **3.1.1**: `/collection_resource_1` - Include three filter fields.
  - **3.1.2**: `/collection_resource_2` - Include three filter fields.
  - **3.1.3**: `/resource/{resource_id}/subresource` - Input field for Resource ID.
  - **3.1.4**: `https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php` - Include filter inputs for `s` (sport) and `c` (country).

### JavaScript Functions for Read Operations

- [ ] **3.2**: Create functions for each read operation:
  - **3.2.1**: `getCollection1()` - Fetch data using `fetchWrapper` and filter inputs.
  - **3.2.2**: `getCollection2()` - Fetch data using `fetchWrapper` and filter inputs.
  - **3.2.3**: `getSubresource()` - Fetch data using `fetchWrapper` and Resource ID input.
  - **3.2.4**: `getSportsData()` - Fetch data from TheSportsDB API using sport and country filters.
- [ ] **3.3**: Parse and display the fetched JSON data in HTML (tables, lists, etc.).
- [ ] **3.4**: Validate all input filters to ensure correct data is being requested.

---

## Part IV: Client-Side Pagination

**Goal:** Implement client-side pagination for large collections.

### Pagination UI

- [ ] **4.1**: Add pagination controls (buttons or links) under the data display area for local resources.

### Pagination Logic

- [ ] **4.2**: Implement pagination logic in each collection function:
  - **4.2.1**: Parse pagination metadata from the response.
  - **4.2.2**: Display items per page and handle page navigation.
  - **4.2.3**: Update the displayed content when users navigate between pages.

---

## Additional Requirements

**Goal:** Implement robust UI, error handling, and code structure.

### User Interface Controls

- [ ] **5.1**: Ensure UI controls for each HTTP operation (GET, POST, DELETE) are present.
- [ ] **5.2**: Display fetched data in a user-friendly format (e.g., tables or lists).
- [ ] **5.3**: Implement Bootstrap alerts for success and error messages:
  - **5.3.1**: Alerts styled as `alert-danger` (errors) or `alert-success` (success).
  - **5.3.2**: Alerts initially hidden (using `d-none` class), displayed only as needed.
  - **5.3.3**: Clear and concise error messages.
  - **5.3.4**: Display success messages for POST and DELETE actions.

### Input Validation and Error Handling

- [ ] **6.1**: Validate all input fields before sending any request.
- [ ] **6.2**: Use `try-catch` blocks in each fetch function to manage errors.
- [ ] **6.3**: Handle all errors gracefully, with appropriate messages displayed to the client.

### Code Organization and Documentation

- [ ] **7.1**: Separate functions into distinct files and modules (e.g., `getPlayers()`, `renderPlayers()`, `postPlayer()`).
- [ ] **7.2**: Use `async` and `await` instead of `.then()` for fetch requests.
- [ ] **7.3**: Comment code using JSDoc, explaining each function’s purpose.
- [ ] **7.4**: Ensure JSON data is parsed and rendered on the client side.

### Testing and Validation

- [ ] **8.1**: Test each operation with various input sets, both valid and invalid.
- [ ] **8.2**: Verify that UI functions work as expected for each request.
- [ ] **8.3**: Confirm pagination and data rendering are accurate for read operations.
- [ ] **8.4**: Simulate network errors and invalid responses to test error handling.
