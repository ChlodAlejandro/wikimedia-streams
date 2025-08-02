import WikimediaStream, { WikimediaEventStream, WikimediaEventStreams } from '../../src';
import { typeGuards } from '../../src/streams/Guards';

const successes: Partial<Record<WikimediaEventStream, number>> = {};

beforeAll( () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	expect( WikimediaStream.VERSION ).toBe( require( '../../package.json' ).version );

	WikimediaStream.defaultUserAgent = `wikimedia-streams-ci/${
		WikimediaStream.VERSION
	} (chlod@chlod.net; github@ChlodAlejandro/wikimedia-streams) ${
		WikimediaStream.genericUserAgent
	}`;
} );

beforeEach( ( doneFn ) => {
	setTimeout( doneFn, 1000 );
} );

function generateStream( topic: WikimediaEventStream ): Promise<WikimediaStream> {
	return new Promise<WikimediaStream>( res => {
		const stream = new WikimediaStream(
			topic, { autoStart: false }
		);
		stream.open( {
			since: new Date(
				Date.now() - ( 365 * 24 * 60 * 60 * 1e3 )
			).toISOString(),
			enableCanary: [ 'eventgate-main.test.event', 'test' ].includes( topic )
		} ).then( () => {
			res( stream );
		} );
	} );
}

test.each( WikimediaEventStreams )( '%s', async ( topic ) => {
	successes[ topic ] = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( typeGuards[ topic ]( data ) ).toBe( true );
		if ( ++successes[ topic ] > 2 ) {
			stream.close();
		}
	} );
	while ( successes[ topic ] === 0 ) {
		await stream.waitUntilClosed();
	}
	expect.hasAssertions();
} );
