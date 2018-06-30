const { compose } = require('react-app-rewired');
const eslint = require('react-app-rewire-eslint');
const polyfills = require('react-app-rewire-polyfills');

module.exports = compose(
  eslint,
  polyfills,
);
