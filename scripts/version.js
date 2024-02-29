/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require( 'fs' );
const path = require( 'path' );
const packageJson = require( '../package.json' );
const childProcess = require( 'child_process' );

const srcDirectory = path.join(
	process.env.npm_config_local_prefix || process.cwd(), 'src'
);

const wsFile = path.join( srcDirectory, 'WikimediaStream.ts' );
fs.writeFileSync(
	wsFile,
	fs.readFileSync( wsFile, 'utf8' )
		.replace( /VERSION = '[^']+'/, `VERSION = '${
			packageJson.version
		}'` )
);

childProcess.execSync( `git add "${wsFile}"` );
