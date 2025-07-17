const kintoneConfig = require('@cybozu/eslint-config/flat/presets/kintone-customize')
const prettierConfig = require('@cybozu/eslint-config/flat/presets/typescript-prettier')

module.exports = [
  ...kintoneConfig,
  ...prettierConfig,
  {
    ignores: ['dist/**', 'eslint.config.js', 'webpack.config.js']
  },
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      'prettier/prettier': [
        'error',
        {
          semi: false,
          trailingComma: 'none',
          singleQuote: true,
          printWidth: 100,
          tabWidth: 2
        }
      ]
    }
  }
]
