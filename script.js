let Input = document.getElementById("Input");
let Btn = document.getElementById("Btn");
let Name = document.getElementById("Name");
let Tempirature = document.getElementById("Tempirature");
let Icon = document.getElementById("Icon");
let ErrorMessage = document.getElementById("Error");
let Description = document.getElementById("Description");
let Wind = document.getElementById("Wind");
let Humidity = document.getElementById("Humidity");

Btn.addEventListener("click", function () {
  let CityName = Input.value.trim();
  getWeatherData(CityName);
});

Input.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    let CityName = Input.value.trim();
    getWeatherData(CityName);
  }
});

async function getWeatherData(CityName) {
  const API_KEY = "7c1162361cf595ebfe76aab12959b017";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${API_KEY}&units=metric`
    );
    const weather = await response.json();
    if (weather.cod == 200) {
      DisplayData(weather);
    } else {
      Name.textContent = "";
      Tempirature.textContent = "";
      Icon.src = "";
      Description.textContent = "";
      Wind.textContent = "";
      Humidity.textContent = "";
      ErrorMessage.textContent = weather.message;
    }
  } catch (error) {
    Name.textContent = "";
    Tempirature.textContent = "";
    Icon.src = "";
    Description.textContent = "";
    Wind.textContent = "";
    Humidity.textContent = "";
    ErrorMessage.textContent = error.message;
  }
}

function DisplayData(weather) {
  ErrorMessage.textContent = "";
  Name.textContent = weather.name;
  Tempirature.textContent = weather.main.temp + " °C";
  Icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  Icon.classList = "h-24 mx-auto sm:mx-0";
  Description.textContent = weather.weather[0].description;
  Wind.textContent = weather.wind.speed + " (km/h)";
  Humidity.textContent = weather.main.humidity + "%";
}
window.onload = () => {
  getWeatherData("Algeria");
  Input.value = "Algeria";
};
