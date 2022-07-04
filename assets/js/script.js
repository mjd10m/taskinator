var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");
var taskInProgressE1 = document.querySelector("#tasks-in-progress");
var taskCompletedE1 = document.querySelector("#tasks-completed");
var tasks = []

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

    var isEdit = formE1.hasAttribute("data-task-id");
    
    if(isEdit) {
        var taskId = formE1.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId)
    } else {

    //package data as object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to-do"
        };
        createTaskEl(taskDataObj);
    }
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

    //add created task to array
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    //add task to local storage
    saveTasks()
    
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

    var updatedTaskArr = []

    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    tasks=updatedTaskArr

    saveTasks()
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

function completeEditTask(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //update task array for local storage

    for (i=0; i<tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    //add to local storage
    saveTasks()

    alert("Task Updated!");
    formE1.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

function taskStatusChangeHandler(event) {
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); 
    if (statusValue === "to do") {
        tasksToDoE1.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        taskInProgressE1.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        taskCompletedE1.appendChild(taskSelected);
    }
    
    //update tasks array for storage
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks()
};

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

formE1.addEventListener("submit", taskFormHandler);
pageContentE1.addEventListener("click", taskButtonHandler);
pageContentE1.addEventListener("change", taskStatusChangeHandler);
