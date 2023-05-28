import WikimediaStream, {
	WikimediaEventStreamAliases,
	WikimediaEventStreams
} from '../src/WikimediaStream';
import MediaWikiRecentChangeEvent from '../src/streams/MediaWikiRecentChangeEvent';

describe( 'WikimediaStream tests', () => {

	test( 'start stream from canonical ID (mediawiki.recentchange)', () => {
		return new Promise<void>( ( res, rej ) => {
			const stream = new WikimediaStream( 'mediawiki.recentchange' );
			stream.on( 'error', rej );
			stream.on( 'open', () => {
				res();
				stream.close();
			} );
		} );
	} );

	test( 'start stream from alias ID (recentchange)', () => {
		return new Promise<void>( ( res, rej ) => {
			const stream = new WikimediaStream( 'recentchange' );
			stream.on( 'error', rej );
			stream.on( 'open', () => {
				res();
				stream.close();
			} );
		} );
	} );

	test( 'cfg reopenOnClose: does not reopen when explicitly closed', async () => {
		const stream = new WikimediaStream( 'recentchange', {
			reopenOnClose: true
		} );
		stream.once( 'open', () => {
			stream.close();
		} );
		await stream.waitUntilClosed();
		await new Promise<void>( ( res, rej ) => {
			stream.on( 'open', () => {
				rej();
			} );
			setTimeout( res, 2e3 );
		} );
	} );

	test( 'cfg lastEventId: test with offset', async () => {
		expect.hasAssertions();
		let referenceEvent : MediaWikiRecentChangeEvent;

		const stream1 = new WikimediaStream( 'recentchange' );
		stream1.once( 'recentchange', ( edit ) => {
			// conditional statement to avoid race condition
			if ( !referenceEvent ) {
				referenceEvent = edit;
			}
			stream1.close();
		} );
		await stream1.waitUntilClosed();

		const stream2 = new WikimediaStream( 'recentchange', {
			lastEventId: [ {
				topic: referenceEvent.meta.topic,
				partition: referenceEvent.meta.partition,
				offset: referenceEvent.meta.offset
			} ],
			autoStart: false
		} );
		stream2.on( 'recentchange', ( edit ) => {
			if ( edit.meta.topic !== referenceEvent.meta.topic ) {
				// skip events that aren't from the right datacenter
				return;
			}
			expect( edit.meta.offset ).toEqual( referenceEvent.meta.offset );
			stream2.close();
		} );
		await stream2.open();
		await stream2.waitUntilClosed();
	} );

	test( 'cfg since: similar time', async () => {
		expect.hasAssertions();
		let referenceEvent : MediaWikiRecentChangeEvent;

		const stream1 = new WikimediaStream( 'recentchange' );
		stream1.once( 'recentchange', ( edit ) => {
			// conditional statement to avoid race condition
			if ( !referenceEvent ) {
				referenceEvent = edit;
			}
			stream1.close();
		} );
		await stream1.waitUntilClosed();

		const stream2 = new WikimediaStream( 'recentchange', {
			since: referenceEvent.meta.dt,
			autoStart: false
		} );
		stream2.once( 'recentchange', ( edit ) => {
			expect(
				Math.abs( new Date( edit.meta.dt ).getTime() -
				new Date( referenceEvent.meta.dt ).getTime() )
			).toBeLessThan( 1e3 );
			stream2.close();
		} );
		await stream2.open();
		await stream2.waitUntilClosed();
	} );

	test( 'fn open(): stream reopens if already open', () => {
		return new Promise<void>( ( res, rej ) => {
			let opens = 0;
			const hasClosed = jest.fn();

			const stream = new WikimediaStream( 'recentchange' );
			stream.on( 'close', hasClosed );
			stream.on( 'error', rej );
			stream.on( 'open', () => {
				if ( ++opens > 1 ) {
					expect( hasClosed ).toHaveBeenCalledTimes( 1 );
					stream.close();
					res();
				} else {
					stream.open();
				}
			} );
		} );
	} );

	test( 'fn close(): stream closes', () => {
		return new Promise<void>( ( res, rej ) => {
			const hasClosed = jest.fn();

			const stream = new WikimediaStream( 'recentchange' );
			stream.on( 'close', hasClosed );
			stream.on( 'error', rej );
			stream.on( 'open', async () => {
				stream.close();
				expect( hasClosed ).toHaveBeenCalledTimes( 1 );
				res();
			} );
		} );
	} );

	// No tests for `attachEventListeners`, all these tests implicitly test if
	// `attachEventListeners` was run.

	test( 'eventNames(): returns array of event names', () => {
		const stream = new WikimediaStream( 'recentchange', {
			autoStart: false
		} );
		expect( stream.eventNames() ).toEqual( expect.arrayContaining( [
			'open',
			'close',
			'error',
			...WikimediaEventStreams,
			...Object.keys( WikimediaEventStreamAliases )
		] ) );
	} );

	test( 'fn getLastEventId(): lastEventId is automatically saved', async () => {
		const stream = new WikimediaStream( 'recentchange' );
		stream.on( 'recentchange', () => {
			stream.close();
		} );
		await stream.waitUntilClosed();
		expect( typeof stream.getLastEventId() ).toBe( 'string' );

		const parsedLID = JSON.parse( stream.getLastEventId() );
		expect( parsedLID ).toBeInstanceOf( Array );
		for ( const item of parsedLID ) {
			expect( typeof item.topic ).toEqual( 'string' );
			expect( typeof item.partition ).toEqual( 'number' );
			if ( item.timestamp ) {
				expect( typeof item.timestamp ).toEqual( 'number' );
			}
			if ( item.offset ) {
				expect( typeof item.offset ).toEqual( 'number' );
			}

			expect( item.topic ).toMatch( /^[^.]+\.mediawiki\.recentchange$/ );
		}
	} );

	test( 'fn getLastEventId(): stream is recoverable from last event ID', async () => {
		expect.assertions( 4 );
		let stream1ReferenceEvent : MediaWikiRecentChangeEvent;

		const stream1 = new WikimediaStream( 'recentchange', {
			autoStart: false,
			since: new Date( Date.now() - ( 12 * 60 * 60 * 1e3 ) ).toISOString()
		} );
		stream1.once( 'recentchange', () => {
			stream1.close();
		} );
		await stream1.open();
		await stream1.waitUntilClosed();

		const referenceLastEventId = stream1.getLastEventId();
		let referencePostLastEventId : string;
		expect( typeof referenceLastEventId ).toBe( 'string' );

		stream1.once( 'recentchange', ( edit ) => {
			referencePostLastEventId = stream1.getLastEventId();
			stream1ReferenceEvent = edit;
			stream1.close();
		} );
		await stream1.open();
		await stream1.waitUntilClosed();

		const stream2 = new WikimediaStream( 'recentchange', {
			lastEventId: JSON.parse( referenceLastEventId ),
			autoStart: false
		} );
		console.log( JSON.stringify( stream1ReferenceEvent.meta ) );
		stream2.once( 'recentchange', ( edit ) => {
			console.log( JSON.stringify( edit.meta ), '+' );
			expect( stream2.getLastEventId() ).toEqual( referencePostLastEventId );
			expect( edit ).toEqual( stream1ReferenceEvent );
			stream2.close();
		} );
		expect( stream2.getLastEventId() ).toEqual( referenceLastEventId );
		await stream2.open();
		return Promise.race( [
			stream2.waitUntilClosed(),
			new Promise<void>( ( res ) => {
				setTimeout( res, 30000 );
			} )
		] );
	} );

	test( 'fn waitUntilClosed(): waits until closed', async () => {
		expect.hasAssertions();
		const stream = new WikimediaStream( 'recentchange' );
		stream.on( 'open', () => {
			stream.close();
		} );
		await Promise.race( [
			await stream.waitUntilClosed(),
			new Promise<void>( ( res ) => {
				setTimeout( res, 10000 );
			} )
		] );
		expect( stream.eventSource ).toBeNull();
	} );

	test( 'fn waitUntilClosed(): returns immediately if already closed', async () => {
		const testFn = jest.fn();
		const stream = new WikimediaStream( 'recentchange', { autoStart: false } );
		stream.on( 'open', testFn );
		stream.on( 'recentchange', testFn );
		await stream.waitUntilClosed();
		expect( testFn ).not.toHaveBeenCalled();
	} );

} );
