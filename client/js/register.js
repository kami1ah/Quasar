const registerForm = document.getElementById("registerForm")
const userUsername = document.getElementById("floatingInput")
const userPassword = document.getElementById("floatingPassword")
const userDate = document.getElementById("startDate")
const error = document.getElementById("error")
const home = document.getElementById("home")

home.addEventListener("click", (event) => {
    window.location.assign("homepage.html")
})

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const username = userUsername.value
    const password = userPassword.value
    const age = userDate.value

    const response = await fetch("https://quasar-api.onrender.com/users/register",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username,password,age})
    })
    
    if(response.status === 201){
        window.location.assign("login.html")
    }else if(response.status === 400){
        error.style.visibility = "visible";
    }


})

