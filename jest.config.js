/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {

	projects: [
		'<rootDir>/tests/esm.jest.config.js',
		'<rootDir>/tests/default.jest.config.js'
	],

	testTimeout: 120e3,

	maxWorkers: 1,
	maxConcurrency: 1,
	bail: true

};
