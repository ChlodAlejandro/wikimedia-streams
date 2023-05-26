/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {

	preset: 'ts-jest',
	testEnvironment: 'node',
	testRegex: '[\\/]tests[\\/][^\\\\/]+\\.ts$',
	testTimeout: 120e3,

	maxWorkers: 1,
	maxConcurrency: 1,
	bail: true

};
