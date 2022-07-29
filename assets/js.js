// Create variable with openweathermap API key
const apiWeatherKey = "8d62924fd8eaa2c65c4ef4e4018b0fe2"
const apiTicketKey= "4HBX1EGPuPtpVUA1BB1BxkNAwsSNstap"
var inputEL = document.querySelector('#cityinput');
var city;
var cities;
var submitbtn = document.getElementById("btn");

// // Weather data
function GetInfo() {

  var newName = document.getElementById("cityinput");
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = "--"+newName.value+"--";

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid='+apiWeatherKey+'&units=imperial')
.then(response => response.json())
.then(data => {

  //Getting the min and max values and weather conditions for each day
  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Desc").innerHTML = "Weather: " + (data.list[i].weather[0].description);
  }

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min).toFixed(1)+ "°";
  }

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max).toFixed(1) + "°";
  }

  //Getting Weather Icons
   for(i = 0; i<5; i++){
      document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
      data.list[i].weather[0].icon
      +".png";
  }

  console.log(data)


})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen(){
  document.getElementById("cityinput").defaultValue = "Nashville";
  GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
  if(day + d.getDay() > 6){
      return day + d.getDay() - 7;
  }
  else{
      return day + d.getDay();
  }
}

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
  }





//console.log for ticketmasterapi
  // $.ajax({
  //   type:"GET",
  //   url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiTicketKey + "&city=" + inputEL.value,
  //   async:true,
  //   dataType: "json",
  //   success: function(json) {
  //         console.log(json);

  // 		   },
  //   error: function(xhr, status, err) {
  // 			  console.log(err);
  // 		   }
  // });

  function mostRecent(){
    var lastSearch = localStorage.getItem("mostRecent");
    if (lastSearch) {
      city = lastSearch;
      search();
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

  function cityInput () {
    city = $("#cityinput").val ();
    if (city && cities.includes(city) === false) {
      savetolocalStorage();
      return city;
    }
  };

  $("#btn").on("click",(event) => {
    event.preventDefault();
    cityInput();
    search();
    $("#cityinput").val("");
  });

  function savetolocalStorage (){
    localStorage.setItem("mostRecent", city);
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  function search () {
    $.ajax({
      type: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiTicketKey + "&city=" + inputEL.value,
      async:true,
      dataType: "json",
      success: function (json) {
        console.log(json);
        var e = document.getElementById("events");
        e.innerHTML = json.page.totalElements + " events found.";
      },
      error: function(xhr, status, err) {
        console.log(err);
     }
    });
  }

  function showEvents(json) {
    var items = $('#events .list-group-item');
    items.hide();
    var events = json._embedded.events;
    var item = items.first();
    for (var i=0;i<events.length;i++) {
      item.children('.list-group-item-heading').text(events[i].name);
      item.children('.list-group-item-text').text(events[i].dates.start.localDate);
      try {
        item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
      } catch (err) {
        console.log(err);
      }
      item.show();
      item.off("click");
      item.click(events[i], function(eventObject) {
        console.log(eventObject.data);
        try {
          getAttraction(eventObject.data._embedded.attractions[0].id);
        } catch (err) {
        console.log(err);
        }
      });
      item=item.next();
    }
  }
  function getAttraction(id) {
    $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/attractions/"+id+".json?apikey=" + apiTicketKey,
      async:true,
      dataType: "json",
      success: function(json) {
            showAttraction(json);
           },
      error: function(xhr, status, err) {
            console.log(err);
           }
    });
  }
  
  function showAttraction(json) {
    $('#events-panel').hide();
    $('#attraction-panel').show();
    
    $('#attraction-panel').click(function() {
      getEvents(page);
    });
    
    $('#attraction .list-group-item-heading').first().text(json.name);
    $('#attraction img').first().attr('src',json.images[0].url);
    $('#classification').text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
  }

  submitbtn.addEventListener("click", function (e){
    e.preventDefault();
    getEvents(0);
    GetInfo();
  });
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
    
    
 
    function showEvents(json) {
        for(var i=0; i<json.page.size; i++) {
          $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
        }
      }

      function initMap(position, json) {
        var mapDiv = document.getElementById('map');
        
        
       
      }

    // getLocation();
