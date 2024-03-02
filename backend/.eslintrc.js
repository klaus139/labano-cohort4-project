module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',  // Make sure 'prettier' is included in the 'extends' array
      ],
      
    rules: {
      // Double quotes instead of single quotes
      quotes: ['error', 'double'],
  
      // Use 2 spaces for indentation
      indent: ['error', 2, { SwitchCase: 1 }],
  
      // Enforce a space before and after arrow functions
      'arrow-spacing': ['error', { before: true, after: true }],
  
      // Require a newline at the end of files
      'eol-last': ['error', 'always'],
  
      // No trailing spaces at the end of lines
      'no-trailing-spaces': 'error',
  
      // Enforce a space after the comma and before the next element
      'comma-spacing': ['error', { before: false, after: true }],
  
      // Enforce consistent spacing inside an array brackets
      'array-bracket-spacing': ['error', 'never'],
  
      // Enforce consistent spacing inside object literals
      'object-curly-spacing': ['error', 'always'],
  
      // Require a space before blocks
      'space-before-blocks': 'error',
  
      // Require space after certain keywords
      'keyword-spacing': ['error', { before: true, after: true }],
  
      // Disallow multiple empty lines
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
      
      // Require consistent linebreak style
      'linebreak-style': ['error', 'unix'],
  
      // Disallow unused variables
      'no-unused-vars': 'error',
    },
  };
  