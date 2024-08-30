import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import configs, { extendNamingConventions } from 'rete-cli/configs/eslint.mjs'
import globals from 'globals'

export default tseslint.config(
  ...configs,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
    },
  },
  react.configs.flat.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2017
      }
    }
  },
  {
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        ...extendNamingConventions(
          {
            'selector': 'variable',
            'format': ['camelCase', 'UPPER_CASE', 'PascalCase'],
            'leadingUnderscore': 'allow'
          },
          {
            'selector': 'function',
            'format': ['camelCase', 'PascalCase'],
            'leadingUnderscore': 'allow'
          }
        )
      ],
      '@typescript-eslint/no-deprecated': 'warn',
      'react/no-deprecated': 'warn',
      '@typescript-eslint/unbound-method': 'off'
    }
  }
)