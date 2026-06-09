export default {
	'*.{js,jsx,ts,tsx}': ['eslint', 'prettier --check'],
	'*.{json,yml,yaml,md}': ['prettier --check'],
	'*.{ts, tsx}': [() => 'tsc --noEmit'],
};
