# Fitness Application API

This is a comprehensive fitness application built with Node.js and Express. The application includes features for user registration and login, referral codes, step tracking, daily metrics reset, target-based rewards, a referral program, social features, an in-app wallet, competitions, notifications, and an admin panel.

## Project Structure

```
backend-node
├── src
│   ├── controllers          # Contains all the controllers for handling requests
│   ├── models               # Contains all the database models
│   ├── middleware           # Contains middleware for authentication and error handling
│   ├── routes               # Contains route definitions for the API
│   ├── utils                # Contains utility functions
│   ├── app.js               # Initializes the Express application
│   └── server.js            # Starts the server
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## Features

- **User Authentication**: Sign up, login, password reset, and social login handling.
- **Referral System**: Generate and validate referral codes, track referral relationships.
- **Step Tracking**: Fetch and store daily step counts, calculate calories based on user metrics.
- **Daily Metrics Reset**: Automatically reset daily metrics at midnight.
- **Target-Based Rewards**: Manage rewards based on user targets and achievements.
- **Social Features**: Add and follow friends, view leaderboards.
- **In-App Wallet**: Manage FitCoins and cash balances.
- **Competitions**: Create, join, and track competitions with leaderboard scores.
- **Notifications**: Send reminders and notifications to users.
- **Admin Panel**: Manage users, monitor activity stats, and adjust wallet balances.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd backend-node
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and configure your environment variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/fitsocial
   JWT_SECRET=fitsocialsecretkey
   JWT_EXPIRES_IN=7d   
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the server:
   ```
   npm start
   ```

## Usage

- The API is accessible at `http://localhost:5000`.
- Refer to the individual route files in the `src/routes` directory for detailed API endpoints and usage.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.