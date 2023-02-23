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

const todos = [];
const todo = [];


async function render() {
    tasksEl.innerHTML = '';
    for(let i = 0; i <= todo.length; i++) {
        const template = `
            <div class="task">
                <div class="content">
                    <input 
                        type="text" 
                        class="text" 
                        value="${todo[i].task}"
                        readonly>
                </div>
                <div class="actions">
                    <div class="form-check form-switch">
                        <input 
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckChecked"
                            ${todo[i].completed ? "checked" : ''}>
                    </div>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            </div>`; 
        tasksEl.innerHTML = tasksEl.innerHTML + template;
    }
};



newTaskFormEl.addEventListener("submit", (event) => {
    event.preventDefault();


    let task = newTaskInputEl.value;
    
    
    fetch("https://todo-for-n92.cyclic.app/todos/add", {
            method: 'POST',
            headers: {
                "x-access-token": localStorage.getItem("token"),
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                task: task,
            })
        })
        .then((res) => res.json())
        .then((res) => {
            todo.push(res.todo);
            render();
            console.log(todo);        
        })
        .catch((err) => console.log(err));

    newTaskInputEl.value = '';    

});

//* Delete TODO


