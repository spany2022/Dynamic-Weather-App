const apiKey = "d3770799172980a1738e9c95bf7b3f8c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// we use "units=metric" in API because it converts temperature into degree celcius

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await axios.get(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            document.querySelector(".city").innerHTML = response.data.name;
            document.querySelector(".temp").innerHTML = Math.round(response.data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = response.data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = response.data.wind.speed + "km/h";

            if (response.data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (response.data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (response.data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (response.data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (response.data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png";
            }

            document.querySelector(".weather").style.display = "block";
        }
    } catch (error) {
        // Handle other errors, e.g., network issues
        console.log(error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

