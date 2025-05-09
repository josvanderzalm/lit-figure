import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';

export default defineConfig([
    globalIgnores(['dist/**/*', 'node_modules/**/*']),
    ...tseslint.configs.recommended,
    {
        ignores: ['package-lock.json', 'dist', 'build', '**/node_modules/**'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts}'],

        plugins: {
            js,
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',

            // Blank line rules
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: 'return' },
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
                {
                    blankLine: 'never',
                    prev: ['const', 'let', 'var'],
                    next: ['const', 'let', 'var'],
                },
                { blankLine: 'always', prev: '*', next: 'function' },
                { blankLine: 'always', prev: 'function', next: '*' },
            ],
        },
    },

    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            globals: globals.browser,
        },
    },

    {
        files: ['**/*.json'],
        plugins: { json },
        language: 'json/json',
        extends: ['json/recommended'],
    },

    {
        files: ['**/*.md'],
        plugins: { markdown },
        language: 'markdown/gfm',
        extends: ['markdown/recommended'],
    },

    {
        files: ['**/*.css'],
        plugins: { css },
        language: 'css/css',
        extends: ['css/recommended'],
    },
    prettier,
]);
