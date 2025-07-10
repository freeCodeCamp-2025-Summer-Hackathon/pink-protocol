import { defineConfig } from 'eslint/config'
import { FlatCompat } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
})

export default defineConfig([
  { ignores: ['dist'] },

  js.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  importPlugin.flatConfigs.recommended,

  ...compat.extends('plugin:jsx-a11y/recommended'),

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-sort-props': ['warn', { callbacksLast: true, shorthandLast: true }],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'no-console': 'warn',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
