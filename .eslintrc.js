module.exports = {
   extends: ['plugin:prettier/recommended', 'airbnb-base'],

   plugins: ['prettier', 'mocha'],

   parserOptions: {
      ecmaVersion: 2017,
   },

   env: {
      es6: true,
      browser: true,
      mocha: true,
   },

   rules: {
      'prettier/prettier': [
         'error',
         {
            singleQuote: true,
            trailingComma: 'all',
            tabWidth: 3,
         },
      ],
      /*
     ### Styling ###

  # Prefer new line before return
  # http://eslint.org/docs/rules/newline-before-return
  */
      // 'newline-before-return': 'error', //# airbnb default: off

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

      'no-unused-vars': ['error'],
      'consistent-return': 0,
      'no-shadow': 0,
      'no-underscore-dangle': 0,
      'function-paren-newline': 0,
      'import/no-dynamic-require': 0,

      'no-param-reassign': 0,
      'linebreak-style': [0],
      'prefer-destructuring': ['error', { object: true, array: false }],

      indent: ['error', 3],
      // ### Debugging is allowed but not allowed to commit ###
      'no-console': 'warn', // # airbnb default: 'error'
      'no-debugger': 'warn', // # airbnb default: 'error'

      'implicit-arrow-linebreak': ['error', 'below'],
      'arrow-parens': ['error', 'as-needed'],
      // a rule for mocha test runner
      'mocha/no-exclusive-tests': 'error',
   },
};
