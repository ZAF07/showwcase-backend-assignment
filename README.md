# Showwcase Test - Implementing It With The Hexagonal Pattern

## Overview

In this project, we are implementing the Hexagonal Architecture pattern (also known as Ports and Adapters or Onion Architecture) to achieve a flexible and maintainable software design. The Hexagonal Architecture promotes a clear separation of concerns by dividing the application into multiple concentric layers. The core of the pattern revolves around the idea of defining the business logic and domain models at the center, while keeping the input/output and external dependencies at the periphery.

## Why is the Hexagonal Pattern Useful?

The Hexagonal Architecture offers several benefits that enhance the quality and maintainability of the software. Firstly, it facilitates the decoupling of the application's core logic from the external infrastructure, such as databases, APIs, or frameworks. This separation ensures that changes to external components do not impact the business logic, making it easier to switch out or update these components without affecting the core functionality. Secondly, the pattern promotes testability and test-driven development (TDD) since the business logic can be tested in isolation from the external dependencies by using ports and adapters. Overall, the Hexagonal Architecture provides a modular and scalable structure, enabling teams to maintain a clean and organized codebase, while allowing the application to evolve and adapt to changing requirements with ease.

```
Project Layout:
project-root/
|- dist -> Typescript compiles here. This is the final code
|
|- src/ -> Working directory
|
|- adapters/ -> This module holds all the adapters to the core. Both ways, incoming/outgoing requests
| |- api -> Holds adapters for incoming/outgoing communications
| |- cache
| |- db
|
|- routers/ -> Application routers
|
|- core/ -> The core of our project. Our business rules goes here
| |- services/ CORE BUSINESS LOGIC
| | |- UserService.ts -> Specific to FetchRandomusers in this case but can extend to a particular business domain
| | |- AuthService.ts
| |
| |-domain/ Core domain model
| | |- authDomain.ts
| | |- userDomain.ts
| |
| |-ports/ INTERFACE TO BE IMPLEMENTED BY ADAPTERS (The ports)
| | |- authServicePorts.ts
| | |- userServicePorts.ts
| |
|
|- infrastructure/ Clients we use to communicate to the outside of the application
| |- db/ Client connections to any persistence layer (Postgres, MySQL, MongoDB etc...)
| | |- UserRepository.ts
| |
|
|- index.ts -> Main starting point
|- tsconfig.json
|- package.json
```

# Starting the Application:

## Requirements:

You need to have the Docker desktop installed on your computer.

## Usage:

To ensure that you have the correct build (typescript compiler), build the package before you start the container using: `npm run build`.

## Running with Docker

Simply run `make start`.
This will start PostgreSQL, Redis, and the application instance at once.

### Run with Docker in detached mode

To start in detached mode, run : `make start-d`
To stop the detached mode, run : `make stop-d`

To remove the containers, run : `make down`

You can start interacting with the API.

## Running Locally

You can also run the application locally without Docker.
You have one dependency as of now: `PostgreSQL`.

To start the application locally with a database, simply run `make start-local-d`

To start the application locally with your own database, simply run: `make start-local` and don't forget to go into `./config/local-local.yml` and update your database credentials

## Application information

This application has 2 exposed endpoints:

1. User (Returns a random user and is not a protected route)
2. Auth (Allows you to register, login, and get a user profile. The `profile` route is protected with JWT)

How to get a JWT token to be authorized to use the `api/auth/profile` route?

1. Register a new user @ `POST /api/auth/register` (Your profile will be saved in the system with the given email & password)
2. Login the user @ `POST /api/auth/login` (You must pass the same credentials you gave when registering. You will get a JWT token which expires in `20 seconds`)
3. Make the call to `/api/auth/profile`. You need to add an `Authorization` header in the request headers with the value of your JWT token

### JWT Expire

The current setting is that the JWT token expires in 20 seconds.

You can change this if you like simply by configuring the value in the specific env configuration file.

For local application start-up, `local-local.yml` is used.
For running in Docker, `stage-default.yml` is used.

### Configs

> 🚨 Important to note that in a real set up, you would want to use some form of build tool to inject the config files into the application at build time. This here is a simplefied example only

This application depends on a configuration file to start.
In the configuration file we specify all the credentials and application settings.

We are using `node-config` which read and loads a specified config file into the runtime.

The configs can be found in the `./config` directory.
We have multiple instances of it for different environments.
Currently it only supports two environments:

1. Local (both with and without local PostgreSQL) (`make start-local` && `make start-local-d` both use the `local.local.yml` config)
2. Docker (`make start-d`, `make start` both use the `stage-default.yml` config)

We use a different config file for local, Docker and Prod environments.
This is done via setting the `NODE_ENV` & `NODE_APP_INSTANCE` environment variable upon start-up.

Because we lack a real infrastructure, we are simply setting and commiting the configs into the repository along with the application. You don't have to worry about setting up the config values (accept your database configs if running locally without the postgres Docker container) as they are already in the config files for this simple application. (🚨 NOT RECCOMENDED IN REAL WORLD APPLICATIONS)

In a real world usage, this helps improve backing services abstraction (databases, caches, external API), configuration management and ease of deployment.

### Testing the application

We are using Jest for testing.

To run tests, run: `make test`

## Troubleshoot Docker start up:

These are some common errors faced when running `docker-compose up`

## Error: `error: database "showwdb" does not exist`

### Fix:

> Note: This is a brute force fix. After you created the DB and restart the containers, a volume mapped to project root (`.db`) will contain the information for starting Postgres with a database in the container

1. Find the Postgres's container's ID: Open a new terminal and run `docker ps`
2. Open an interactive shell inside the Postgres container: `docker exec -it <container-id> sh`
3. Connect to `psql` inside the container: `psql -U <POSTGRES_USER>`
4. Manually create a database inside the container: `create database <db-name>`
5. Close the terminal session: `ctrl+d`
6. Restart the containers: `docker-compose down` then `docker-compose up`

## Error: 'Relations of 'users' not found AKA No user table

### Fix:

> Note: Again another 'brute force' fix. I don't want to spend too much time here for now so I decided to do a quick fix and come back later

1. Find the Postgres's container's ID: Open a new terminal and run `docker ps`
2. Open an interactive shell inside the Postgres container: `docker exec -it <container-id> sh`
3. Connect to `psql` inside the container: `psql -U <POSTGRES_USER>`
4. Connect to the database: `\c showwapp;`
5. Copy contents from `./seed.sql` and paste into the command
6. Exit the terminal and try the request again
