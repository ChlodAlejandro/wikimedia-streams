/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require( 'fs' );
const path = require( 'path' );

const esmDirectory = path.join(
	process.env.npm_config_local_prefix || process.cwd(), 'dist', 'esm'
);

// Well-known execution path
// eslint-disable-next-line security/detect-non-literal-fs-filename
if ( fs.existsSync( esmDirectory ) ) {
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	fs.writeFileSync( path.join( esmDirectory, 'package.json' ), JSON.stringify( {
		type: 'module'
	} ) );
}
