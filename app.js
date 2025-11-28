// DOM 
let inputTodo = document.getElementById("inputTodo");
let addTodoBtn = document.getElementById("addTodoBtn");
let todoUl = document.getElementById("todoUl");

// Grab todo
let saved = localStorage.getItem("todos");
let todos = saved?JSON.parse(saved):[];

// Save todos funtion
addTodoBtn.addEventListener("click",addTodo)
inputTodo.addEventListener("keypress",(e)=>{if(e.key==="Enter"){addTodo()}});
function addTodo(){
    console.log("Hit addTodo");
    let todoText = inputTodo.value ;
    if(todoText===""){
        console.log("Empty todo cannot save")
    }else{
        todos.push({text:todoText,completed: false})
        saveTodos();
        console.log(todos)
    }
    

    
}

// Save todo
function saveTodos(){
localStorage.setItem("todos", JSON.stringify(todos));
}
// Delete todos function
function deleteTodos(){
    console.log("Hit DeleteTodos")
}

// Rander Function
function rander(){
    console.log("Hit rander")
    console.log(todos)

    //Creat todos list(loop)
    todos.forEach(todos => {
        // console.log(todos)
        let todoLi = document.createElement("li");
        todoUl.appendChild(todoLi);
        let todoPara = document.createElement("p");
        todoLi.appendChild(todoPara);
        todoPara.innerText = todos.text;
    });
}
rander();