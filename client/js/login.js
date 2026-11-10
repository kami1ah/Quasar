const inputForm = document.getElementById("inputForm")
const userUsername = document.getElementById("floatingInput")
const userPassword = document.getElementById("floatingPassword")

inputForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const username = userUsername.value
    const password = userPassword.value

    const response = await fetch("http://localhost:3000/users/login",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username,password})
    })
    if (response.status === 200){
        window.location.assign("homepage.html")
    }
})