/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {

	projects: [
		'<rootDir>/tests/default.jest.config.js',
		'<rootDir>/tests/browser.jest.config.js',
		'<rootDir>/tests/esm.jest.config.js'
	].filter( v => !!v ),

	testTimeout: 120e3,

	maxWorkers: 1,
	maxConcurrency: 1,
	bail: true

};
