# Password Reset API

This is a Node.js API for user authentication with password reset functionality. It allows users to register, log in, and reset their passwords. This API uses MongoDB for data storage and Nodemailer for sending emails.

## Features

- User registration
- User login
- Forgot password
- Reset password

## Setup

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud-based)
- An email provider for sending emails (default: gmail)

### Installation

1. **Clone the repository:**

    ```bash
    git clone git@github.com:PraveenKumar263/password-reset-BE.git
    cd password-reset-BE
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file:**

    ```env
    MONGODB_URI='mongodb+srv://<username>:<password>@<cluster-url>/password-reset'
    PORT=3001
    SALT_ROUNDS=10
    EMAIL_ID='your-email@gmail.com'
    EMAIL_PWD='your-email-password'
    RESET_URL='http://localhost:3001/api/v1/resetPassword'
    SMTP_EMAIL_HOST='gmail'
    ```

    Update the SMTP_EMAIL_HOST based on your email service provider

4. **Start the server:**

    ```bash
    npm start
    ```

    The server will start on the port specified in the `.env` file (default: 3001).

## API Endpoints

Explore the API documentation using the [Postman API Documentation](https://documenter.getpostman.com/view/37599009/2sAXjM3WwM).

## Project Structure

- **`index.js`**: Entry point for the application. Connects to MongoDB and starts the server.
- **`app.js`**: Contains the core configuration for the Express application, including middleware and route handling.
- **`models`**: Contains Mongoose schemas and models for User.
- **`controllers`**: Contains implementations of API endpoints.
- **`routes`**: Contains the routes and their corresponding controllers.
- **`utils`**: Contains configuration files and utility functions.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database used for data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **dotenv**: Module to load environment variables from a `.env` file.
- **Nodemailer**: Module to send email.
- **bcrypt**: Encrypt passwords.
- **randomstring**: Generate a random string.

## Contributing

If you'd like to contribute to the project, please fork the repository and submit a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the ISC License.
