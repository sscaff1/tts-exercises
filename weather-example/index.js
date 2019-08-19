import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const containerEl = document.querySelector('#container');
const stationEl = document.getElementById('stationName');
const weatherEl = document.getElementById('weather');
const BASE_URL = 'https://api.oceandrivers.com:443/v1.0';

function getMapCenter(data) {
  return data.reduce(
    (center, spot) => {
      const [lat, lon] = center;
      const { latitude, longitude } = spot;
      if (!lat && !lon) {
        return [latitude, longitude];
      }
      return [(lat + latitude) / 2, (lon + longitude) / 2];
    },
    [0, 0]
  );
}

function renderMap(data) {
  const center = getMapCenter(data);
  const map = L.map('container', {
    center,
    zoom: 7,
  });

  L.tileLayer(
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 15,
      id: 'mapbox.streets',
      accessToken:
        'pk.eyJ1Ijoic3NjYWZmMSIsImEiOiJjanpqMTVld3owM2hhM21tZ2Jiemw0aTJkIn0.quT8MlbYtP6rfn7Rp5qh0A',
    }
  ).addTo(map);

  for (let i = 0; i < data.length; i += 1) {
    const { latitude, longitude } = data[i];
    const marker = L.circleMarker([latitude, longitude]).addTo(map);
    marker.bindPopup(createSpot(data[i]));
  }
}

function createSpot(spot) {
  const htmlRegex = /.+\.html$/;
  const isHtml = htmlRegex.test(spot.url);
  const iframe = `<iframe src="${spot.url}" height="200"></iframe>`;
  const picture = isHtml ? iframe : `<img src=${spot.url} />`;
  return `
        <div>
          <h3>${spot.name}</h3>
          ${picture}
        </div>
      `;
}

function getWebcams() {
  fetch(`${BASE_URL}/getWebCams/`)
    .then(resp => resp.json())
    .then(renderMap);
}

function convertToF(temp) {
  return (temp * 9) / 5 + 32;
}

function renderWeather(data) {
  weatherEl.innerHTML = `
    <p>Temperature: ${convertToF(data.TEMPERATURE)}</p>
    <p>Humidity: ${data.HUMIDITY}</p>
  `;
}

function getWeatherForStation(e) {
  const currentValue = e.target.value;
  fetch(`${BASE_URL}/getWeatherDisplay/${currentValue}/`)
    .then(resp => resp.json())
    .then(renderWeather);
}

getWebcams();

stationEl.addEventListener('change', getWeatherForStation);
