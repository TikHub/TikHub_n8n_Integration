module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  extends: ['plugin:n8n-nodes-base/community'],
  rules: {
    // Disable unavailable rules
    'n8n-nodes-base/node-param-default-missing': 'off',
    'n8n-nodes-base/node-param-description-missing': 'off',
  },
};
