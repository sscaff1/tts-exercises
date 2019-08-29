const moment = require('moment');

function getTime() {
  return moment().format('h:mm:ss a');
}

module.exports = getTime;
