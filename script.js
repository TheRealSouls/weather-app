let map = L.map('map').setView([0, 0,], 1)

L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=qp7uy5rCF4Ij9uDMupR6', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);
let marker = L.marker([51.5, -0.09]).addTo(map);

map.on('click', function(e) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    marker.setLatLng([lat, lng])
})