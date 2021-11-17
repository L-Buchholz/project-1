//Variables for the following functions

var today = moment();
var dayWeek = today.format("dddd");
var monthDay = today.format("MMM Do");
$("#currentDay").text("Today is " + dayWeek + ", " + monthDay);

//Establishes current day
var day = today.day();
//var hour = moment().hour();
console.log(currentDay);

//FUNCTIONS

//$("#currentWeek").text("Week of " + )

/*for (var calendarWeek = 1; calendarWeek < 8; calendarWeek++) {
  var monthWeekday = today.format("MMM Do")
  if (monthWeekday = 1)
}
  var currentWeek
)
*/

//for (var calendarHour = #; calendarHour < #; calendarHour++)
for (var calendarDay = 1; calendarDay < 8; calendarDay++) {
  //var currentHour = $("#" + calendarHour);
  var currentDay = $("#" + calendarDay);
  //if (hour == calendarHour)
  if (day == calendarDay) {
    //currentHour.addClass("present");
    currentDay.addClass("present");
    //else if (hour > calendarHour)
  } else if (day > calendarDay) {
    //currentHour.addClass("past");
    currentDay.addClass("past");
  } else {
    //currentHour.addClass("future");
    currentDay.addClass("future");
  }

  //Follows functions defined below; here calendarDay points at the item stored by dayId
  //var textArea = $(currentHour).find("textarea");
  var textArea = $(currentDay).find("textarea");
  //var savedValue = localStorage.getItem(calendarHour);
  var savedValue = localStorage.getItem(calendarDay);
  //$(textArea).val(savedValue);
  $(textArea).val(savedValue);
}

//EVENT LISTENERS (Allows "save" button to save items to localStorage)
$(".row").on("click", saveHandler);
//Function designates click event by row (instead of applying to all of them)
function saveHandler(event) {
  //Selects a specific row element (not yet defined)
  //var calendarRow = event.currentTarget;
  var calen;
  //Selects "id" element to dictate what hour the event handler applies to (i.e., which row)
  var hourId = calendarRow.getAttribute("id");
  //Selects the associated button for a given calendar row
  var saveButton = $(calendarRow).find("button");
  //Selects the associated text area for a given calendar row
  var textArea = $(calendarRow).find("textarea");
  var taskText = textArea.val().trim();
  if (saveButton.is(event.target)) {
    //Save text to localStorage by row (hourId)
    localStorage.setItem(hourId, taskText);
  }
}
