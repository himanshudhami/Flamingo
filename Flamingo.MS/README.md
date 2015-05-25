Flamingo Micro-Services
======================

The source for Flamingo micro-services can be found here in this repository.

# Overview of this Repository

TODO: Describe repository layout, proper locations for projects, etc.
````
flamingo.MS
├─ README.md
├─ services
│   ├─ falmingo-products
│   ├─ flamingo-sales
│   └─ ...
└─ ...
````

## Micro-service Architecture

Node.js, RabbitMQ (AMQP protocol) and the microservice-crutch module are the preferred 
tool-set for creating the flamingo micro-services.

Any new work should only deviate from this guidance if a good technical reason exists to
justify the choice.

Each micro-service should point to its specific database instance. For the current set of
services, MongoDB has been used as the data store.

TODO: Briefly describe the expectations for creating Node.js micro-services
      using the microservice-crutch module.

### Patterns and Anti-Patterns for Node.js Micro-Services

TODO: Describe Node.js micro-service patterns and anti-patterns.

### Example Node.js Micro-Service

TODO: Provide an example Node.js micro-service.

## Running the Micro-services

To run any particular **micro-service** run `npm install` and then `node app`.

There is a batch file 'startall.bat' that will start all the micro-services
as per the service configuration provided (service.xml)

# Overview of Adding A Micro-Service

TODO: Describe the project structure, available tools, etc. as they apply in
      general to all new micro-services.
