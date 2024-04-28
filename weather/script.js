function toggleDropdown() {
    document.getElementById("cityDropdown").classList.toggle("show");
}

function selectCity(city) {
    document.getElementById("cityInput").value = city;
    toggleDropdown();
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

async function getWeather() {
    var selectedCity = $('#cityInput').val();
        const apiKey = 'f961d4e0548cd0922b399b7cd45dca7f';
        const cityInput = document.getElementById('cityInput').value;
        const weatherInfoContainer = document.getElementById('weatherInfo');
    
        try {
            // Current weather data
            const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`);
            const currentData = await currentResponse.json();
    
            // 5-day forecast data
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`);
            const forecastData = await forecastResponse.json();
    
            if (currentResponse.ok && forecastResponse.ok) {
                // Display current weather
                const temperature = currentData.main.temp;
                const description = currentData.weather[0].description;
                const iconCode = currentData.weather[0].icon;
                const humidity = currentData.main.humidity;
                const windSpeed = currentData.wind.speed;
    
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZoneName: 'short',
                });
    
                weatherInfoContainer.innerHTML = `
                    <div>
                        <h2>${currentData.name}, ${currentData.sys.country}</h2>
                        <p>${formattedDate}</p>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Description: ${description}</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                        <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
                    </div>`;
    
                // Display 5-day forecast
                const forecastList = forecastData.list;
                const forecastContainer = document.createElement('div');
                forecastContainer.innerHTML = '<h2>5-Day Forecast</h2>';
    
                for (let i = 0; i < forecastList.length; i += 8) {
                    const forecastDate = new Date(forecastList[i].dt * 1000);
                    const formattedForecastDate = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
                    const forecastTemperature = forecastList[i].main.temp;
                    const forecastDescription = forecastList[i].weather[0].description;
                    const forecastIconCode = forecastList[i].weather[0].icon;
    
                    forecastContainer.innerHTML += `
                        <div class="forecast-item">
                            <p>${formattedForecastDate}</p>
                            <p>Temperature: ${forecastTemperature}°C</p>
                            <p>Description: ${forecastDescription}</p>
                            <img src="http://openweathermap.org/img/w/${forecastIconCode}.png" alt="Weather Icon">
                        </div>`;
                }
    
                weatherInfoContainer.appendChild(forecastContainer);
            } else {
                weatherInfoContainer.innerHTML = `<p>Error: ${currentData.message || forecastData.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfoContainer.innerHTML = '<p>An error occurred while fetching weather data.</p>';
        }
    }    
