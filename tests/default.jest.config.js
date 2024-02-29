/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {

	rootDir: '../',
	transform: {
		'^.+\\.c?ts$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.cjs.json'
			}
		]
	},
	testEnvironment: 'node',
	testMatch: [
		'<rootDir>/tests/**/*Test{,s}.{cts,ts}'
	],
	testPathIgnorePatterns: [
		'<rootDir>/tests/browser/.+'
	]

};
