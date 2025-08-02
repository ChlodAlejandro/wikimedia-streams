/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {

	rootDir: '../',
	preset: 'ts-jest/presets/default-esm',
	moduleFileExtensions: [ 'js', 'ts', 'mts' ],
	transform: {
		'^.+\\.m?ts$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: 'tsconfig.esm.json'
			}
		]
	},
	extensionsToTreatAsEsm: [ '.mts' ],
	transformIgnorePatterns: [
		'node_modules/(?!(.*\\.mjs$))'
	],
	testEnvironment: 'node',
	testMatch: [
		'<rootDir>/tests/**/*Test{,s}.mts'
	],
	testPathIgnorePatterns: [
		'<rootDir>/tests/browser/.+'
	],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1'
	}

};
