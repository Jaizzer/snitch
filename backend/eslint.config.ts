// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig(
	{
		files: ['src/**/*.ts'],
		extends: [
			js.configs.recommended,
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
		],
		languageOptions: {
			globals: {
				...globals.node,
			},
			parserOptions: {
				projectService: true,
			},
		},
		rules: {
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{ allowNumber: true },
			],
		},
	},
	prettierConfig,
);
