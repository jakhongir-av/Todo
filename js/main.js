const token = localStorage.getItem("token")
const btn = document.querySelector(".logOutBtn");
const tasksEl = document.querySelector("#tasks");
const newTaskFormEl = document.querySelector("#new-task-form");
const newTaskInputEl = document.querySelector("#new-task-input")
const editBtnEl = document.querySelector(".edit");
const deleteBtnEl = document.querySelector(".delete");




if(!token) {
    window.location.replace("signup.html");
}


btn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("signin.html");
});


//* Submit TODO
newTaskFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    let todo = newTaskInputEl.value;

    const template = `
    <div class="task">
        <div class="content">
            <input 
                type="text" 
                class="text" 
                value="${todo}"
                readonly>
        </div>
        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    </div>
`;
    tasksEl.innerHTML = template;

    fetch("https://todo-for-n92.cyclic.app/todos/add",{
        method: 'POST',
        headers: {
            "x-access-token": localStorage.getItem("token"),
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            task: todo,
        })
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
    })
    .catch((err) => console.log(err));

});

//* Delete TODO

deleteBtnEl.addEventListener("click", () => {
    
})

