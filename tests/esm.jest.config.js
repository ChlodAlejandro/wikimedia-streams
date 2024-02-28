/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {

	rootDir: '../',
	moduleFileExtensions: [ 'js', 'ts', 'mts' ],
	transform: {
		'^.+\\.mts$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: 'tsconfig.esm.json'
			}
		]
	},
	transformIgnorePatterns: [
		'node_modules',
		'dist'
	],
	testEnvironment: 'node',
	testMatch: [
		'<rootDir>/tests/**/*Test{,s}.mts'
	]

};

console.log( module.exports );
