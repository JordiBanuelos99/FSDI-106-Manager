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
  displayTask(myTask);
}

function displayTask(myTask) {
  let syntax = `
  <div class="task">
    <h4>${myTask.taskTitle}</h4>
    <label>${myTask.taskLocation}</label>
    <div class="dates">
        <label>${myTask.taskDuration} days</label>
        <label>${myTask.taskDeadline}</label>
    </div>
  </div>`;

  $("#task-list").append(syntax);
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

function init() {
  // runTests();
  console.log("Task Manager");
  //Load data

  // Hook events
  $("#icon-important").click(toogleImportant);
  $("#btnShowHide").click(tooglePanel);
}

window.onload = init;
