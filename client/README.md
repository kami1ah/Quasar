# FRONT END README

This web application is game where users can guess the name of an image of historical event, person or monuments with hints provided and limited tries.

### Table of Contents
- [FRONT END README](#front-end-readme)
  - [Pages](#pages)
  - [Functionalities](#functionalities)
  - [Testing](#testing)
    - [How to run the tests](#how-to-run-the-tests)
    - [Examples of the test written](#examples-of-the-test-written)


## Pages

The frontend contains 4 main pages
  - [Register page](../client/html/register.html): This is where a user will register their account by inputting their chosen username, a secure password and their date of birth.
  - [Login Page](../client/html/login.html): This is the page where the user will log into their account to play the game.
  - [Homepage](../client/html/homepage.html): This the page where all the games available to play are displayed and the leaderboard.
  - Game pages: There are 4 game page that cover the;
    - [Geography](../client/html/geography.html)
    - [Historical Figures](../client/html/historicalfigures.html)
    - [Historical Monuments](../client/html/historicalmonuments.html)
    - [Game of the Day!](../client/html/gameoftheday.html) - this page is a randomly chosen game from the 3 topics.

## Functionalities

The functionalities of the game was through the JavaScripts written scripts.


For example (add the code that reduces the hint count after ech try and a code that gives new hint after each try)


## Testing 

### How to run the tests
1. To install the dependencies to run the tests, run `npm i`. Developer dependencies to be installed are:
    - Jest
    - JSDOM **20.0.0**version
    - Live Server
2. To run the test `npm run test`
3. To check the test coverage `npm run coverage` OR the DOM test coverage can be viewed in this [page](http://127.0.0.1:5500/client/coverage/lcov-report/index.html)

### Examples of the test written

- To test the input section on the login page 
  ```js
      it('has an input section where username and password can be inputted', () => {
    const form = document.querySelector('form')

    const usernameInput = document.querySelector('#floatingInput')
    const passwordInput = document.querySelector('#floatingPassword')

    expect(form).toBeTruthy()
    expect(usernameInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()

    usernameInput.value = 'username'
    passwordInput.value = 'password'

    expect(usernameInput.value).toBe('username')
    expect(passwordInput.value).toBe('password')
  })

  ```
- To test the homepage has a leaderboard displayed
  ```js
      it('has a leaderboard table where the ranking, username and points are displayed', () => {
    const tableHeaders = document.querySelector('tr')

    expect(tableHeaders).toBeTruthy()
    expect(tableHeaders.innerHTML).toContain('Rank')
    expect(tableHeaders.innerHTML).toContain('Username')
    expect(tableHeaders.innerHTML).toContain('Points')

  })

  ```

