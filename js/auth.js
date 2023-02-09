const signUpFormEl = document.querySelector("#signUpForm");
const emailInputEl = document.querySelector("#emailInput");
const passwordInputEl = document.querySelector("#passwordInput");

// signUpFormEl.addEventListener("submit", (event)=> {
//     event.preventDefault();
//     const email = event.target[0].value;
//     const password = event.target[1].value;

//     const user = {
//         name: email,
//         password: password,
//         token: null,
//     };

//     const bodyObj = {
//         name: email,
//         password: password,
//     };

//     fetch("https://todo-for-n92.cyclic.app/user/register", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(bodyObj),
//     })
//     .then(res => res.json())
//     .then(res => {
//         user.token = res.token
//         localStorage.setItem("user", JSON.stringify(user));
//     })
//     .catch(err => {
//         console.log(err);
//     })
// });


// signUpFormEl.addEventListener("submit", (event) => {
//     event.preventDefault();
    
//     //*  User obj
    
//     const user = {
//         name: emailInputEl.value,
//         password: passwordInputEl.value,
//         token: null,
//     };
//     //* fetch body obj
    
//     const bodyObj = {
//         name: emailInputEl.value,
//         password: passwordInputEl.value,
//     };
//     console.log(user);
//     //* fetch API register
    
//     fetch("https://todo-for-n92.cyclic.app/user/register", {
//     method: "POST",
//     headers: {
//         'Content-Type' : 'application/json'
//     },
//     body: JSON.stringify(bodyObj)
// })
// .then((response=> response.json()))
// .then((data)=>{
//     user.token = data.token
//     console.log(data);
//     localStorage.setItem("user",JSON.stringify(user))

// }).catch((error)=>{
//     console.log(error);
//     console.log("API not found");  
// })
// });

console.log(signUpFormEl);
signUpFormEl.addEventListener("submit",(evt)=>{
    evt.preventDefault()

    let user = {
        name: emailInputEl.value,
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
        console.log(data.token);
    }).catch(error=> console.log(error))
})


