# **Expense Tracker**

## **Overview**
This application is a full-stack web app that allows users Register a new account ,Sign in securely ,View and manage their expenses, and potentially visualize their spending through charts and Log out when done, and navigate through pages after authentication. It features a frontend built with **React** and communicates with a backend API to handle user authentication.

### **Architecture:**

-   **Frontend**: React (with Tailwind CSS for styling).
-   **Backend**: Node.js + Express.js (REST API).
-   **Authentication**: JWT (JSON Web Tokens) for handling user authentication and session management.
-   **State Management**: React's useState and useEffect for managing frontend state.
-   **Toast Notifications**: react-toastify for success/error messages.

---

## **Frontend Setup**

### **1\. Clone the Repository**
To begin, clone the project repository to your local machine.

```bash
git clone <repository_url>
cd <project_directory>
```

## 2. Install Dependencies

You will need Node.js and npm (Node Package Manager) installed on your machine. Run the following command to install the required packages:

```bash
npm install
```

## 3. Set Up Environment Variables

You may need to add environment variables in your `.env` file for the frontend. Some variables might include API URLs or keys.


## **Backend Setup**

### **1\. Clone the Repository**
To begin, clone the project repository to your local machine.

```bash
git clone <repository_url>
cd <project_directory>
```

## 2. Install Dependencies

You will need Node.js and npm (Node Package Manager) installed on your machine. Run the following command to install the required packages:

```bash
npm install
```

## 3. Set Up Environment Variables

Create a .env file in the root of the backend directory for sensitive data such as your JWT_SECRET, MongoDB URI, or any other environment-specific variables.


## **Running the Application**

After setting up both the frontend and backend, open two separate terminal windows.

In the **frontend** terminal, navigate to the frontend directory and run:

```bash
npm run dev
```

In the **backend** terminal, navigate to the backend directory and run:

```bash
npm run dev
```


# Frontend Application

## Overview

This frontend application is built with React and Tailwind CSS to provide user authentication (sign-up and sign-in) and access to protected routes. It communicates with a backend API for user management and authentication using JWT (JSON Web Tokens).

## Key Features

* **User Sign Up:** Allows new users to register with a username, email, and password.
* **User Sign In:** Enables existing users to log in with their email and password.
* **Protected Routes:** Secure areas of the application accessible only to authenticated users.
* **JWT Authentication:** Utilizes accessToken and refreshToken for secure session management.
* **Token Refresh:** Automatically renews the accessToken using the refreshToken upon expiry.
* **Form Handling:** Uses React's `useState` for managing form data.
* **State Management:** Leverages `useState` and `useEffect` hooks for component state and side effects.
* **API Communication:** Uses Axios for making HTTP requests to the backend API.
* **Routing:** Implements page navigation using React Router.
* **Toast Notifications:** Provides user feedback through non-blocking notifications using `react-toastify`.
* **Environment Configuration:** Uses `.env` file to manage configuration variables like the API URL.
* **Styling:** Styled with Tailwind CSS for a responsive and modern UI.

##  Application Flow

### 🚀 Startup

* The application initializes in `index.js`, where routes are defined using `react-router-dom`.
* Upon initial load, the user is redirected to `/home` (`App.jsx`), which serves as the landing page.
* The landing page provides navigation links to the **Sign In** and **Sign Up** pages.

### 👤 Sign Up Flow

* **Route:** `/home/signup`
* **Component:** `SignUp.jsx`
* The user enters their **username**, **email**, and **password**.
* Upon submission, the entered data is sent as a POST request to the backend API endpoint `/api/v1/users/register` using **Axios**.
* **On Success:**
    * A success toast notification is displayed to the user using `react-toastify`.
    * The user is redirected to `/home` (consider changing this to `/home/signin` for better user experience).

### 🔐 Sign In Flow

* **Route:** `/home/signin`
* **Component:** `SignIn.jsx`
* The user enters their **email** and **password**.
* Upon submission, the entered data is sent as a POST request to the backend API endpoint `/api/v1/users/login` using **Axios**.
* **On Success:**
    * The `accessToken` and `refreshToken` received from the backend are saved to the browser's `localStorage`.
    * The user is redirected to the authenticated dashboard at `/home/Page1`.

### 🏠 Page1 (Authenticated Dashboard)

* **Route:** `/home/Page1`
* **Component:** `Page1.jsx`
* This is the main dashboard where users can manage their expenses.
* **Key Features:**
    * **Navbar:** Includes a **Sign Out** button for logging out.
    * **Expense Display Section:** Renders the `<Expenses />` component to show the user's expenses.
    * **Informational Messages:** Displays relevant information or updates to the user.
    * **Newsletter Subscription:** A section for newsletter subscription, currently non-functional.
* **On Logout:**
    * A POST request is sent to the backend API endpoint `/api/v1/users/logout`.
    * The `accessToken` and `refreshToken` are cleared from `localStorage`.
    * The user is navigated back to the `/home` landing page.

### 📊 Chart Info

* **Route:** `/home/Page1/ChartInfo`
* **Component:** `ChartInfo.jsx`
* This route is intended for displaying chart-based visualizations of the user's spending. The specific implementation details are not included in the current code.

## 🧠 4. Key Technologies

| Tool             | Purpose                                      |
| :--------------- | :------------------------------------------- |
| **React** | Core UI framework                            |
| **React Router** | Client-side routing                          |
| **Axios** | HTTP requests to the backend API             |
| **react-toastify** | Toast notifications for user feedback        |
| **TailwindCSS** | Utility-first CSS framework for styling     |

## 🛡️ 5. Authentication Strategy

* **Upon Login:**
    * The `accessToken` and `refreshToken` are stored in the browser's `localStorage`. These tokens are likely used for authenticating subsequent requests to protected resources.
* **Protected Routes:**
    * Routes like `/home/Page1` are intended to be protected and should only be accessible to authenticated users. This is achieved by checking for the presence of tokens in `localStorage`.
* **Logout:**
    * The `accessToken` and `refreshToken` are removed from `localStorage`, effectively logging the user out on the client-side.
    * A request is also sent to the `/api/v1/users/logout` endpoint on the backend, which might perform additional server-side logout actions.
* **Further Enhancements:**
    * The application can be made more robust by implementing **route guards**. A `ProtectedRoute` component can wrap protected routes and handle authentication checks before allowing access. This would involve checking for token validity and potentially refreshing tokens if they are expired (using the `refreshToken`).

## Frontend Architecture

### Overview

The frontend is a React application styled with Tailwind CSS. It interacts with the backend API using HTTP requests for authentication and user management.

### Key Components

* Provides input fields for users to enter their **username**, **email**, and **password**.
* Submits the registration form data to the backend API endpoint `/api/v1/users/register` using Axios.
* Displays a success toast notification upon successful user registration.
* Redirects the user to the `/home` route (or potentially `/home/signin` based on user experience considerations).

### `SignIn.jsx`

**Route:** `/home/signin`

**Purpose:** Manages the user login process.

**Key Features:**

* Provides input fields for users to enter their **email** and **password**.
* Submits the login credentials to the backend API endpoint `/api/v1/users/login` using Axios.
* Upon successful login:
    * Stores the `accessToken` and `refreshToken` received from the backend in the browser's `localStorage`.
    * Redirects the authenticated user to the main dashboard page, `/home/Page1`.

### `Page1.jsx`

**Route:** `/home/Page1`

**Purpose:** Serves as the authenticated dashboard for the expense tracker application.

**Key Features:**

* Displays the user's list of expenses by rendering the `<Expenses />` component.
* Includes a navigation bar with a **Sign Out** button for logging out.
* Features a **Subscription** section, which is currently non-functional and intended for future implementation.
* Displays informational messages to the user, such as personalized greetings or relevant reminders.
* Implements the **Logout** functionality, which clears the stored `accessToken` and `refreshToken` from `localStorage` and redirects the user back to the `/home` page.

### `Expenses.jsx`

**Purpose:** Displays the list of expenses for the currently authenticated user.

**Key Features:**

* Fetches expense data from the backend API (specific endpoint not detailed here, but likely involves an authenticated request using Axios).
* Renders the fetched expense data in a user-friendly format, potentially as a list or a grid of individual expense entries.
* Provides options for users to **sort** and **filter** their expenses for better data management and analysis.
* This component is likely designed to be reusable and integrated within the main dashboard (`Page1.jsx`).

### `ChartInfo.jsx`

**Route:** `/home/Page1/ChartInfo`

**Purpose:** Intended to provide an optional chart-based visualization of the user's spending patterns.

**Key Features:**

* It will display visual representations of expense data, likely utilizing a charting library such as Chart.js or Recharts to create informative graphs and charts.

#### State Management

* React's built-in `useState` hook is used to manage the state of form inputs and loading indicators within components.
* `useEffect` hook is used for handling side effects, such as API calls and checking for the presence of tokens.
* The application determines if a user is logged in by checking for the existence of the `accessToken` in `localStorage`.

#### Services and API Calls

* Axios is used as the HTTP client to make requests to the backend API.
* **`SignUp`:** Sends user registration details to `/api/v1/users/register`.
* **`SignIn`:** Sends login credentials to `/api/v1/users/login`.
* **`Token Refresh`:** Sends the `refreshToken` to `/api/v1/users/refresh` to obtain a new `accessToken`.

#### Routing

* React Router is employed for client-side navigation between different pages of the application (e.g., `/sign-up`, `/sign-in`, `/home`).
* Redirection logic is implemented to guide users to protected routes after successful login and to the sign-in page when authentication is required.

#### Toast Notifications

* `react-toastify` is integrated to display user-friendly notifications for actions like successful registration, login failures, etc.

#### Environment Variables

* The `.env` file is used to store configuration variables, such as `API_URL`, which specifies the base URL of the backend API.

### Frontend API Requests

* **`POST /api/v1/users/register`:**
    * **Method:** `POST`
    * **Description:** Registers a new user by sending `username`, `email`, and `password` in the request body.
    * **Response:** Returns a success message upon successful registration.

* **`POST /api/v1/users/login`:**
    * **Method:** `POST`
    * **Description:** Authenticates a user by sending their `email` and `password` in the request body.
    * **Response:** On successful authentication, returns a JSON object containing `accessToken` and `refreshToken`.

* **`POST /api/v1/users/refresh`:**
    * **Method:** `POST`
    * **Description:** Refreshes an expired `accessToken`. Requires a valid `refreshToken` to be sent in the request body.
    * **Response:** Returns a new `accessToken`.

# React Authentication Frontend

This document outlines the key React components and the authentication flow implemented in the frontend of the application. It also provides guidance on troubleshooting common frontend issues related to authentication.

## Key React Components

### `SignIn.js`

* Manages the user login form with fields for email and password.
* Handles user input and form submission.
* Sends a `POST` request to the `/api/v1/users/login` endpoint with the entered credentials.
* Upon successful login:
    * Stores the received `accessToken` and `refreshToken` in `localStorage`.
    * Redirects the user to a protected route (e.g., `/home`).
* Uses `react-toastify` to display error messages if the login attempt fails.

### `SignUp.js`

* Provides a registration form with fields for username, email, and password.
* Manages user input and form submission.
* Sends a `POST` request to the `/api/v1/users/register` endpoint with the new user's details.
* Displays a success message using `react-toastify` upon successful registration.
* Potentially redirects the user to the sign-in page after successful registration.

### `App.js`

* Serves as the main entry point of the React application.
* Configures and uses `React Router` to define and manage application routes (e.g., `/sign-in`, `/sign-up`, `/home`).
* Implements logic to conditionally render protected routes based on the presence of a valid `accessToken` in `localStorage`.
* Sets up the `ToastContainer` from `react-toastify` to enable the display of notifications.

## Authentication Flow (Frontend)

### User visits the SignUp page:

1.  The user fills in the registration form with their username, email, and password.
2.  Upon form submission, a `POST` request is sent to the backend's `/api/v1/users/register` endpoint.

### User visits the SignIn page:

1.  The user enters their email and password in the login form.
2.  Upon successful submission and backend authentication, the frontend receives `accessToken` and `refreshToken`.
3.  These tokens are stored in the browser's `localStorage`.

### Authenticated Routes:

1.  When a user attempts to access a protected route, the frontend checks if an `accessToken` exists in `localStorage`.
2.  **If a valid token is found:** The user is allowed to proceed to the requested route.
3.  **If the token is missing or considered invalid** (e.g., expired without a valid refresh mechanism - *note: refresh token handling is not explicitly detailed in the provided information*): The user is redirected to the sign-in page to re-authenticate.

## Troubleshooting Frontend Issues

### API not reachable:

* **Verify `API_URL`:** Ensure that the `API_URL` in your `.env` file is correctly configured and points to the running backend API. Double-check for typos or incorrect port numbers.
* **Check Backend Status:** Confirm that the backend server is running and accessible from the frontend's network. You might need to check the backend logs or try accessing a public endpoint of the API directly from your browser or using tools like `curl` or Postman.

### JWT token not being set:

* **Inspect `SignIn.js`:** Review the `SignIn.js` component's code to confirm that the `accessToken` and `refreshToken` received in the response from the `/api/v1/users/login` endpoint are correctly being accessed and stored in `localStorage`. Pay attention to how the response data is parsed.
* **Check Network Tab:** Open your browser's developer tools (usually by pressing F12) and navigate to the "Network" tab. Submit the login form and inspect the details of the `/api/v1/users/login` request. Examine the "Response" tab to ensure that the `accessToken` and `refreshToken` are present in the response body.

### Page not loading properly:

* **Frontend Server Status:** Make sure you have started the frontend development server. This is typically done using commands like `npm start` or `yarn start` in your project's root directory. Check the terminal for any error messages during the server startup.
* **JavaScript Errors:** Open your browser's developer console (usually in the "Console" tab) for any JavaScript errors that might be occurring during the page load or component rendering. These errors can often provide clues about what is going wrong in your code.
* **React Router Configuration:** Verify that `React Router` is correctly set up in your `App.js` file. Ensure that you have imported the necessary components (`BrowserRouter`, `Route`, etc.) and that your routes are defined properly within a `<BrowserRouter>` component. Check for any typos in your route paths or component names.*



# Backend Application Flow and Architecture

This document outlines the application flow and architecture for the backend of our application, built with Node.js and Express.js, utilizing JWT for authentication and MongoDB for the database.

## Application Flow

1.  **User Signs Up:**
    * The user enters their username, email, and password on the sign-up page in the frontend.
    * The frontend sends a `POST` request to the backend API at `/api/v1/users/register` with the user's details in the request body.
    * The backend receives the request and:
        * Validates the user's input.
        * Checks if a user with the provided email already exists in the database.
        * If the user does not exist, the backend hashes the user's password using a secure hashing algorithm (e.g., bcrypt).
        * The user's details (username, email, and the hashed password) are saved in the MongoDB database using the `User` model.
        * The backend sends a success message back to the frontend (e.g., HTTP status code 201 Created).
        * The frontend then prompts the user to sign in.

2.  **User Signs In:**
    * The user enters their email and password on the sign-in page in the frontend.
    * The frontend sends a `POST` request to the backend API at `/api/v1/users/login` with the user's email and password in the request body.
    * The backend receives the request and:
        * Retrieves the user's record from the database based on the provided email.
        * Compares the entered password with the stored hashed password using the same hashing algorithm.
        * If the credentials are correct:
            * The backend generates a JSON Web Token (JWT) pair: an `accessToken` (short-lived) and a `refreshToken` (longer-lived). These tokens securely encode user information.
            * The tokens are sent back to the frontend in the response (e.g., as a JSON object).
            * The frontend stores these tokens, typically in `localStorage` or `sessionStorage`.
            * The user is redirected to a secure page or the application's home page.
        * If the credentials are incorrect, the backend returns an error message (e.g., HTTP status code 401 Unauthorized).

3.  **Authenticated Routes:**
    * After successful sign-in, the frontend retrieves the `accessToken` from storage.
    * For any subsequent request to protected API routes that require authentication, the frontend includes the `accessToken` in the `Authorization` header of the HTTP request, usually with the `Bearer` scheme (e.g., `Authorization: Bearer <accessToken>`).
    * The backend's authentication middleware intercepts these incoming requests.
    * The middleware checks for the presence and validity of the `accessToken`:
        * If the token is missing or invalid (e.g., expired, tampered with, or the signature doesn't match), the middleware rejects the request and returns an unauthorized error (e.g., HTTP status code 401 Unauthorized), potentially redirecting the user to the sign-in page on the frontend.
        * If the token is valid, the middleware typically extracts the user's identity from the token's payload and makes it available to the route handler (controller). This allows the backend to identify the user making the request and grant access to the protected resource.

4.  **Token Refresh:**
    * The `accessToken` has a limited lifespan for security reasons. When it expires, the frontend will no longer be able to access protected routes using the expired token.
    * To obtain a new `accessToken` without requiring the user to sign in again, the frontend sends a `POST` request to a dedicated refresh token endpoint (e.g., `/api/v1/users/refresh`) with the `refreshToken` (which has a longer expiry) in the request body (or sometimes as a cookie).
    * The backend receives this request and:
        * Verifies the validity of the `refreshToken`. This usually involves checking its signature and ensuring it hasn't expired or been revoked.
        * If the `refreshToken` is valid, the backend generates a new `accessToken` (and potentially a new `refreshToken`, although the latter is less common with every refresh).
        * The new `accessToken` (and possibly the new `refreshToken`) is sent back to the frontend in the response.
        * The frontend receives the new `accessToken` and replaces the expired one in its storage, allowing the user to continue accessing protected routes seamlessly.
        * If the `refreshToken` is invalid, the backend returns an unauthorized error (e.g., HTTP status code 401 Unauthorized), and the frontend typically redirects the user to the sign-in page, as their authentication can no longer be automatically renewed.

## Backend Architecture

### Overview

The backend is built using Node.js and the Express.js framework. It employs JSON Web Tokens (JWT) for secure user authentication and interacts with a MongoDB database for data persistence. The architecture is structured to separate concerns, making the codebase more maintainable and scalable.

### Key Components

* **Controllers:** These files (`/controllers`) handle incoming HTTP requests. They receive data from the request, interact with services to perform business logic, and then send responses back to the frontend.
    * `authController.js`: Specifically handles user authentication-related requests such as sign-up and sign-in.
    * `userController.js`: Manages other user-related operations, such as profile management (if implemented).

* **Models:** These files (`/models`) define the structure of the data in the MongoDB database using Mongoose. Each model corresponds to a collection in the database.
    * `userModel.js`: Defines the schema for the `User` collection, including fields like `username`, `email`, and the hashed `password`. Mongoose handles the interaction with MongoDB based on this schema.

* **Routes:** These files (`/routes`) define the API endpoints (URLs) that the backend exposes and map them to specific controller functions that will handle the requests to those endpoints.
    * `authRoutes.js`: Defines routes specifically for user authentication, such as `/api/v1/users/register`, `/api/v1/users/login`, and `/api/v1/users/refresh`.
    * `userRoutes.js`: Defines routes for accessing and managing user-specific data (e.g., `/api/v1/users/profile`), often protected by authentication middleware.

* **Middleware:** These functions (`/middleware`) are executed during the request-response cycle. They have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle.
    * `authMiddleware.js`: Contains middleware functions responsible for verifying the JWT `accessToken` present in the request headers. It extracts the token, verifies its signature and expiration, and potentially makes the authenticated user's information available to subsequent route handlers.
    * `errorHandlingMiddleware.js`: Catches errors that occur during request processing and formats them into consistent and informative error responses sent back to the frontend.

* **Services:** These files (`/services`) contain the core business logic of the application. They are typically called by controllers to perform tasks such as data validation, password hashing, JWT generation, and database interactions (often through the models). Separating business logic into services promotes reusability and testability.
    * `authService.js`: Handles authentication-related logic, including verifying user passwords, generating JWT `accessToken` and `refreshToken` pairs, and implementing the token refresh mechanism.
    * `userService.js`: Manages user-specific business logic, such as creating new users, updating user details, etc.

* **Configuration:** These files (`/config`) store configuration settings for the application, such as database connection details and the secret key used for signing JWT tokens.
    * `db.js`: Contains the code responsible for establishing a connection to the MongoDB database using Mongoose. It typically reads database connection URI from environment variables.
    * `config.js`: Stores configuration parameters, including the `JWT_SECRET` used to sign and verify JWT tokens, and potentially token expiration times. It's crucial to keep sensitive information like `JWT_SECRET` secure (e.g., using environment variables).

* **Database Setup:** The backend uses Mongoose, an Object Data Modeling (ODM) library for MongoDB, to interact with the database. Mongoose provides a higher-level abstraction for working with MongoDB, including schema definition, validation, and query building.

* **JWT Setup:** The backend utilizes a JWT library (e.g., `jsonwebtoken` in Node.js) to generate and verify JWT tokens. This involves:
    * Defining the token expiration times for both `accessToken` and `refreshToken`.
    * Using a secret key (`JWT_SECRET`) stored securely on the backend to sign the tokens. This signature ensures the integrity of the token and allows the backend to verify that it hasn't been tampered with.
    * Implementing logic in the `authService` and `authMiddleware` to generate new tokens upon successful login and to verify the authenticity and validity of incoming tokens.

* **`server.js`:** This is the entry point of the Node.js application. It typically initializes the Express.js server, sets up middleware, defines the base API routes, and starts listening for incoming requests on a specified port.

* **`.env`:** This file (not typically included in version control for security reasons) stores environment-specific variables, such as the database connection URI, the `JWT_SECRET`, and other configuration settings. These variables are loaded into the application's environment at runtime.

* **`package.json`:** This file contains metadata about the Node.js project, including its name, version, dependencies (the libraries and frameworks the project relies on), and scripts for running the application.

## Troubleshooting

Should you encounter any difficulties with the backend or frontend components, the following steps may assist in diagnosing the issue:

* **Console Logs:** Examine the console logs in both your web browser's developer tools (for frontend issues) and the server's terminal output (for backend issues). These logs often contain valuable error messages or debugging information.
* **Port Conflicts:** Ensure that both the frontend and backend applications are running on distinct network ports to avoid conflicts.
* **.env Configuration:** Verify that the `API URL` specified in the frontend's `.env` configuration file accurately matches the URL at which the backend server is currently running (e.g., `http://localhost:5000`).

## Additional Features

The following enhancements are considered for future development:

* **Password Reset:** Implementation of a feature allowing users to securely reset their forgotten passwords.
* **Social Authentication:** Integration of social login options, such as Google and Facebook, to streamline the authentication process.
* **Profile Management:** Development of user profile management capabilities, enabling users to update their email address, password, and other relevant information.
* **Session Expiry:** Enhanced handling of token expiry using refresh tokens, providing a seamless user experience by automatically refreshing access tokens as needed.
