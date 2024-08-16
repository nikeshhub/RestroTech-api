# RestroTech - Restaurant POS System Backend

## Overview

RestroTech is a Point of Sale (POS) system designed specifically for restaurants. Built with Node.js, this backend provides essential functionalities for managing restaurant operations, including menu management, table management, order processing, and kitchen display features.

## Features

### API Endpoints

#### Authentication API
- `POST /user/register`: User registration
- `POST /user/login`: User login to obtain a JWT token

#### Menu API
- `GET /menu`: Retrieve all menu items
- `POST /menu`: Add a new menu item
- `PUT /menu/:id`: Update a menu item
- `DELETE /menu/:id`: Delete a menu item
- `GET /menu/:restaurantId`: Get specific restaurant menu

#### Table API
- `GET /table`: Retrieve all tables
- `POST /table`: Add a new table
- `PUT /table/:id`: Update a table
- `DELETE /table/:id`: Delete a table
- `GET /table/:restaurantId`: Get specific restaurant tables

#### Order API
- `GET /orders`: Retrieve all orders
- `POST /orders`: Create a new order
- `PUT /orders/:id`: Reorder a previous order
- `DELETE /orders/:id`: Delete an order
- `PUT /orders/close/:id`: Closes an order
- `GET /orders/kitchen/pending`: Gets pending order on kitchen display

### Authentication
- JWT-based Authentication
- Secure user authentication using JSON Web Tokens (JWT)

### Middleware

#### isAuthenticated Middleware
- Applied to most endpoints
- Verifies the JWT token
- Extracts and passes the `restaurantId` to the next middleware or route handler

## Technologies

- Node.js: Server-side runtime environment
- Express.js: Backend framework for building web applications
- MongoDB: NoSQL database for storing data
- Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js

## Environment Variables

The following environment variables must be set:

- `DB_URL`: MongoDB connection string
- `SECRET_KEY`: Secret key for JWT authentication
- `PORT`: Port on which the server will run

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run the server: `npm start`

## API Usage

Most endpoints require authentication. Include the JWT token in the Authorization header:
