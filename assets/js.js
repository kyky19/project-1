// Create variable with openweathermap API key
const apiWeatherKey = "8d62924fd8eaa2c65c4ef4e4018b0fe2"
const apiTicketKey= "4HBX1EGPuPtpVUA1BB1BxkNAwsSNstap"
var inputEL = document.querySelector('#cityinput');
var city;
var cities;
// console.log for ticketmasterapi
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
