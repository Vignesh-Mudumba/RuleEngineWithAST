# RuleEngineWithAST
# Rule Engine Application

## Summary

This Rule Engine Application is designed to evaluate rules based on user-defined conditions. The application utilizes a simple user interface built with React for the frontend, while the backend is powered by Node.js , Express.js and MongoDB. The rules can be created, evaluated, and combined using a robust Abstract Syntax Tree (AST) parsing mechanism.

### Features

- Create rules using a flexible string-based syntax .
- Store rules in a MongoDB database.
- Evaluate one or more rules against user-provided data.
- Combine multiple rules into a single logical expression.
- User-friendly interface with real-time feedback.

## Design Choices

### Architecture

The application follows a 3-tier architecture:

1. **Frontend (UI)**: Built with React, allowing users to create and evaluate rules dynamically.
2. **API**: A RESTful API developed using Express.js for handling requests related to rule creation, retrieval, evaluation, and combination.
3. **Backend**: MongoDB is used for data storage, allowing persistence of user-defined rules.

### Rule Evaluation

The rule evaluation is handled through an Abstract Syntax Tree (AST) that represents the logical structure of the rules. The rules are parsed and evaluated using helper functions to ensure the logic is applied correctly.

### User Input

User input is validated before being processed to ensure that rules are well-formed. The UI provides feedback in case of errors during rule creation or evaluation.

## Build Instructions

### Prerequisites

Make sure  the following are installed:

- **Node.js** (v14 or later)
- **npm** (Node package manager)
- **MongoDB** (running instance)

### Dependencies
 - ### Backend
       Express: Fast web framework for Node.js.
       Mongoose: MongoDB object modeling for Node.js.
       body-parser: Middleware to handle JSON request bodies.
       cors: Middleware to enable CORS.
 - ### Frontend
       React: JavaScript library for building user interfaces.
       axios: Promise-based HTTP client for making requests.

 
