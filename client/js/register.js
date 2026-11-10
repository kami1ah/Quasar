const registerForm = document.getElementById("registerForm")
const userUsername = document.getElementById("floatingInput")
const userPassword = document.getElementById("floatingPassword")
const userDate = document.getElementById("startDate")

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const username = userUsername.value
    const password = userPassword.value
    const age = userDate.value

    const response = await fetch("http://localhost:3000/users/register",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username,password,age})
    })
    
    if(response.status === 201){
        window.location.assign("login.html")
    }


})

