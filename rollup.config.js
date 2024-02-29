/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require( 'fs' );
const typescript = require( 'rollup-plugin-typescript2' );
const terser = require( '@rollup/plugin-terser' );
const nodePolyfills = require( 'rollup-plugin-node-polyfills' );
const path = require( 'path' );

console.warn(
	'Missing shims error is normal; index.js is not supposed to have bundled EventEmitter.'
);

function withMin( outputConfig ) {
	const minConfig = Object.assign( {}, outputConfig );
	minConfig.file = minConfig.file.replace( /\.js$/, '.min.js' );
	minConfig.plugins = Array.from( outputConfig.plugins || [] );
	minConfig.plugins.push( terser() );
	return [ outputConfig, minConfig ];
}

function getHeader( withPolyfills = false ) {
	let header = `
/*!
 * # wikimedia-streams
 * Receive events from Wikimedia wikis using the Wikimedia Event Platforms' EventStreams.
 *
 * @author Chlod Alejandro <chlod@chlod.net> and other contributors
 * @license Apache-2.0
 */`;

	if ( withPolyfills ) {
		header += `
/*!
 * This file includes code from the \`rollup-plugin-node-polyfills\` package.
 * Its license has been attached below:
 *
 * ----------------------------------------------------------------------------
 *
${

	fs.readFileSync(
		require.resolve( 'rollup-plugin-node-polyfills/LICENSE.md' ),
		'utf8'
	)
		.trim()
		.replace( /(?![^\n]{1,78}$)([^\n]{1,78})\s/g, '$1\n' )
		.split( '\n' )
		.map( line => ` * ${line}` )
		.join( '\n' )
}
 */`;
	}
	header += '\n';
	return header.trimStart();
}

/**
 * @type {import('rollup').RollupOptions[]}
 */
module.exports = [
	{
		external: [ 'events', 'eventsource' ],
		input: 'src/index.ts',
		output: withMin( {
			banner: getHeader(),
			name: 'WikimediaStream',
			format: 'umd',
			file: 'dist/browser/index.js',
			globals: {
				events: 'window',
				eventsource: 'EventSource'
			},
			exports: 'named'
		} ),
		plugins: [
			typescript( {
				tsconfig: 'tsconfig.browser.json'
			} )
		]
	},
	{
		external: [ 'eventsource' ],
		input: 'src/index.ts',
		output: withMin( {
			banner: getHeader( true ),
			name: 'WikimediaStream',
			format: 'umd',
			file: 'dist/browser/bundle.js',
			globals: {
				eventsource: 'EventSource'
			},
			exports: 'named'
		} ),
		plugins: [
			nodePolyfills(),
			typescript( {
				tsconfig: 'tsconfig.browser.json'
			} )
		]
	},
	{
		external: [ 'eventsource' ],
		input: 'src/index.ts',
		output: withMin( {
			banner: getHeader( true ),
			format: 'cjs',
			file: 'dist/browser/lib.js',
			plugins: [ {
				writeBundle( options, bundle ) {
					for ( const [ fileName, chunk ] of Object.entries( bundle ) ) {
						if ( !/lib(\.min)?\.js/.test( fileName ) ) {
							return;
						}
						// Strip out EventSource import (is global in browser)
						// eslint-disable-next-line security/detect-non-literal-fs-filename
						fs.writeFileSync(
							path.join( path.dirname( options.file ), fileName ),
							chunk.code
								.replace(
									/import\s+\S*\s+from\s*["']eventsource["'];(\r\n|\n)*/,
									''
								)
								.replace(
									/var\s+\S*\s*=\s*require\s*\(\s*["']eventsource["']\s*\)\s*;(\r\n|\n)*/,
									''
								),
							{ encoding: 'utf8' }
						);
					}
				}
			} ],
			globals: {
				eventsource: 'EventSource'
			},
			exports: 'named'
		} ),
		plugins: [
			nodePolyfills(),
			typescript( {
				tsconfig: 'tsconfig.browser.json'
			} )
		]
	}
];
