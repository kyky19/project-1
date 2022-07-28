// Create variable with openweathermap API key
const apiWeatherKey = "8d62924fd8eaa2c65c4ef4e4018b0fe2"
const apiTicketKey= "4HBX1EGPuPtpVUA1BB1BxkNAwsSNstap"
var inputEL = document.querySelector('#cityinput');
var city;
var cities;
var submitbtn = document.querySelector("#btn");
var eventList = [];
var resultsDisplay = $("#results-display");

function getEvents(){
  $("#results-display").empty();
  $.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiTicketKey + "&city=" + inputEL.value,
    async:true,
    dataType: "JSON",
  }).then(function (response) {
      for (var i =0; i < response._embedded.events.length;i++) {
        var id = response._embedded.events[i].id;
        var name = response._embedded.events[i].name;
        var url =response._embedded.events[i].url;
        var localDateStart = response._embedded.events[i].dates.start.localDate;
        var localTimeStart = response._embedded.events[i].dates.start.localTime;

        if (response._embedded.events[i].hasOwnProperty("images")) {
          if (response._embedded.events[i].images.length > 0){
          for (var j=0; j<response._embedded.events[i].images.length;j++){
          var imagereturn = response._embedded.events[i].images[j].url;
        }
      }
    }

    eventList.push(id,name,url,localDateStart,localTimeStart,imagereturn);
  }
});
return eventList;


function showEvents() {
 if (eventList.length === 0) {return false;}
var tableEl = $("<table>");
tableEl.addClass("table");
var tableElHead = $("<thead><tr><th></th><th>Event Name</th><th>Date</th>");
tableEl.append(tableElHead);
for (var i = 0; i<eventList.length; i++) {
  var tablerow = $("<tr>");
  var tablecell = $("<td>");
  var linkTag = $("<a>");
  linkTag.attr("id",eventList[i].id);
  linkTag.addClass("idQueryString");
  linkTag.attr("href","event.html?id=" + eventList[i].id);
  localStorage.setItem(eventList[i].id);

  var imageTag = $("<img>");
  imageTag.attr("src", eventList[i].imagereturn);
  linkTag.append(imageTag);
  tablecell.append(linkTag);
  tablerow.append(tablecell);

  var tableNCell = $("<td>");
  var linktag1 = $("<a>");
  linktag1.addClass("idQueryString");
  linktag1.attr("href", "event.html?id=" + eventList[i].id);
  tableNCell.append("<h3>" + eventList[i].name + "</h3>");
  linktag1.append(tableNCell);
  tablerow.append(linktag1);

  var tableDCell = $("<td>");
  tableDCell.prepend("<h3>" + eventList[i].localDateStart + "</h3>");
  tablerow.append(tableDCell);
  tableEl.append(tablerow);
}

resultsDisplay.append(tableEl);

}
}

function searchResults() {
  var eventListObject = localStorage.getItem("eventList");
  var myEventList = JSON.parse(eventListObject);
  showEvents(myEventList);
  return console.log(showEvents(myEventList));
}



  function mostRecent(){
    var lastSearch = localStorage.getItem("mostRecent");
    if (lastSearch) {
      city = lastSearch;
    getEvents();
      } 
  }

  mostRecent();

  function recentCities () {
    var recentCities = localStorage.getItem("cities");
    if (recentCities) {
     cities = recentCities;
    } else {
      cities = [];
    }
  }

 recentCities();
 
submitbtn.addEventListener("click", getEvents)
 
    // function getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(showPosition, showError);
    //     } else {
    //         var x = document.getElementById("location");
    //         x.innerHTML = "Geolocation is not supported by this browser.";
    //     }
    // }
    // function showPosition(position) {
    //     var x = document.getElementById("location");
    //     x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
        
    //     var latlon = position.coords.latitude + "," + position.coords.longitude;

        //  $.ajax({
        //   type:"GET",
        //   url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiTicketKey + "&latlong="+latlon,
        //   async:true,
        //   dataType: "json",
        //   success: function(json) {
        //               console.log(json);
        //               var e = document.getElementById("events");
        //               e.innerHTML = json.page.totalElements + " events found.";
        //               showEvents(json);
        //               initMap(position, json);
        //            },
        //   error: function(xhr, status, err) {
        //               console.log(err);
        //            }
        // });
        
    // }


    // function showError(error) {
    //     switch(error.code) {
    //         case error.PERMISSION_DENIED:
    //             x.innerHTML = "User denied the request for Geolocation."
    //             break;
    //         case error.POSITION_UNAVAILABLE:
    //             x.innerHTML = "Location information is unavailable."
    //             break;
    //         case error.TIMEOUT:
    //             x.innerHTML = "The request to get user location timed out."
    //             break;
    //         case error.UNKNOWN_ERROR:
    //             x.innerHTML = "An unknown error occurred."
    //             break;
    //     }
    // }

    