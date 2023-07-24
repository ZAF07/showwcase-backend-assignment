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

Simply run `docker-compose up`.
This will start PostgreSQL, Redis, and the application instance at once.

You can start interacting with the API.

This application has 2 exposed endpoints:

1. User (Returns a random user and is not a protected route)
2. Auth (Allows you to register, login, and get a user profile. The `profile` route is protected with JWT)

How to get a JWT token to be authorized to use the `api/auth/profile` route?

1. Register a new user @ `POST /api/auth/register` (Your profile will be saved in the system with the given email & password)
2. Login the user @ `POST /api/auth/login` (You must pass the same credentials you gave when registering. You will get a JWT token which expires in `20 seconds`)
3. Make the call to `/api/auth/profile`. You need to add an `Authorization` header in the request headers with the value of your JWT token

##Troubleshoot Docker start up:

These are some common errors faced when running `docker-compose up`

Error: `error: database "showwdb" does not exist`

Fix:

1. Find the Postgres's container's ID: Open a new terminal and run `docker ps`
1. Open an interactive shell inside the Postgres container: `docker exec -it <container-id> sh`
1. Connect to `psql` inside the container: `psql -U <POSTGRES_USER>`
1. Manually create a database inside the container: `create database <db-name>`
1. Close the terminal session: `ctrl+d`
1. Restart the containers: `docker-compose down` then `docker-compose up`
   > Note: This is a brute force fix. After you created the DB and restart the containers, a volume mapped to project root (`.db`) will contain the information for starting Postgres with a database in the container
