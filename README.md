<h1 align="center">Small Bus</h1>
<p align="center">
  <img src="https://i.ibb.co/6y1C4yw/Icon-mode-bus-default-svg.png" width="300" alt="Small Bus Logo" />
</p>

  <h2 align="center">API developed for request rides</h2>

</p>

# Description

API developed in NestJs using Typescript as programming language, which is used to make requests for transportation services. This API allows to request a trip and finalize it and associate a payment method to a user.

The API has 3 main endpoints, 1 to initiate the trip where the user's email is sent, the current longitude and current latitude. Another endpoint to end the trip where the trip id, final latitude and final longitude are sent, and finally an endpoint to associate a payment method to the user, where the user's email and the user's bank card token are sent.

Each trip has an initial rate of 3,500 COP and for each kilometer that advances a charge of 1,000 COP is added to the trip, additionally, for each minute that elapses in the trip, a charge of 200 COP is added; similar to a Taximetro system.

Technological stack used:
- NestJs
- PostgreSQL
- Swagger
- TypeORM
- Dotenv
- Axios
- Eslint
- Docker

Among many others ...

## Endpoints

#### Payment source.

```bash

Method: POST

Path: localhost:3000/api/payment-source

Payload:

{
	"email": "sebasrestrepom@gmail.com",
	"cardToken": "tok_test_38849_9B4363557a30Fbd65c199Df385f7C67f"
}

```

#### Request a ride.

```bash

Method: POST

Path: localhost:3000/api/ride/request-ride

Payload:

 {
	"email" : "sebasrestrepom@gmail.com",
	"latitude" :25.7617,
	"longitude":-80.1918
}

```
#### Finish a ride.

```bash

Method: POST

Path: localhost:3000/api/ride/finish-ride

Payload:

 { 
	"id" : 2,
	"latitude" :90.7617,
	"longitude":-30.1918 
}

```

## Table structure

Next we will see how the Ride, Driver, Rider and Payment tables are structured in the database.
<p align="center">
  <img src="https://i.ibb.co/hKdXks4/tablas-smallbus.png" width="600" alt="system model" />
</p>

## Architecture diagram

The following is a model of the system architecture, which is based on a 3 layer architecture that makes the code maintainable and scalable.

<p align="center">
  <img src="https://i.ibb.co/tDQgk1Y/api-diagra.png" width="500" alt="system model" />
</p>

# Installation

For the installations you need to first clone the repository.

```bash
#Clone repository
$ git clone https://github.com/sebasrestrepom/small-bus.git

```
Additionally, you must create an .env file in the root of the project containing the following values:

```bash
PAYMENT_BASE_URL=_PAYMENT_BASE_URL_
PAYMENT_PRIVATE_TOKEN=_PAYMENT_PRIVATE_TOKEN_
PAYMENT_PUBLIC_TOKEN=_PAYMENT_PUBLIC_TOKEN_

```


# Running the app

To run the application you must add the following command in the console, with this command docker-compose will start an instance of the database and run the service, automatically installing all the dependencies and making it ready to be used.

```bash

# run application
$ docker-compose up

```

# API Docs

For more information about methods present on this API visit:

```bash

# copy this url in your browser
http://localhost:3000/docs/

```

In the following image we will see a screenshot of the endpoints that we will find in Swagger

<p align="center">
  <img src="https://i.ibb.co/47xZNF6/swagger1.png" width="800"  alt="Method of Api" />
</p>

You can also see an example of how you should make the request, with some sample data, and a schema of how the endpoint response will be displayed.

<p align="center">
  <img src="https://i.ibb.co/kh5C6py/swagger2.png" width="800"  alt="Example Method Get" />
</p>


## 🐞 Did you find some issue or improvment?

Feel free to contribute and do whatever to consider better to this project.