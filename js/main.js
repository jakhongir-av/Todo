const token = localStorage.getItem("token")
const btn = document.querySelector(".logOutBtn");

if(!token) {
    window.location.replace("signup.html");
}


btn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("signin.html");
})