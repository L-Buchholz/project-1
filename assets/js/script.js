//CALENDAR JAVASCRIPT
//Variables

var today = moment();
var dayWeek = today.format("dddd");
var monthDay = today.format("MMM Do");
$("#currentDay").text("Today is " + dayWeek + ", " + monthDay);

/*For body header*/
var day = today.day();

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
          //console.log("This is a holiday!")
          $(textArea).val("Public holiday");
        } else {
          //console.log("Not a holiday");
          $(textArea).val("Not a holiday");
        }
      }
    });
};
holidays();

/*Body header: Sets dates for the current week AND current date, 
both incorporating days of the week*/
/*MomentJs: day(1) = Monday, day(7) = following Sunday (based on
  Sunday (index 0) -- Saturday (index 6) week*/
var weekStart = moment().day(1).format("MMM Do");
var weekEnd = moment().day(7).format("MMM Do");
$("#currentWeek").text(
  "Week of Monday, " + weekStart + ", " + " to Sunday, " + weekEnd
);

/*Establishes calendar week as a Monday -- Sunday loop*/
for (var calendarDay = 1; calendarDay < 8; calendarDay++) {
  var currentDay = $("#" + calendarDay);
  if (day == calendarDay) {
    currentDay.addClass("present");
  } else if (day > calendarDay) {
    currentDay.addClass("past");
  } else {
    currentDay.addClass("future");
  }
  /*Saves user-generated text to calendar text areas 
  (here calendarDay points at the value stored by dayId, 
  which is defined below)*/
  var textArea = $(currentDay).find("textarea");
  var savedValue = localStorage.getItem(calendarDay);
  $(textArea).val(savedValue);
}

//EVENT LISTENERS
/*Enable "save" buttons to save items to localStorage)*/
$(".row").on("click", saveHandler);
/*Function designates click event by row (instead of applying to all of them)*/
function saveHandler(event) {
  /*Selects a specific row element (not yet defined)*/
  var calendarRow = event.currentTarget;
  /*Selects "id" element to dictate what day the event handler applies to (i.e., which row)*/
  var dayId = calendarRow.getAttribute("id");
  /*Selects the associated button for a given calendar row*/
  var saveButton = $(calendarRow).find("button");
  /*Selects the associated text area for a given calendar row*/
  var textArea = $(calendarRow).find("textarea");
  var taskText = textArea.val().trim();
  if (saveButton.is(event.target)) {
    /*Save text to localStorage by row (dayId)*/
    localStorage.setItem(dayId, taskText);
  }
}
