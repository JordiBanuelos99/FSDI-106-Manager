const nonImpIcon = "far fa-star";
const ImpIcon = "fas fa-star";
var isImportant = false;
var displayPanel = true;

function toogleImportant() {
  console.log("Icon clicked!");
  if (isImportant == false) {
    $("#icon-important").removeClass(nonImpIcon).addClass(ImpIcon);
    isImportant = true;
  } else {
    $("#icon-important").removeClass(ImpIcon).addClass(nonImpIcon);
    isImportant = false;
  }
}

function saveTask() {
  console.log("Saving...");
  let taskTitle = $("#txtTitle").val();
  let taskDuration = $("#txtDuration").val();
  let taskDeadline = $("#selDeadline").val();
  let taskLocation = $("#txtLocation").val();
  let taskStatus = $("#selStatus").val();
  console.log(taskTitle, taskDuration, taskDeadline, taskLocation, taskStatus);

  let myTask = new Task(
    0,
    taskTitle,
    taskDuration,
    taskDeadline,
    taskLocation,
    taskStatus,
    isImportant
  );
  console.log(myTask);

  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    type: "POST",
    data: JSON.stringify(myTask),
    contentType: "application/json",
    success: function (response) {
      let savedTask = JSON.parse(response); //Parse JSON response into this object
      displayTask(savedTask);
    },
    error: function (details) {
      console.log("Error saving:", details);
    },
  });
}

/**
 * send a get request to https://fsdiapi.azurewebsites.net/api/tasks/
 * response => json string
 * parse the response => array
 * console log the array
 */
function fetchTasks() {
  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    type: "GET",
    success: function (response) {
      let tasks = JSON.parse(response); // Array of tasks
      // for loop, get every object and send it to displayTask();
      // Before you display the tasks, check if it's yours, and only then display it
      for (let i = 0; i < tasks.length; i = i + 1) {
        let item = tasks[i];
        if (item.name == "Jordi") {
          displayTask(item);
        }
      }
    },
    error: function (dets) {
      console.log("Error fetching tasks: ", dets);
    },
  });
}

function getStatusText(taskStatus) {
  switch (taskStatus) {
    case "0":
      return "New";
    case "1":
      return "In Progress";
    case "2":
      return "Blocked";
    case "3":
      return "Completed";
    case "4":
      return "Removed";
    default:
      return "Missing";
  }
}

function displayTask(myTask) {
  let statusText = getStatusText(myTask.taskStatus);
  let syntax = `
  <div class="task">
    <h4>${myTask.taskTitle}</h4>
    <label>${myTask.taskLocation}</label>
    <label>${statusText}</label>
    <div class="dates">
        <label>${myTask.taskDuration} days</label>
        <label>${myTask.taskDeadline}</label>
    </div>
  </div>`;

  $("#task-list").append(syntax);
}

function testRequest() {
  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/",
    type: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (errorDetails) {
      console.log("Error on request", errorDetails);
    },
  });
}

function tooglePanel() {
  console.log("Panel toogled!");
  if (displayPanel == false) {
    $(".pnlForm").fadeOut();
    displayPanel = true;
  } else {
    $(".pnlForm").fadeIn();
    displayPanel = false;
  }
}

// Delete all your tasks
// DELETE request to https://fsdiapi.azurewebsites.net/api/tasks/clear/YOURNAME
function clearAllTasks() {
  $.ajax({
    type: "DELETE",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Jordi",
    success: function () {
      $("#task-list").html("");
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function init() {
  // runTests();
  console.log("Task Manager");
  //Load data
  fetchTasks();

  // Hook events
  $("#icon-important").click(toogleImportant);
  $("#btnShowHide").click(tooglePanel);
  $("#btnSave").click(saveTask);
  $("#btnDeleteTasks").click(clearAllTasks);
}

window.onload = init;
