var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content")

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

    //add task id as a custom attribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);

    //create div for type info
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    //combine div and list item
    listItemE1.appendChild(taskInfoEl);

    //create dropdowns/buttons and add to list item
    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemE1.appendChild(taskActionsE1);
    
    //add list item to list
    tasksToDoE1.appendChild(listItemE1);
    
    taskIdCounter++;
}

function createTaskActions(taskId) {
    var actionContainerE1 = document.createElement("div");
    
    actionContainerE1.className = "task-actions";

    //create button elements
    var editButtonE1 = document.createElement("button");

    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(editButtonE1);

    //create delete button
    var deleteButtonE1 = document.createElement("button");

    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(deleteButtonE1);

    //create dropdown
    var statusSelectE1 = document.createElement("select");

    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);
    actionContainerE1.appendChild(statusSelectE1);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for ( i = 0; i < statusChoices.length; i++) {
        
        var statusOptionE1 = document.createElement("option");
        statusOptionE1.textContent = statusChoices[i];
        statusOptionE1.setAttribute("value", statusChoices[i]);
        statusSelectE1.appendChild(statusOptionE1);
    }

    return actionContainerE1;
};

function taskButtonHandler(event) {
    //get element from event
    var targetElementE1 = event.target;

    //edit button is clicked
    if (event.target.matches(".edit-btn")) {
        var taskId = targetElementE1.getAttribute("data-task-id");
        editTask(taskId);
    }
    
    //delete button is clicked
    if (event.target.matches(".delete-btn")) {
        var taskId = targetElementE1.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

function deleteTask(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

function editTask(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formE1.setAttribute("data-task-id", taskId);
};

formE1.addEventListener("submit", taskFormHandler);
pageContentE1.addEventListener("click", taskButtonHandler);
