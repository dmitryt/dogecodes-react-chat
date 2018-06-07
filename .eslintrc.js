module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
  },
  "rules": {
    "react/jsx-filename-extension": "off",
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    "react/forbid-prop-types": [0, { "forbid": ["object"] }]
  }
};
