let map = L.map('map').setView([51.5074, -0.1278], 10)
let lat = 51.5074;
let lng = -0.1278;

let locationText = document.getElementById("location");
let date = document.getElementById("date");

let windSpeed = document.getElementById("windSpeed");
let humidity = document.getElementById("humidity");
let visibility = document.getElementById("visibility");
let airQuality = document.getElementById("airQuality");

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
        console.log(now);
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        console.log("Weather data:", data);

        locationText.innerText = `${data.name}, ${data.sys.country}`

        windSpeed.innerText = `${data.wind.speed} km/h`;
        humidity.innerText = `${data.main.humidity}%`;
        visibility.innerText = `${parseInt(data.visibility, 10) / 1000} km`
    } catch (err) {
        console.error("Error fetching weather:", err);
    }
}