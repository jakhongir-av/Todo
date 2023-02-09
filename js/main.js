const token = JSON.parse(localStorage.getItem("token"));
const logOutBtnEl = document.querySelector(".logOutBtn");

if(!token) {
    window.location.replace("index.html");
};

