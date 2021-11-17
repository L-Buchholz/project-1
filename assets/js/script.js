//Variables for the following functions

var today = moment();
var dayWeek = today.format("dddd");
var monthDay = today.format("MMM Do");
$("#currentDay").text("Today is " + dayWeek + ", " + monthDay);

//Establishes current day
var day = today.day();
//var hour = moment().hour();

//FUNCTIONS

var holidays = function () {
  var requestUrl =
    "https://calendarific.com/api/v2/holidays?&api_key=430d5f859bcdbc7032378fb6997905cdc22686c1&country=US&year=2021&type=national";
  fetch(requestUrl)
    /*Collects data from URL*/
    .then(function (response) {
      return response.json();
    })
    /*Returns collected data (if response is received) as an object*/
    .then(function (data) {
      console.log(data);

      let date = data.response.holidays[0].date.iso;
      console.log(date);

      for (var i = 0; i < data.response.holidays.length; i++) {
        var today1 = moment().format("YYYY-MM-DD");
        console.log(today1);

        if (today1 === date) {
          console.log("This matches!");
        } else {
          console.log("why you not here?");
        }
      }
    });
};
holidays();

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
