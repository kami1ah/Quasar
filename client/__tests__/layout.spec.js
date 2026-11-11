const { renderDOM } = require('./helpers');

let dom;
let document;

describe('login.html', () => {
    beforeEach(async () => {
    dom = await renderDOM('../html/login.html');
    document = await dom.window.document;
  })

  it('has a 2 buttons for the homepage and submit for login', () => {
    const btns = document.querySelectorAll('button')
    expect(btns).toHaveLength(2)
  })

    it('has a button that redirects the user to the homepage', () => {
    const button = document.querySelector('#home')
    expect(button).toBeTruthy()
    expect(button.textContent).toContain('Home')
  })

    it('has a button that redirects the user to the homepage', () => {
    const button = document.querySelector('#login')
    expect(button).toBeTruthy()
    expect(button.textContent).toContain('Log-in')
  })

  it('has an input section where username abd password can be inputted', () => {
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


  it('has a hyperlink where a user can register an account', () => {
    const link = document.querySelector('a[href]')
    expect(link).toBeTruthy()
    expect(link.innerHTML).toContain('register here')
  })
  
})

//Testing the register page

describe('register.html', () => {
    beforeEach(async () => {
    dom = await renderDOM('../html/register.html');
    document = await dom.window.document;
  })

  it('has a 2 buttons for the homepage and submit for login', () => {
    const btns = document.querySelectorAll('button')
    expect(btns).toHaveLength(2)
  })

  it('has a button to click to register their account', () => {
    const button = document.querySelector('#registerButt')
    expect(button).toBeTruthy()
    expect(button.textContent).toContain('Register')
  })

    it('has a button that redirects the user to the homepage', () => {
    const button = document.querySelector('#home')
    expect(button).toBeTruthy()
    expect(button.textContent).toContain('Home')
  })


    it('has an input section where username and password can be inputted', () => {
    const form = document.querySelector('form')

    const usernameInput = document.querySelector('#floatingInput')
    const passwordInput = document.querySelector('#floatingPassword')
    const dobInput = document.querySelector('#startDate')

    expect(form).toBeTruthy()
    expect(usernameInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()
    expect(dobInput).toBeTruthy()

    usernameInput.value = 'username'
    passwordInput.value = 'password'
    // dobInput.value = ('01,01,2011')

    expect(usernameInput.value).toBe('username')
    expect(passwordInput.value).toBe('password')
    // expect(dobInput.value).toBe('01,01,2011')
  })

})

//Testing the homepage
describe('homepage.html', () => {
    beforeEach(async () => {
    dom = await renderDOM('../html/homepage.html');
    document = await dom.window.document;
  })


  it('has a hyperlink to play all the games', () => {
    const gameLinks = document.querySelector('#categories')

    expect(gameLinks.innerHTML).toContain('Game of the day')
    expect(gameLinks.innerHTML).toContain('Historical figures')
    expect(gameLinks.innerHTML).toContain('Historical Monuments')
    expect(gameLinks.innerHTML).toContain('Geography')
  })

  it('has a leaderboard in the homepage', () => {
    const leaderboard = document.querySelector('h2')

    expect(leaderboard).toBeTruthy()
    expect(leaderboard.innerHTML).toBe('Leaderboard')
  })

  it('has a leaderboard table where the ranking, username and points are displayed', () => {
    const tableHeaders = document.querySelector('tr')

    expect(tableHeaders).toBeTruthy()
    expect(tableHeaders.innerHTML).toContain('Rank')
    expect(tableHeaders.innerHTML).toContain('Username')
    expect(tableHeaders.innerHTML).toContain('Points')

  })
})


// //Testing the homepage
// describe('gameoftheday.html', () => {
//     beforeEach(async () => {
//     dom = await renderDOM('../html/gameoftheday.html');
//     document = await dom.window.document;
//     })

//     afterEach(() => {
//         dom.window.close()
//     })


//   it('has a subject name at the top of the page', () => {
//     const subjectName = document.querySelector('h1')

//     expect(subjectName).toBeTruthy()
//     expect(subjectName.innerHTML).toBe('Game of the day!')
//   });

//     it('has an image displayed that the user will be quizzed on', () => {
//         const image = document.querySelector('img')

//         expect(image).toBeTruthy()
//         expect(image.alt).toBe('')
//     })

//     it('has an input section where the user can input and submit their guesses', () => {
//         const answerInput = document.querySelector('input[type="text"]')
//         const submitButton = document.querySelector('input[type="submit"]')

//         expect(answerInput).toBeTruthy()
//         expect(submitButton).toBeTruthy()


//         expect(answerInput.type).toBe('text')
//         expect(submitButton.type).toBe('submit')

        
//     })

//     it('has a button that when clicked it reveals an hint', () => {
//         const button = document.querySelector('button')
//         expect(button).toBeTruthy()
//         expect(button.textContent).toContain('Hint')
//     })

// })
