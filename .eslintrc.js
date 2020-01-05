module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
  },

  extends: ['plugin:prettier/recommended', 'airbnb-base'],

  plugins: ['prettier'],

  env: {
    es6: true,
    browser: true,
  },

  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        'arrow-parens': 'avoid',
        tabWidth: 3,
        semi: false,
      },
    ],
    /*
     ### Styling ###

  # Prefer new line before return
  # http://eslint.org/docs/rules/newline-before-return
  */
    'newline-before-return': error, //# airbnb default: off

    /*### Variables ###

  # Functions and classes can be used before declaration
  # http://eslint.org/docs/rules/no-use-before-define
  */
    //# airbnb default: ['error', { functions: true, classes: true, variables: true }]
    'no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: true },
    ],
    'no-undef': 'error',
  },
};
