 // Create variable with openweathermap API key
const apiWeatherKey = "8d62924fd8eaa2c65c4ef4e4018b0fe2"
const apiTicketKey= "4HBX1EGPuPtpVUA1BB1BxkNAwsSNstap"

// consol.log for ticketmasterapi
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiTicketKey + "&city=Nashville",
    async:true,
    dataType: "json",
    success: function(json) {
          console.log(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });