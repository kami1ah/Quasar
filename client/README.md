# FRONT END README

Description 

### Table of Contents


## Pages

The frontend contains 4 main pages
  - [Register page](../client/html/register.html): This is where a user will register their account by inputing their chosen username, a secure password and their date of birth.
  - [Login Page](../client/html/login.html): This is the page where the user will log into their account to play the game.
  - [Homepage](../client/html/homepage.html): This the page where all the games available to play are displayed and the leaderboard.


## Color scheme(CSS)


## Functionalities



## Testing 

### How to run the tests
1. To install the dependencies to run the tests, run `npm i`. Developer dependencies to be installed are:
    - Jest
    - JSDOM **20.0.0**version
    - Live Server
2. To run the test `npm run test`
3. To check the test coverage `npm run coverage` OR the DOM test coverage can be viewed in this [page](http://127.0.0.1:5500/client/coverage/lcov-report/index.html)

### Example of the test written

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


