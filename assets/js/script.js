var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");

function createTaskHandler(event) {
    
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    //create div for type info
    var taskInfoEl = document.createElement("div")
    taskInfoEl.className = "task-info"
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    
    //combine div and list item
    listItemE1.appendChild(taskInfoEl);

    //add list item to list
    tasksToDoE1.appendChild(listItemE1);
};

formE1.addEventListener("submit", createTaskHandler)
