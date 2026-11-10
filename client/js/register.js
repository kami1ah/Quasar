const registerForm = document.getElementById("registerForm")
const userEmail = document.getElementById("floatingInput")
const userPassword = document.getElementById("floatingPassword")
const userDate = document.getElementById("startDate")

registerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const email = userEmail.value
    const password = userPassword.value
    const date = userDate.value
})

