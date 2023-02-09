const signUpFormEl = document.querySelector("#signUpForm");
const emailInputEl = document.querySelector("#emailInput");
const passwordInputEl = document.querySelector("#passwordInput");
const transferToLoginEl = document.querySelector(".transferToLogin")



signUpFormEl.addEventListener("submit",(evt)=>{
    evt.preventDefault()

    let user = {
        username: emailInputEl.value,
        password: passwordInputEl.value,
        token: null,
    }
    let bodyObj = {
        username: emailInputEl.value,
        password: passwordInputEl.value,
    }

    fetch("https://todo-for-n92.cyclic.app/user/register",{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(bodyObj)
    }).then(res => res.json())
    .then(data =>{
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data.token));
        window.location.replace("index.html");
    }).catch(error=> console.log(error))
});

  



