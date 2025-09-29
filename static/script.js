let map = L.map('map').setView([51.5074, -0.1278], 10)
let lat = 51.5074;
let lng = -0.1278;

let locationText = document.getElementById("location");
let date = document.getElementById("date");

let weatherIcon = document.getElementById("weatherIcon");
let temperature = document.getElementById("temperature");
let weatherCondition = document.getElementById("weatherCondition");

let windSpeed = document.getElementById("windSpeed");
let humidity = document.getElementById("humidity");
let visibility = document.getElementById("visibility");
let atmosphericPressure = document.getElementById("atmosphericPressure");

L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=qp7uy5rCF4Ij9uDMupR6', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);
let marker = L.marker([51.5074, -0.1278]).addTo(map);

map.on('click', function(e) {
    lat = e.latlng.lat;
    lng = e.latlng.lng;

    marker.setLatLng([lat, lng])
    getResponse(lat, lng);
})

async function getResponse(lat, lng) {
    try {
        const res = await fetch(`/weather?lat=${lat}&lng=${lng}`);
        const data = await res.json();

        const now = new Date();
        
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        
        date.innerText = `${year}/${month}/${day}`

        console.log("Weather data:", data);

        if (!data.name || data.sys.country == undefined) {
            locationText.innerText = "Unknown location";
        } else {
            locationText.innerText = `${data.name}, ${data.sys.country}`;
        }

        temperature.innerText = `${data.main.temp}°`;

        let description = data.weather[0]?.description || "Unknown";
        weatherCondition.innerText = `${description.charAt(0).toUpperCase() + description.slice(1)}`;

        switch (true) {
            case description.includes("drizzle"):
                weatherIcon.innerText = '🌦️';
                break;
            case description.includes("rain"):
                weatherIcon.innerText = '🌧️';
                break;
            case description.includes("snow"):
                weatherIcon.innerText = '❄️';
                break;
            case description.includes("clear"):
                weatherIcon.innerText = '☀️';
                break;
            case description.includes("clouds"):
                weatherIcon.innerText = '☁️';
                break;
            default:
                weatherIcon.innerText = '🌫️';
                break;
        }

        windSpeed.innerText = `${data.wind.speed} km/h`;
        humidity.innerText = `${data.main.humidity}%`;
        visibility.innerText = `${parseInt(data.visibility, 10) / 1000} km`
        atmosphericPressure.innerText = `${data.main.pressure} hPa`
    } catch (err) {
        console.error("Error fetching weather:", err);
    }
}

getResponse(51.5074, -0.1278);