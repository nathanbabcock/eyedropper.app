import globals from 'globals'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import reactRefresh from 'eslint-plugin-react-refresh'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended })

export default [
  // Global ignores
  { ignores: ['node_modules', 'dist'] },

  // Typescript
  ...compat.extends('standard-with-typescript'),

  // React
  {
    ...pluginReactConfig,
    settings: { react: { version: 'detect' } },
    plugins: {
      ...pluginReactConfig.plugins,
      'react-refresh': reactRefresh,
    },
  },

  // Custom rules
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'comma-dangle': 'off',
      'no-constant-condition': ['warn', { checkLoops: false }],
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/consistent-type-imports': ['warn', {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      }],
      '@typescript-eslint/ban-ts-comment': ['warn', {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': 'allow-with-description',
      }],
    },
  },
]
