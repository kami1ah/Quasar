# Quasar Back End Documentation

## Overview


- Quasar is an interactive educational quiz application designed to make learning engaging through gamified quizzes. 
- Users can create accounts, test their knowledge across different categories, and receive hints to help them answer questions. 
- The application tracks individual scores and games played, allowing users to monitor their progress and compete against others through a leaderboard.

## Getting Started
## Prerequisites
 - Node.js
- NPM (Node Package Manager)
 - A cloud-based PostgreSQL database hosting platform, e.g. Supabase

 #### Installations

1. Clone the repo
    - Run `git clone git@github.com:kami1ah/Quasar.git` in the CLI of your choice
2. Navigate to the project directory
    - Navigate to the project with `cd Quasar`
3. Install dependencies
    - Run `npm install` to install all dependencies for the project
    - This project uses:
        - Express
        - PG = Deals with connection to DBMS
        - cors
        - dotenv
        - nodemon for development
4. Set up your database
    - Create a database on Supabase, or other cloud-based database management system platform
    - retrieve the database URL and copy it
    - Create a `.env` file in the root directory with the following:
        - `DB_URL=<your_database_url>`
    - Replace `<your_database_url>` with the database URL you just copied from Supabase
    - run `npm run setup-db` to setup the database
5. Setup your port
    - Add a `port` key assigned to the port of your choice in your `.env` file
        - `PORT=<port_of_your_choice>`
6. Run the server  
    - run `npm run dev` to run the server in development mode
    - run `npm run start` to run the server in production mode

