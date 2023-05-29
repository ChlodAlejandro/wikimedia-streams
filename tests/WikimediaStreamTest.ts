import WikimediaStream, {
	WikimediaEventStreamAliases,
	WikimediaEventStreams, WikimediaStreamLastEventID
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
			).toBeLessThanOrEqual( 3e3 );
			stream2.close();
		} );
		await stream2.open();
		await stream2.waitUntilClosed();
	} );

	test( 'get lastEventId: lastEventId is automatically saved', async () => {
		const stream = new WikimediaStream( 'recentchange' );
		stream.on( 'recentchange', () => {
			stream.close();
		} );
		await stream.waitUntilClosed();
		const lid = stream.lastEventId;
		expect( typeof lid ).toBe( 'object' );

		expect( lid ).toBeInstanceOf( Array );
		for ( const item of lid ) {
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

	test( 'get lastEventId: stream is recoverable from last event ID', async () => {
		// Due to the way KafkaSSE works, we can't actually expect that the next event
		// will always be the same. However, we can expect that their timestamps will
		// be very close to each other. Since this is `recentchanges`, which normally
		// receives high throughput, we'll check if the received event is within 3 seconds
		// of the event we stopped receiving data from.
		expect.assertions( 3 );
		let referenceEvent : MediaWikiRecentChangeEvent;
		let referenceLastEventId : WikimediaStreamLastEventID[];

		const stream1 = new WikimediaStream( 'recentchange', {
			autoStart: false
		} );
		stream1.once( 'recentchange', ( data ) => {
			referenceEvent = data;
			referenceLastEventId = stream1.lastEventId;
			stream1.close();
		} );
		await stream1.open();
		await stream1.waitUntilClosed();

		expect( typeof referenceLastEventId ).toBe( 'object' );

		await new Promise( ( res ) => setTimeout( res, 3e3 ) );

		const stream2 = new WikimediaStream( 'recentchange', {
			lastEventId: referenceLastEventId,
			autoStart: false
		} );
		stream2.once( 'recentchange', ( edit ) => {
			stream2.close();
			expect(
				Math.abs( new Date( edit.meta.dt ).getTime() -
					new Date( referenceEvent.meta.dt ).getTime() )
			).toBeLessThanOrEqual( 3e3 );
		} );

		// Last-Event-ID should match exactly.
		expect( stream2.lastEventId ).toEqual( referenceLastEventId );

		await stream2.open();
		return Promise.race( [
			stream2.waitUntilClosed(),
			new Promise<void>( ( res ) => {
				setTimeout( res, 30000 );
			} )
		] );
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
