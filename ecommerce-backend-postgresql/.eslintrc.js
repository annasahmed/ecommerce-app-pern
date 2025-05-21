module.exports = {
	env: {
		node: true,
		browser: true,
		es6: true,
	},
	extends: ['airbnb-base', 'plugin:prettier/recommended'],
	plugins: ['prettier', 'unused-imports', 'import'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		// Enforce Prettier formatting
		'prettier/prettier': ['error'],

		// Disallow console.log (use logger instead)
		'no-console': 'error',

		// Allow unnamed function expressions (e.g., in callbacks)
		'func-names': 'off',

		// Allow usage of dangling underscores in variable names (e.g., _id)
		'no-underscore-dangle': 'off',

		// Disable enforcing return statements in every function
		'consistent-return': 'off',

		// Allow parameter reassignment but not on object properties
		'no-param-reassign': ['error', { props: false }],

		// Prefer const for variables that are never reassigned
		'prefer-const': 'error',

		// Disallow use of var (prefer let/const)
		'no-var': 'error',

		// Enforce shorthand syntax in object literals
		'object-shorthand': ['error', 'always'],

		// Disable default ESLint unused vars check (use plugin instead)
		'no-unused-vars': 'off',

		// Error on unused imports
		'unused-imports/no-unused-imports': 'error',

		// Warn on unused variables but allow ones starting with "_"
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],

		// Disallow duplicate imports
		'import/no-duplicates': 'error',

		// Enforce a structured order for import statements
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				'newlines-between': 'always',
			},
		],

		// Allow devDependencies in test, scripts, and config files
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/*.test.js',
					'**/tests/**',
					'**/scripts/**',
				],
			},
		],

		// Disallow variable shadowing
		'no-shadow': 'error',

		// Require strict equality (=== and !==)
		eqeqeq: ['error', 'always'],

		// Limit to one empty line
		'no-multiple-empty-lines': ['error', { max: 1 }],

		// Require concise arrow functions when possible
		'arrow-body-style': ['error', 'as-needed'],
	},
};
