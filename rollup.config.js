/* eslint-disable @typescript-eslint/no-var-requires */
const sourcemaps = require( 'rollup-plugin-sourcemaps' );
const typescript = require( 'rollup-plugin-typescript2' );
const terser = require( '@rollup/plugin-terser' );

console.warn( 'Missing shims error is normal; Rollup is only used for UMD bundling.' );

/**
 * @type {import('rollup').RollupOptions[]}
 */
module.exports = {
	external: [ 'events', 'eventsource' ],
	input: 'src/index.ts',
	output: [
		{
			name: 'WikimediaStream',
			format: 'umd',
			file: 'dist/browser/index.js',
			globals: {
				events: 'window',
				eventsource: 'EventSource'
			},
			exports: 'named'
		},
		{
			name: 'WikimediaStream',
			format: 'umd',
			file: 'dist/browser/index.min.js',
			plugins: [ terser() ],
			globals: {
				events: 'window',
				eventsource: 'EventSource'
			},
			exports: 'named'
		}
	],
	plugins: [
		process.env.NODE_ENV === 'production' && sourcemaps(),
		typescript( {
			tsconfig: 'tsconfig.browser.json'
		} )

	].filter( v => v )
};
