# My Awesome Ride-Hailing API

This README will guide you through setting up and using the My Awesome Ride-Hailing API. The purpose of this project is to assess various aspects of back-end development, such as code clarity, API definition and endpoints, design simplicity, test coverage, and proper use of the HTTP protocol in a real-life scenario.

This API is designed for a small ride-hailing service that uses the wompiAPI for monetary transactions. The project involves creating a RESTful JSON API with two types of users: riders and drivers. They will perform different types of requests as described below.

## Introduction

The Ride-Hailing API is a simple yet powerful solution for managing a ride-hailing service. It makes use of thewompi API for monetary transactions, ensuring secure and smooth payment processing. With two types of users, riders and drivers, the API allows for easy management of rides and payments while providing a user-friendly experience.

Environment Variables
You'll need to configure the following environment variables in a .env file in the project root directory:

In this application, you'll be able to:

- Set up payment methods for riders using pre-tokenized cards
- Request rides by providing the rider's current location (latitude and longitude)
- Assign drivers and start rides immediately
- Calculate the total amount to pay based on distance and time
- Create transactions using thewompi API to charge users

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

## Database Tables

The database schema consists of the following tables:

### Driver

The `Driver` table holds information about the drivers who are available for ride assignments.

- **id**: Unique identifier for the driver (primary key).
- **firstName**: Driver's first name.
- **lastName**: Driver's last name.
- **position**: The driver's current location (latitude and longitude).

### PaymentSource

The `PaymentSource` table stores payment-related information, such as reference numbers, payment IDs, and statuses.

- **id**: Unique identifier for the payment source (primary key).
- **reference**: A reference number for the payment source.
- **paymentId**: A unique identifier for the payment.
- **status**: The current status of the payment.

### Position

The `Position` table stores geographic coordinates (latitude and longitude) for various entities in the system.

- **latitude**: The latitude coordinate.
- **longitude**: The longitude coordinate.

### Ride

The `Ride` table holds information about the rides requested by riders and assigned to drivers.

- **id**: Unique identifier for the ride (primary key).
- **driver**: A reference to the assigned driver (foreign key).
- **rider**: A reference to the rider who requested the ride (foreign key).
- **paymentSource**: A reference to the payment source for the ride (foreign key).
- **startDate**: The start date and time of the ride.
- **endDate**: The end date and time of the ride (nullable).
- **startPosition**: The starting location of the ride (latitude and longitude).
- **endPosition**: The ending location of the ride (latitude and longitude).
- **value**: The total cost of the ride (nullable).

### Rider

The `Rider` table stores information about the riders who use the ride-hailing service.

- **id**: Unique identifier for the rider (primary key).
- **email**: The rider's email address.
- **paymentSourceId**: A reference to the rider's payment source (foreign key, nullable).

## Relationships

The relationships between the tables are as follows:

- A `Driver` can be assigned to multiple `Ride`s.
- A `Rider` can request multiple `Ride`s.
- A `PaymentSource` can be associated with multiple `Ride`s.
- A `Rider` can have one `PaymentSource`.

For more information on the API and how to use it, please refer to the main README file and API documentation.

## Technologies Used

This project is built using the following technologies:

- ![NestJS](https://nestjs.com/img/logo_text.svg) [NestJS](https://nestjs.com/): A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- ![TypeORM](https://typeorm.io/img/typeorm_logo.png) [TypeORM](https://typeorm.io/): A powerful ORM for TypeScript and JavaScript that allows you to work with databases using a clean and elegant API.
- ![PostgreSQL](https://www.postgresql.org/media/img/about/press/elephant.png) [PostgreSQL](https://www.postgresql.org/): A powerful, open source object-relational database system.
- ![Axios](https://axios-http.com/assets/logo.svg) [Axios](https://axios-http.com/): A promise-based HTTP client for the browser and Node.js.
- ![Jest](https://jestjs.io/img/jest.png) [Jest](https://jestjs.io/): A delightful JavaScript testing framework with a focus on simplicity.
- ![TypeScript](https://www.typescriptlang.org/icons/icon-48x48.png) [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript that adds optional static types, enabling better tooling and error prevention.

### Additional libraries and tools:

- [@nestjs/axios](https://www.npmjs.com/package/@nestjs/axios): A NestJS module that provides a wrapper around the Axios HTTP client.
- [@nestjs/swagger](https://www.npmjs.com/package/@nestjs/swagger): A NestJS module for automatically generating Swagger documentation.
- [class-transformer](https://www.npmjs.com/package/class-transformer): A library for converting objects between plain JavaScript and class instances.
- [class-validator](https://www.npmjs.com/package/class-validator): A library for validating objects based on decorators.
- [dotenv](https://www.npmjs.com/package/dotenv): A library that loads environment variables from a `.env` file.
- [typeorm-naming-strategies](https://www.npmjs.com/package/typeorm-naming-strategies): A library providing common naming strategies for TypeORM.
- [uuid](https://www.npmjs.com/package/uuid): A library for generating unique identifiers (UUIDs).
- [Prettier](https://prettier.io/): An opinionated code formatter.
- [ESLint](https://eslint.org/): A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

## Project Structure

Here is an overview of the Smart Ride API project structure:

```
smart-ride/
│
├── src/
│   ├── config/
│   │   └── migration.conection.ts
│   │
│   ├── driver/
│   │   ├── driver.entity.ts
│   │   ├── driver.module.ts
│   │   ├── driver.service.ts
│   │   └── driver.controller.ts
│   │
│   ├── payment-resource/
│   │   ├── payment-source.entity.ts
│   │   ├── payment-resource.module.ts
│   │   ├── payment-resource.service.ts
│   │   └── payment-resource.controller.ts
│   │
│   ├── position/
│   │   └── position.entity.ts
│   │
│   ├── rider/
│   │   ├── rider.entity.ts
│   │   ├── rider.module.ts
│   │   ├── rider.service.ts
│   │   └── rider.controller.ts
│   │
│   ├── ride/
│   │   ├── ride.entity.ts
│   │   ├── ride.module.ts
│   │   ├── ride.service.ts
│   │   └── ride.controller.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── test/
│   └── ...
│
├── .env.example
├── .eslintrc.js
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── deploy.sh
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json
```

### Explanation of Key Directories and Files

- `src/`: This is the main directory where all the source code for the application resides.
  - `config/`: Contains configuration files, such as the TypeORM migration configuration.
  - `driver/`, `rider/`, `ride/`, and `payment-resource/`: These directories contain the respective entities, modules, services, and controllers for each of the main components of the application.
  - `position/`: Contains the shared `Position` entity.
  - `app.module.ts`: The root module of the application.
  - `main.ts`: The entry point of the application.
- `test/`: Contains test files and configuration for Jest.
- `.env.example`: An example of the required environment variables for the application.
- `docker-compose.yml`: A Docker Compose file that defines the required services for the application.
- `Dockerfile`: A Dockerfile for building the application's Docker image.
- `deploy.sh`: A shell script for starting the application and running migrations.
- `jest.config.js`: The configuration file for Jest.
- `package.json`: Contains the project's dependencies, scripts, and other metadata.
- `README.md`: The main documentation file for the project.
- `tsconfig.json`: The configuration file for TypeScript.

## Development

To start the development server, run the following command:

```sh
npm run start:dev
```

This will start the application in development mode, with live reloading enabled.

## Testing

To run the test suite, use the following command:

```sh
npm test
```

For running tests in watch mode, use:

```sh
npm run test:watch
```

To generate a code coverage report, use:

```sh
npm run test:cov
```

## Contributing

If you'd like to contribute to the project or report any issues, please submit a pull request or open an issue on the GitHub repository.

## License

This project is licensed under the MIT License.
