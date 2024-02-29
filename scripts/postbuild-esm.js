/* eslint-disable @typescript-eslint/no-var-requires,security/detect-non-literal-fs-filename */
const fs = require( 'fs' );
const path = require( 'path' );

const esmDirectory = path.join(
	process.env.npm_config_local_prefix || process.cwd(), 'dist', 'esm'
);

function processImports( directory ) {
	const entries = fs.readdirSync( directory, { withFileTypes: true } );

	entries.forEach( entry => {
		const entryPath = path.join( directory, entry.name );

		if ( entry.isDirectory() ) {
			processImports( entryPath );
		} else if ( entry.isFile() ) {
			console.log( entry );
			let content = fs.readFileSync( entryPath, 'utf-8' );

			const importRegex = /((?:ex|im)port .+? from\s*['"])(\..*?)(?<!\.js)(['"])/g;
			content = content.replace( importRegex, '$1$2.js$3' );

			fs.writeFileSync( entryPath, content );
		}
	} );
}

if ( fs.existsSync( esmDirectory ) ) {
	fs.writeFileSync( path.join( esmDirectory, 'package.json' ), JSON.stringify( {
		type: 'module'
	} ) );

	processImports( esmDirectory );
}
