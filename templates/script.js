let map = L.map('map').setView([51.5074, -0.1278], 10)
let lat = 51.5074;
let lng = -0.1278;

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
        console.log("Weather data:", data);
    } catch (err) {
        console.error("Error fetching weather:", err);
    }
}