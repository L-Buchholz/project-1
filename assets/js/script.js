///CALENDAR JAVASCRIPT
//Variables

var today = moment();
var dayWeek = today.format("dddd");
var monthDay = today.format("MMM Do");
$("#currentDay").text("Today is " + dayWeek + ", " + monthDay);

/*For body header*/
var day = today.day();

//FUNCTIONS

/*Body header: Sets dates for the current week AND current date, 
both incorporating days of the week*/
/*MomentJs: day(1) = Monday, day(7) = following Sunday (based on
  Sunday (index 0) -- Saturday (index 6) week*/
var weekStart = moment().day(1).format("MMM Do");
var weekEnd = moment().day(7).format("MMM Do");
$("#currentWeek").text(
  "Week of Monday, " + weekStart + ", " + " to Sunday, " + weekEnd
);

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

        /*Determines if current calendar week includes any holidays, by day*/
        for (var i = 0; i < data.response.holidays.length; i++) {
          var date = data.response.holidays[i].date.iso;
          var dayOfWeek = moment().day(calendarDay).format("YYYY-MM-DD");
          /*Refers to each individual line (calendarDay)
          To test this on non-holiday weeks: Change === to !== */
          if (dayOfWeek === date && calendarDay !== day) {
            $(currentDay).find("textarea").attr("placeholder", "US holiday");
            $(currentDay).addClass("holiday");
          } else {
            /*Tests code in dev -- not visible on page (16 national holidays x 7 days)*/
            console.log("Not a holiday");
          }
        }
      }
    });
};
holidays();

var emailVerification = function () {
  var email = "ohall1223@gmail.com";
  // document.querySelector("#sign-up-btn")
  var pizzaAPI = `https://www.validator.pizza/email/${email}`;

  fetch(pizzaAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let emailStatus = data.status;
      console.log(emailStatus);

      if (emailStatus === 200) {
        console.log("Working");
      } else {
        console.log("Didn't work");
      }
    });
};
emailVerification();

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
  var saveButton = $(calendarRow).find("img");
  /*Selects the associated text area for a given calendar row*/
  var textArea = $(calendarRow).find("textarea");
  var taskText = textArea.val().trim();
  if (saveButton.is(event.target)) {
    /*Save text to localStorage by row (dayId)*/
    localStorage.setItem(dayId, taskText);
  }
}

//todo/task functions
var itemContainers = [].slice.call(
  document.querySelectorAll(".board-column-content")
);
var columnGrids = [];
var boardGrid;

// Define the column grids so we can drag those
// items around.
itemContainers.forEach(function (container) {
  // Instantiate column grid.
  var grid = new Muuri(container, {
    items: ".board-item",
    layoutDuration: 400,
    layoutEasing: "ease",
    dragEnabled: true,
    dragSort: function () {
      return columnGrids;
    },
    dragSortInterval: 0,
    dragContainer: document.body,
    dragReleaseDuration: 400,
    dragReleaseEasing: "ease",
  })
    .on("dragStart", function (item) {
      // Let's set fixed widht/height to the dragged item
      // so that it does not stretch unwillingly when
      // it's appended to the document body for the
      // duration of the drag.
      item.getElement().style.width = item.getWidth() + "px";
      item.getElement().style.height = item.getHeight() + "px";
    })
    .on("dragReleaseEnd", function (item) {
      // Let's remove the fixed width/height from the
      // dragged item now that it is back in a grid
      // column and can freely adjust to it's
      // surroundings.
      item.getElement().style.width = "";
      item.getElement().style.height = "";
      // Just in case, let's refresh the dimensions of all items
      // in case dragging the item caused some other items to
      // be different size.
      columnGrids.forEach(function (grid) {
        grid.refreshItems();
      });
    })
    .on("layoutStart", function () {
      // Let's keep the board grid up to date with the
      // dimensions changes of column grids.
      boardGrid.refreshItems().layout();
    });

  // Add the column grid reference to the column grids
  // array, so we can access it later on.
  columnGrids.push(grid);
});

// Instantiate the board grid so we can drag those
// columns around.
boardGrid = new Muuri(".board", {
  layoutDuration: 400,
  layoutEasing: "ease",
  dragEnabled: true,
  dragSortInterval: 0,
  dragStartPredicate: {
    handle: ".board-column-header",
  },
  dragReleaseDuration: 400,
  dragReleaseEasing: "ease",
});
