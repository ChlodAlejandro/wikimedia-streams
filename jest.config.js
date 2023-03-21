/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {

    name: "wikimedia-streams",
    preset: "ts-jest",
    testEnvironment: "node",
    testRegex: "[\\/]tests[\\/][^\\\\\/]+\\.ts$",
    testTimeout: 120e3

};
