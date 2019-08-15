const BASE_URL = 'https://chroniclingamerica.loc.gov/';
const detailsEl = document.getElementById('details');
const loadingEl = document.querySelector('.loading');
const aEl = document.querySelector('.back');

function getDetails() {
  const queryString = window.location.search;
  const articleId = queryString.split('=')[1];
  return fetch(`${BASE_URL}/lccn/${articleId}.json`).then(resp => resp.json());
}

function formatData(data) {
  return `
    <h2>${data.name} - ${data.publisher}</h2>
    <p>Number of Issues: ${data.issues.length}</p>
    <p>Published from ${data.start_year} to ${data.end_year}</p>
  `;
}

function toggleLoading(isLoading = false) {
  if (isLoading) {
    loadingEl.classList.remove('hidden');
    detailsEl.classList.add('hidden');
  } else {
    loadingEl.classList.add('hidden');
    detailsEl.classList.remove('hidden');
  }
}

function startApp() {
  getDetails()
    .then(formatData)
    .then(renderDetails)
    .then(() => toggleLoading());
}

function renderDetails(html) {
  detailsEl.innerHTML = html;
}

startApp();

function goBack(e) {
  e.preventDefault();
  window.history.back();
}

aEl.addEventListener('click', goBack);
