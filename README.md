# **My Application - Full Stack App (Frontend & Backend)**

## **Overview**
This application is a full-stack web app that allows users to **sign up**, **sign in**, and navigate through pages after authentication. It features a frontend built with **React** and communicates with a backend API to handle user authentication.

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


# Application Flow and File Structure

This document outlines the user authentication flow (sign-up and sign-in) and provides a high-level overview of the frontend file structure.

## User Authentication Flow

### User Signs Up:

1.  **User Input:** The user navigates to the sign-up page and enters their desired username, email address, and password.
2.  **Frontend Request:** Upon submitting the sign-up form, the frontend application sends an HTTP POST request to the backend API endpoint `/api/v1/users/register`. This request includes the user's provided username, email, and password in the request body (typically in JSON format).
3.  **Backend Processing:**
    * The backend receives the POST request at the `/api/v1/users/register` endpoint.
    * It processes the request by:
        * Validating the incoming data (e.g., checking for required fields, email format, password strength).
        * Ensuring the requested username or email is not already registered in the database.
        * Hashing the user's password securely before storing it in the database.
        * Creating a new user record in the database with the provided details (username, email, and the hashed password).
    * Upon successful user creation, the backend sends a success response back to the frontend. This response might include a simple success message or user details (excluding the password).
4.  **Redirection:** After receiving the successful response from the backend, the frontend typically prompts the user to sign in with their newly created credentials.

### User Signs In:

1.  **User Input:** The user navigates to the sign-in page and enters their registered email address and password.
2.  **Frontend Request:** Upon submitting the sign-in form, the frontend application sends an HTTP POST request to the backend API endpoint `/api/v1/users/login`. This request includes the user's entered email and password in the request body (usually in JSON format).
3.  **Backend Processing:**
    * The backend receives the POST request at the `/api/v1/users/login` endpoint.
    * It processes the request by:
        * Retrieving the user record from the database based on the provided email address.
        * Comparing the provided password with the hashed password stored in the database for that user.
        * If the credentials are valid (email and password match), the backend generates JSON Web Tokens (JWTs). This typically involves creating:
            * An **access token**: A short-lived token used to authenticate subsequent requests to protected resources.
            * A **refresh token**: A longer-lived token used to obtain a new access token without requiring the user to log in again.
        * The backend sends these JWT tokens back to the frontend in the HTTP response (often as JSON in the response body or as HTTP-only cookies).
4.  **Frontend Storage and Redirection:**
    * The frontend receives the JWT tokens from the backend.
    * It stores these tokens securely, commonly in `localStorage` of the browser.
    * Upon successful sign-in and token storage, the frontend redirects the user to the home page or another designated secure page within the application.

### Authenticated Routes:

1.  **Access Control:** When the user attempts to navigate to a route that requires authentication (a "secure route"), the frontend performs a check.
2.  **Token Existence Check:** The frontend examines `localStorage` to see if an `accessToken` exists.
3.  **Access Granted:** If an `accessToken` is found in `localStorage`, it indicates that the user has previously signed in and has a valid token. The frontend allows the user to access the requested secure route. The `accessToken` is typically included in the `Authorization` header (usually as a Bearer token) of subsequent HTTP requests to protected backend resources.
4.  **Redirection to Sign-in:** If no `accessToken` is found in `localStorage`, it means the user is not currently authenticated. In this case, the frontend redirects the user back to the sign-in page, prompting them to enter their credentials.

## File Structure

```bash
/frontend
│
├── /public                  # Public files (index.html, static assets)
│
├── /src                     # Source files
│   ├── /components          # Reusable UI elements (e.g., SignIn.js, SignUp.js, Navbar.js, Button.js)
│   ├── /contexts            # Global state management using React Context API (e.g., AuthContext.js for authentication state)
│   ├── /hooks               # Custom React hooks to encapsulate reusable logic (e.g., useAuth.js for authentication-related logic, useFetch.js for data fetching)
│   ├── /utils               # Utility functions and helper modules (e.g., api.js for making API requests, helpers.js for formatting data, validation.js for input validation)
│   └── /App.js              # Main entry point of the React application, sets up routing and global providers
│
├── .env                      # Environment variables for the frontend application (e.g., API base URL)
├── package.json              # Lists frontend dependencies, defines scripts for development, building, and testing
└── tailwind.config.js        # Configuration file for the Tailwind CSS framework, defining styling rules and customizations
```

```bash
/backend
│
├── /controllers             # Controllers for handling routes (UserController, etc.)
│
├── /models                  # Database models (User, etc.)
│
├── /routes                  # API routes (authRoutes.js)
│
├── /middleware              # Middleware (authentication checks, etc.)
│
├── /config                  # Configuration (DB setup, etc.)
│
├── server.js                # Server setup (Express.js)
├── .env                     # Environment variables (JWT_SECRET, etc.)
└── package.json             # Backend dependencies and scripts
```

# Authentication

This application employs JSON Web Tokens (JWT) for secure user authentication. Upon successful login, the backend provides two distinct tokens:

* **accessToken:** This short-lived token is essential for accessing protected routes within the application. It is included in the headers of requests to these routes.
* **refreshToken:** This longer-lived token serves the purpose of obtaining a new accessToken when the current one expires, ensuring continuous access without requiring the user to log in again.

## Access Control

The backend implements robust access control mechanisms. Protected routes are safeguarded by middleware that intercepts incoming requests. This middleware verifies the presence and validity of the accessToken within the request headers before granting access to the requested resource.

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
