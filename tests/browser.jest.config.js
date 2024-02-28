/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {

	rootDir: '../',
	transform: {
		'^.+\\.c?ts$': [
			'ts-jest',
			{
				tsconfig: {
					target: 'esnext',
					esModuleInterop: true
				}
			}
		]
	},
	testEnvironment: 'node',
	testMatch: [
		'<rootDir>/tests/browser/*Test{,s}.{cts,ts}'
	]

};
