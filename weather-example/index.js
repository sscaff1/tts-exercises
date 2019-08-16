const containerEl = document.querySelector('#container');
const stationEl = document.getElementById('stationName');
const weatherEl = document.getElementById('weather');
const BASE_URL = 'https://api.oceandrivers.com:443/v1.0';

function createSpot(data) {
  const htmlRegex = /.+\.html$/;
  const spotHtml = data
    .map(spot => {
      const isHtml = htmlRegex.test(spot.url);
      const iframe = `<iframe src="${spot.url}" height="200"></iframe>`;
      const picture = isHtml ? iframe : `<img src=${spot.url} />`;
      return `
        <div>
          <h3>${spot.name}</h3>
          ${picture}
        </div>
      `;
    })
    .join('');
  containerEl.innerHTML = spotHtml;
}

function getWebcams() {
  fetch(`${BASE_URL}/getWebCams/`)
    .then(resp => resp.json())
    .then(createSpot);
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
