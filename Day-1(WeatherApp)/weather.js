
function getWeather(){
    console.log("The city name");
    const apiKey = '50d085c5da3370089b4a9c0fcf922254';
    const city = document.getElementById('city').value;

    console.log("city name = ",city);
    if(!city){
        alert("Enter city name");
        return;
    }

    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeather)
        .then(response => response.json())
        .then(response => { displayWeather(response) })
        .catch(error => {
            console.error('error fetching current weather data: ',error);
            alert('Error fetching current weather data. Please try again.');
        });
    fetch(forecast)
        .then(response => response.json())
        .then(response => {
            displayHourlyForecast(response.list);
        })
        .catch(error => {
            console.error('error fetching hourly data: ',error);
            alert('Error fetching current hourly forecast data. Please try again.');
        });                     
}

function displayWeather(data){
    const temperature = document.getElementById("temp");
    const weatherInfo = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("city-img");
    const hourlyForcast = document.getElementById("hourly-forecast");

    //Clear prev content
    temperature.innerHTML = '';
    weatherInfo.innerHTML = '';
    hourlyForcast.innerHTML = '';

    if(data.cod === '404'){
        weatherInfo.innerHTML = `<p>${ data.message }</p>`;
    }else{
        const cityName= data.name;
        const temper = Math.round(data.main.temp -273.15);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;


        const temperatureHTML =`
            <p>${temper}C</p>
            `;

        const weatherHTML =`<h2>${cityName}</h2><p>${description}</p>`;

        temperature.innerHTML= temperatureHTML;
        weatherInfo.innerHTML=weatherHTML;
        weatherIcon.src=iconUrl;
        weatherIcon.alt=description;
        showImage();

    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForcast = document.getElementById("hourly-forecast");
    const next24Hours = hourlyData.slice(0,8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt*1000);
        const hour=dateTime.getHours();
        const temperature= Math.round(item.main.temp -273.15);
        const icon = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

        const hourlyInterval = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}C</span>
        </div>`;
        hourlyForcast.innerHTML += hourlyInterval;
    });
}

function showImage(){
    const weatherIcon = document.getElementById('city-img');
    weatherIcon.style.display = 'block';
}