const token = localStorage.getItem("token");
const btn = document.querySelector(".logOutBtn");
const tasksEl = document.querySelector("#tasks");
const newTaskFormEl = document.querySelector("#new-task-form");
const newTaskInputEl = document.querySelector("#new-task-input");
const editBtnEl = document.querySelector(".edit");
const deleteBtnEl = document.querySelector(".delete");

if (!token) {
  window.location.replace("signup.html");
}

btn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("signin.html");
});

//* Submit TODO

const todos = [];
let todo = [];

function render() {
  tasksEl.innerHTML = "";
  for (let i = 0; i < todo.length; i++) {
    const template = `
            <div class="task ${
              todo[i].completed ? "bg-success text-light" : "bg-dark"
            }">
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
                            onchange="toggleComplete('${todo[i]._id}')"
                            ${todo[i].completed && "checked"}>
                    </div>
                    <button class="edit">Edit</button>
                    <button class="delete" onclick="deleteTodo('${
                      todo[i]._id
                    }')">Delete</button>
                </div>
            </div>`;

    tasksEl.innerHTML = tasksEl.innerHTML + template;
  }
}

newTaskFormEl.addEventListener("submit", (event) => {
  event.preventDefault();

  let task = newTaskInputEl.value;

  fetch("https://todo-for-n92.cyclic.app/todos/add", {
    method: "POST",
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      task: task
    })
  })
    .then((res) => res.json())
    .then((res) => {
      todo.push(res.todo);
      render();
    })
    .catch((err) => console.log(err));

  newTaskInputEl.value = "";
});

//* Toggle complete function
function toggleComplete(smth) {
  fetch(`https://todo-for-n92.cyclic.app/todos?id=${smth}`, {
    method: "PUT",
    headers: {
      "x-access-token": localStorage.getItem("token")
    }
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      todo = todo.map((id) => {
        if (id._id === res.todo._id) {
          todo[id] = res.todo;
        } else {
          todo[id] = id;
        }
        return todo[id];
      });
      render();
    })
    .catch((err) => console.log(err));
}

//* Delete todo

function deleteTodo(id) {
  const isAccepted = confirm("Are you sure to delete??");
  if (isAccepted) {
    fetch(`https://todo-for-n92.cyclic.app/todos/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token
      }
    })
      .then((res) => res.json())
      .then((res) => {
        todo = todo.filter((todo) => {
          if (
            id === res.deletedTodo._id &&
            res.deletedTodo._id === todo._id &&
            id === todo._id
          ) {
            return null;
          } else {
            return todo;
          }
        });

        render();
      })
      .catch((error) => console.log(error));
  }
}
