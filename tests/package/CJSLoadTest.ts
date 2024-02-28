/* eslint-disable @typescript-eslint/no-var-requires */
// noinspection ES6ConvertRequireIntoImport

const WikimediaStream = require( '../..' ).default;

test( 'Module load test: CommonJS', () => {
	new WikimediaStream( 'recentchange', {} ).close();
} );
