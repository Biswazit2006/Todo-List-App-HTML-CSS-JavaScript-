// DOM
let inputTodo = document.getElementById("inputTodo");
let addTodoBtn = document.getElementById("addTodoBtn");
let todoUl = document.getElementById("todoUl");

// Grab todo
let saved = localStorage.getItem("todos");
let todos = saved ? JSON.parse(saved) : [];

// Save todos funtion
addTodoBtn.addEventListener("click", addTodo);
inputTodo.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
function addTodo() {
  console.log("Hit addTodo");
  let todoText = inputTodo.value;
  if (todoText === "") {
    console.log("Empty todo cannot save");
  } else {
    todos.push({ text: todoText, completed: false });
    saveTodos();
    rander();
    inputTodo.value = "";
  }
}

// Save todo
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
// Delete todos function
function deleteTodos(index) {
  console.log("Hit DeleteTodos");
  todos.splice(index, 1);
  saveTodos();
  rander();
}

// Rander Function
function rander() {
  console.log("Hit rander");
  console.log(todos);
  todoUl.innerHTML = "";

  //Creat todos list(loop)
  todos.forEach((todos, index) => {
    // console.log(todos)
    // console.log(index)
    let todoLi = document.createElement("li");
    todoLi.className="todo-iteam"
    todoUl.appendChild(todoLi);

    let cheakBox = document.createElement("input");
    cheakBox.className="iteam-cheakbox";
    cheakBox.type = "checkbox";
    cheakBox.checked = todos.completed;
    cheakBox.addEventListener("change", () => {
      CheakboxTougle(todos);
    });
    todoLi.appendChild(cheakBox);

    let todoPara = document.createElement("p");
    todoPara.className="iteam-text";
    todoLi.appendChild(todoPara);
    todoPara.innerText = todos.text;
    if (todos.completed === true) {
      todoPara.style.textDecoration = "line-through";
    }

    let editBtn = document.createElement("button");
    editBtn.className="iteam-edit-btn"
    editBtn.innerHTML=`<i class="fa-regular fa-pen-to-square"></i>`
    todoLi.appendChild(editBtn);

    let delBtn = document.createElement("button");
    // delBtn.innerHTML = "Delete";
    delBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    delBtn.className ="iteam-delete-btn"
    todoLi.appendChild(delBtn);
    delBtn.addEventListener("click", (e) => {
      deleteTodos(index);
    });
  });
}
rander();
// Global func
function globalFunc() {
  console.log(todos);
}

// Cheakbox tougle function
function CheakboxTougle(todos) {
  console.log(todos.text);
  if (todos.completed === false) {
    todos.completed = true;
  } else {
    todos.completed = false;
  }
  saveTodos();
  rander();
}
