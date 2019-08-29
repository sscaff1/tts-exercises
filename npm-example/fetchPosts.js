const fetch = require('isomorphic-fetch');

function fetchPosts() {
  return fetch('http://jsonplaceholder.typicode.com/posts/1').then(resp =>
    resp.json()
  );
}

module.exports = fetchPosts;
