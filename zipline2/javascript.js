var api = "8570ec4cec331c2eb979ca08046a6797";

























var weatherData = function(city,temperature,windSpeed,condition,humidity){
  this.city = city;
  this.temperature = temperature - 273.15;
  this.windSpeed = windSpeed;
  this.humidity = humidity;
  this.condition = condition;
};

var readJSONFile = function(zipCode,countryCode){
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + countryCode + "&appid=" + api,
  function(json){
      cityname = new weatherData(json.name,json.main.temp,json.wind.speed,json.weather[0].description,json.main.humidity);
      newCitySelector(cityname);
  });
};

var newCitySelector = function(cityname){
  $(".container").css("background-color","rgba(255,255,255,0.25)");
  $("#weatherIcon").css("color","black");
  $("#cityName").css("color","black");
  $("#temperature").css("color","black");
  if (cityname.condition.includes("rain")){
    document.body.style.backgroundImage = "url(rain.jpg)"
    document.getElementById("weatherIcon").className = "wi wi-day-rain";
    document.getElementById("funImage").src = "notlikethis.png"
  }else if (cityname.condition.includes("snow")){
    document.body.style.backgroundImage = "url(snow.jpg)"
    document.getElementById("weatherIcon").className = "wi wi-day-snow";
    document.getElementById("funImage").src = "KappaClause.png"
  }else if (cityname.condition.includes("cloud")){
    document.body.style.backgroundImage = "url(clouds.jpg)"
    document.getElementById("weatherIcon").className = "wi wi-cloudy";
    document.getElementById("funImage").src = "Kappa.png"
  }else{
    document.body.style.backgroundImage = "url(sunny.jpg)"
    document.getElementById("funImage").src = "mingLee.png"
    $(".container").css("background-color","rgba(0,0,0,0.3)");
    $("#weatherIcon").css("color","white");
    $("#cityName").css("color","white");
    $("#temperature").css("color","white");
    document.getElementById("weatherIcon").className = "wi wi-day-sunny";
  }
  document.getElementById("cityName").innerHTML = cityname.city;
  document.getElementById("temperature").innerHTML = Math.round(cityname.temperature*100)/100 + "&deg;C";
  document.getElementById("windData").innerHTML = cityname.windSpeed + " Knots";
  document.getElementById("conditionData").innerHTML = cityname.condition;
  document.getElementById("humidityData").innerHTML = cityname.humidity + " %";
};



$(document).ready(function(){
  $("#temperature").click(function(event){
    var temperature = document.getElementById("temperature").innerHTML;
    if (temperature.includes("C")){
      document.getElementById("temperature").innerHTML = Math.round((temperature.substr(0,temperature.length-2) * 9/5 + 32)*100)/100 + "&deg;F";
    }else{
      document.getElementById("temperature").innerHTML = Math.round(((temperature.substr(0,temperature.length-2) -32) * 5/9)*100)/100 + "&deg;C";
    }
  });
  $("form").submit(function(event) {
      event.preventDefault();
      var zipCode = $("#zipCode")
      var countryCode = $("#countryCode")
      console.log(/^\w{2,3}-\w{2,3}$/.test(countryCode.val()));
      if (/^\w{2,3}-\w{2,3}$/.test(countryCode.val()) === true || countryCode.val() === "" && zipCode.val()){
        readJSONFile(zipCode.val(),countryCode.val());
        zipCode.val("");
        countryCode.val("");
      }else{
        if(window.confirm("Please use ISO 3166-2 Codes located here: https://en.wikipedia.org/wiki/ISO_3166-2. Would you like me to redirect you?")){
          window.open("https://en.wikipedia.org/wiki/ISO_3166-2");
        }

      }
    });
  readJSONFile("48060","US-MI");
});
