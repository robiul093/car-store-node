# Car Order Management System

A full-stack web application to manage car orders, car stock, and calculate revenue. The system is built using Express, MongoDB, and TypeScript. It allows users to view cars, place orders, and manage car inventory, with automatic revenue tracking.

## Features

- **Car Management**: Add, update, and delete car listings.
- **Order Management**: Users can place orders for cars, with real-time stock updates and validation.
- **Stock Control**: Automatically adjusts car stock based on the number of orders placed.
- **Revenue Calculation**: Calculate total revenue from all orders to track business performance.
- **User Validation**: Ensures that all required fields (e.g., car details, quantity, price) are provided before creating an order.

## Tech Stack

- **Backend**: Node.js with Express, TypeScript
- **Database**: MongoDB
- **ORM**: Mongoose
- **Frontend**: React (if applicable)
- **Authentication**: JWT, Passport (if required)
- **Other Tools**: Jest (for testing), ESLint, Prettier

## Installation

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or above)
- [MongoDB](https://www.mongodb.com/) (or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud database)
- [TypeScript](https://www.typescriptlang.org/)

### Setup Instructions


### Instructions to use:

1. **Clone the repository**: The user should clone the repository using `git clone`.
2. **Install dependencies**: After navigating to the project directory, run `npm install` to install all the required dependencies.
3. **Set up the `.env` file**: Provide the necessary environment variables such as the MongoDB URI and JWT secret key.
4. **Run the project**: Start the project with `npm run dev`.

This README file covers all necessary steps for setting up the project, as well as providing essential documentation and usage information.
