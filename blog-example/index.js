const BASE_URL = 'https://chroniclingamerica.loc.gov/';
const blogEl = document.getElementById('blog');
const loadingEl = document.querySelector('.loading');

function getArticles() {
  return fetch(
    `${BASE_URL}/search/titles/results/?terms=new_orleans&format=json`
  )
    .then(resp => resp.json())
    .then(articles => {
      window.localStorage.setItem(
        'articles',
        JSON.stringify({ articles, expTime: getTomorrow() })
      );
      return articles;
    });
}

function getTomorrow() {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  return tomorrow;
}

function formatData(data) {
  return data.items
    .map(article => {
      return `
      <a href="details.html?articleId=${
        article.lccn
      }" class="detailsLink" data-articleid=${article.lccn}>
        <div class="article">
          <h3>${article.title}</h3>
          <p>Published By: ${article.publisher}</p>
          <p>Location: ${article.place_of_publication}</p>
          <p>Year: ${article.start_year}</p>
        </div>
      </a>
    `;
    })
    .join('');
}

function toggleLoading(isLoading = false) {
  if (isLoading) {
    loadingEl.classList.remove('hidden');
    blogEl.classList.add('hidden');
  } else {
    loadingEl.classList.add('hidden');
    blogEl.classList.remove('hidden');
  }
}

// function scrollUser() {
//   const savedScroll = window.localStorage.getItem('scrolled');
//   if (savedScroll) {
//     window.scrollTo({ top: savedScroll });
//   }
// }

function startApp() {
  const currentDate = new Date();
  const savedArticles = window.localStorage.getItem('articles');
  const { articles, expTime } =
    (savedArticles && JSON.parse(savedArticles)) || {};
  if (savedArticles && currentDate < new Date(expTime)) {
    const formattedArticles = formatData(articles);
    renderListOfArticles(formattedArticles);
    toggleLoading();
  } else {
    toggleLoading(true);
    getArticles()
      .then(formatData)
      .then(renderListOfArticles)
      .then(() => toggleLoading());
    // .then(scrollUser);
  }
}

function renderListOfArticles(html) {
  blogEl.innerHTML = html;
}

startApp();

// function goToDetails(e) {
//   e.preventDefault();

//   const aEl = e.target.closest('.detailsLink');
//   if (aEl) {
//     window.localStorage.setItem('scrolled', window.scrollY);
//     window.location.href = `details.html?articleId=${aEl.dataset.articleid}`;
//   }
// }

// blogEl.addEventListener('click', goToDetails);
