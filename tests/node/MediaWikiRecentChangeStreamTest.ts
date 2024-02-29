import WikimediaStream from '../../src';
import MediaWikiRecentChangeEvent from '../../src/streams/MediaWikiRecentChangeEvent';
import { version } from '../../package.json';
import { testComment, testWikimediaEvent } from '../common/CommonTestChecks';

/**
 * @param data
 */
export function testRecentChange( data : MediaWikiRecentChangeEvent ) {

	testWikimediaEvent( data );
	testComment( data );

	// Type checks
	expect( [ 'edit', 'new', 'log', 'categorize', 'external' ] ).toContain( data.type );
	expect( typeof data.title ).toBe( 'string' );
	expect( typeof data.namespace ).toBe( 'number' );
	expect( typeof data.timestamp ).toBe( 'number' );
	expect( typeof data.user ).toBe( 'string' );
	expect( typeof data.bot ).toBe( 'boolean' );
	expect( typeof data.server_url ).toBe( 'string' );
	expect( typeof data.server_script_path ).toBe( 'string' );
	expect( typeof data.wiki ).toBe( 'string' );
	if ( data.id ) {
		expect( typeof data.id ).toBe( 'number' );
	}

	// noinspection FallThroughInSwitchStatementJS
	switch ( data.type ) {
		case 'edit':

			expect( typeof data.length.old ).toBe( 'number' );
			expect( typeof data.revision.old ).toBe( 'number' );

		// eslint-disable-next-line no-fallthrough
		case 'new':

			// Type checks
			expect( typeof data.length ).toBe( 'object' );
			expect( typeof data.length.new ).toBe( 'number' );
			expect( typeof data.revision ).toBe( 'object' );
			expect( typeof data.revision.new ).toBe( 'number' );
			expect( typeof data.minor ).toBe( 'boolean' );

			// Value checks
			if ( data.type === 'new' ) {
				expect( ( data.length as any ).old == null ).toBe( true );
				expect( ( data.revision as any ).old == null ).toBe( true );
			}

			break;
		case 'log':

			// Type checks
			expect( typeof data.log_action ).toBe( 'string' );
			expect( typeof data.log_action_comment ).toBe( 'string' );
			if ( data.log_type ) {
				expect( typeof data.log_type ).toBe( 'string' );
			}
			if ( data.log_id ) {
				expect( typeof data.log_id ).toBe( 'number' );
			}

			break;
		case 'categorize':
			expect( data.parsedComment ).toBeUndefined();
			break;
	}

}

let stream : WikimediaStream;
const minToPass = 10;

beforeAll( ( done ) => {
	expect( WikimediaStream.VERSION ).toBe( version );
	stream = new WikimediaStream( 'recentchange' );

	WikimediaStream.defaultUserAgent = `wikimedia-streams-ci/${
		WikimediaStream.VERSION
	} (chlod@chlod.net; github@ChlodAlejandro/wikimedia-streams) ${
		WikimediaStream.genericUserAgent
	}`;

	done();
} );

let done = false;
test( 'mediawiki.recentchange', ( doneFn ) => {
	const status = {};

	/**
	 *
	 */
	function stopCheck() {
		if (
			!done &&
			Object.keys( status ).length > 0 &&
			Object.values( status ).every( ( typeSet ) =>
				Object.values( typeSet ).every( v => v >= minToPass )
			)
		) {
			done = true;
			doneFn();
		}
	}

	expect( stream ).toBeInstanceOf( WikimediaStream );

	/**
	 *
	 * @param streamName
	 */
	function observeStream( streamName: 'mediawiki.recentchange' | 'recentchange' ) {
		stream.on( streamName, ( data ) => {
			// Meta
			expect( data.$schema ).toBe( '/mediawiki/recentchange/1.0.0' );

			if ( status[ streamName ] == null ) {
				status[ streamName ] = {
					new: 0,
					edit: 0,
					categorize: 0,
					log: 0
				};
			}

			if ( status[ streamName ][ data.type ] < minToPass ) {
				testRecentChange( data );
				status[ streamName ][ data.type ]++;
				console.log( JSON.stringify( status ) );
			}

			stopCheck();
		} );
	}

	observeStream( 'mediawiki.recentchange' );
	observeStream( 'recentchange' );
} );

afterAll( ( doneFn ) => {
	stream.on( 'close', doneFn );

	stream.close();
} );
