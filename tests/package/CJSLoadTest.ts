/* eslint-disable @typescript-eslint/no-var-requires */
// noinspection ES6ConvertRequireIntoImport

const WikimediaStream = require( '../..' ).default;

test( 'Module resolution test: CommonJS', () => {
	new WikimediaStream( 'recentchange', {} ).close();
} );
