import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import love from 'eslint-config-love';
import prettierPluginRecomended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import pluginPromise from 'eslint-plugin-promise';
import tailwind from 'eslint-plugin-tailwindcss';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'eslint.config.js', 'lint-staged.config.mjs', 'tailwind.config.js', 'postcss.config.js'] },
  love,
  prettierPluginRecomended,
  pluginPromise.configs['flat/recommended'],
  ...tailwind.configs['flat/recommended'],
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': ['warn'],

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'sibling', 'type'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
            },
            {
              pattern: '~+(*)/**',
              group: 'internal',
            },
            {
              pattern: '~+(*)',
              group: 'internal',
            },
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'object-curly-spacing': ['warn', 'always'],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/semi': ['off'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          ignoreRestArgs: true,
        },
      ],
      '@typescript-eslint/return-await': 'error',
      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      'react/jsx-key': 'error',
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-wrap-multilines': 'off',
      'react/destructuring-assignment': 'off',
      'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          cssFiles: ['**/*.css', '**/*.scss', '!**/node_modules', '!**/.*', '!**/dist', '!**/build'],
          callees: ['cn', 'cx', 'twMerge', 'cva'],
        },
      ],
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'tailwindcss/classnames-order': [
        'warn',
        {
          callees: ['cn', 'cx', 'twMerge', 'cva'],
        },
      ],
    },
  },
  eslintConfigPrettier
);
