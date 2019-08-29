const math = require('./math');
const fetchPosts = require('./fetchPosts');
const getTime = require('./getTime');

console.log('2 + 2 =', math.add(2, 2));

console.log('Started fetched at:', getTime());
fetchPosts().then(data => {
  console.log('Data at:', getTime());
  console.log(data);
});
