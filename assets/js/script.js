var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");

function taskFormHandler(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if form filled out completly
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formE1.reset()

    //package data as object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj)
};

function createTaskEl(taskDataObj) {
    
    //create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    //create div for type info
    var taskInfoEl = document.createElement("div")
    taskInfoEl.className = "task-info"
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    //combine div and list item
    listItemE1.appendChild(taskInfoEl);

    //add list item to list
    tasksToDoE1.appendChild(listItemE1);
}

formE1.addEventListener("submit", taskFormHandler)
