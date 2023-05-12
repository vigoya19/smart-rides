# My Awesome Ride-Hailing API

This README will guide you through setting up and using the My Awesome Ride-Hailing API. The purpose of this project is to assess various aspects of back-end development, such as code clarity, API definition and endpoints, design simplicity, test coverage, and proper use of the HTTP protocol in a real-life scenario.

This API is designed for a small ride-hailing service that uses the Wompi API for monetary transactions. The project involves creating a RESTful JSON API with two types of users: riders and drivers. They will perform different types of requests as described below.

## Introduction

The Ride-Hailing API is a simple yet powerful solution for managing a ride-hailing service. It makes use of the Wompi API for monetary transactions, ensuring secure and smooth payment processing. With two types of users, riders and drivers, the API allows for easy management of rides and payments while providing a user-friendly experience.

Environment Variables
You'll need to configure the following environment variables in a .env file in the project root directory:

In this application, you'll be able to:

- Set up payment methods for riders using pre-tokenized cards
- Request rides by providing the rider's current location (latitude and longitude)
- Assign drivers and start rides immediately
- Calculate the total amount to pay based on distance and time
- Create transactions using the Wompi API to charge users

## Getting Started

To set up the application, first, make sure you have Docker installed on your machine. Then, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/vigoya19/smart-rides.git
   ```

2. Change to the project directory:

   ```
   cd smart-rides
   ```

3. Go to root dir and create file .env

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=myuser
   DB_PASSWORD=mypassword
   DB_DATABASE=smart-ride
   PAYMENT_BASE_URL=
   PAYMENT_PRIVATE=
   PAYMENT_BASE_URL=https://sandbox.wompi.co/v1/
   ```

4. Run Docker Compose to set up the required services:

   ```
   docker-compose up -d
   ```

5. Start the application and run migrations:
   ```
   sh deploy.sh
   ```

## API Endpoints

Here's a brief overview of the available API endpoints and their usage:

### Rider Endpoints

- **POST /api/payment-source**: Create a payment method for a rider using a pre-tokenized card. Please note that you should never ask for raw credit card information in your API.

  Example payload:

  ```
  {
    "email": "vigoya19@gmail.com",
    "cardToken": "card-token"
  }
  ```

- **POST /api/ride/request-ride**: Request a ride by sending the user's current location (latitude and longitude) and any other necessary data. The API will immediately assign a driver and start the ride.

  Example payload:

  ```
  {
    "email" : "vigoya19@gmail.com",
    "latitude" : 11.7617,
    "longitude": -42.1918
  }
  ```

### Driver Endpoints

- **POST /api/ride/finish-ride**: Finish a ride by providing the ride's ID and final location. The API will immediately calculate the total amount to pay based on the following rates:

  - COP $1000 per km
  - COP $200 per minute
  - COP $3500 base fare, always added

  Example payload:

  ```
  {
    "id" : 1,
    "latitude" : 51.7617,
    "longitude": -83.1918
  }
  ```

Please refer to the API documentation for more details on each endpoint, including request and response formats.

## Contributing

If you'd like to contribute to the project or report any issues, please submit a pull request or open an issue on the GitHub repository.

## License

This project is licensed under the MIT License.
