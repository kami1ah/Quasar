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
        - bcrypt
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
6. Add password hashing
    - Add the number of salt round to hash your passwords with
        - `BCRYPT_SALT_ROUNDS=10`
7. Run the server  
    - run `npm run dev` to run the server in development mode

### Database Schema

`user_account` 

```sql
user_id: Primary Key, Auto-generated Integer
username: String (30), Unique, not null
password: CHAR(60), not null
age: Date, not null
school: String (100)
```

`questions` 

```sql
question_id: Primary Key, Auto-generated Integer
image_url: Text, not null
answer: String (100), not null
category: String (150), not null
description: Text, not null
```

`hints`

```sql
hint_id: Primary Key, Auto-generated Integer
question_id: Integer, Foreign Key (references questions.question_id), not null
hint_order: Integer, not null
hint_text: String (255), not null
```

`user_game_stats`

```sql
user_id: Primary Key, Foreign Key (references user_account.user_id),

historical_figures_points: Integer, default 0
monuments_points: Integer, default 0
geography_points: Integer, default 0

total_points: Generated Integer (stored)
    = historical_figures_points + monuments_points + geography_points

historical_figures_games: Integer, default 0
monuments_games: Integer, default 0
geography_games: Integer, default 0

total_games: Generated Integer (stored)
    = historical_figures_games + monuments_games + geography_games
```
## API Endpoints

All available API endpoints with their methods and descriptions.

### Base URL
`http://localhost:<port>`

#### API Endpoints
| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| POST    | /users/register          | Registers a new user by storing their username, hashed password and date of birth in the `user_account table`. Also creates an empty row in `user_game_stats`.        |
| POST    | /users/login           | Authenticates a user by comparing the submitted password against the stored hashed password.    |
| GET | /users/:username | Retrieves the userid based given a specific username |
|  GET     |        /question/:category                         |        Retrieves a random question from the specified category, alongside all associated hints.          |
|    GET   |   /stats     |Retrieves the top 10 users ranked by total points in descending order.         |
|    GET |    /stats/:user_id    | Retrieves all game statistics for a specific user.        |
|   PATCH    |  /stats/:user_id       | Updates points and number of games played for a specific user         |

## Register a new user
### Example Request
To register a new user, use the following POST request and provide a JSON object containing the user's details:

```json
        {
          "username": "User1",
          "password": "Password1",
          "age": "2005-06-15"

        }

```

`POST /users/register`
### Example Response



## Login

### Example Request
To log in, use the following POST request and provide the user's username and password:

```json
        {
          "username": "User1",
          "password": "Password1",
        }
```

`POST /users/login`


### Example Response

## Get Userid given username
### Example Request

### Example Response


## Get a random question by category
### Example Request
To retrieve a random question from a specific category, use the following GET request:

`GET /question/:category`


### Example Response



## Get leaderboard statistics
### Example Request
To retrieve the top 10 users ranked by their total points, use the following GET request:

`GET /stats`

### Example Response


## Get statistics for a specific user
### Example Request
To retrieve the game statistics for a specific user, provide their user ID in the URL:

`GET /stats/:user_id`

### Example Response


## Update user game statistics
### Example Request
To update a user's points and games played, use the following PATCH request and provide the relevant statistics in a JSON object:

```json

```
`PATCH /stats/:user_id`

### Example Response