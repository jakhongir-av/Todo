//* Sign in
const signUpFormEl = document.querySelector("#signUpForm");
const emailInputEl = document.querySelector("#emailInput");
const passwordInputEl = document.querySelector("#passwordInput");
const transferToLoginEl = document.querySelector(".transferToLogin");

signUpFormEl.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let bodyObj = {
        username: emailInputEl.value,
        password: passwordInputEl.value,
    }
    console.log(bodyObj);

    fetch("https://todo-for-n92.cyclic.app/user/login", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(bodyObj)
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        window.location.replace("/index.html");
    })
    .catch((err) => console.log(err));
});
