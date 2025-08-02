import { WikimediaStream } from '../../src/';

test( 'Module load test: ESM', () => {
	new WikimediaStream( 'recentchange', {} ).close();
} );
