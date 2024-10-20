// Инициализируем карту
const map = L.map('map').setView([51.505, -0.09], 13); // Стартовая позиция

// Загружаем тайлы карты OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Обработчик успешного нахождения местоположения
function onLocationFound(e) {
    const radius = e.accuracy / 2;

    // Добавляем маркер на текущее местоположение
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    // Добавляем круг для точности местоположения
    L.circle(e.latlng, radius).addTo(map);
}

// Обработчик ошибки получения местоположения
function onLocationError(e) {
    alert("Unable to retrieve your location: " + e.message);
}

// Запрашиваем местоположение пользователя
map.locate({ setView: true, maxZoom: 16 });

// События для обработки местоположения
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
