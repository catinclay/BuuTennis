module.exports = {
  "plugins": [
    "prettier"
  ],
  extends: [
    'airbnb-base',
    'prettier',
  ],
  env: {
    browser: true,
  },
  "rules": {
    "strict": 0,
    "prettier/prettier": ["error", {
      trailingComma: 'es5',
      singleQuote: true,
    }],
  },
};
