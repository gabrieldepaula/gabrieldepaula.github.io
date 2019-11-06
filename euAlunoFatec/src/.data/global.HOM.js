const data = require('./global.PROD.js');

module.exports = Object.assign({}, data, {
    base: '/build/',
});
