import WikimediaStream from '../src/WikimediaStream';
import { version } from '../package.json';
import { WikimediaStreamFilter } from '../src';

let stream: WikimediaStream;

describe( 'WikimediaStreamFilter tests', () => {

	beforeAll( ( done ) => {
		expect( WikimediaStream.VERSION ).toBe( version );
		stream = new WikimediaStream( 'recentchange' );
		expect( stream ).toBeInstanceOf( WikimediaStream );
		const filter = stream.filter( 'recentchange' );
		expect( filter ).toBeInstanceOf( WikimediaStreamFilter );
		done();
	} );

	test( 'none', ( doneFn ) => {
		expect.hasAssertions();
		const filter = stream.filter( 'recentchange' )
			.none( {
				wiki: 'enwiki'
			} )
			.on( ( data ) => {
				expect( data.$schema ).toBe( '/mediawiki/recentchange/1.0.0' );
				expect( data.wiki ).not.toBe( 'enwiki' );
			} );

		setTimeout( () => {
			filter.removeAllListeners();
			doneFn();
		}, 5e3 );
	}, 20e3 );

	test( 'all', ( doneFn ) => {
		expect.hasAssertions();
		const filter = stream.filter( 'recentchange' )
			.all( {
				wiki: 'wikidatawiki'
			} )
			.on( ( data ) => {
				expect( data.$schema ).toBe( '/mediawiki/recentchange/1.0.0' );
				expect( data.wiki ).toBe( 'wikidatawiki' );
			} );

		setTimeout( () => {
			filter.removeAllListeners();
			doneFn();
		}, 5e3 );
	}, 20e3 );

	test( 'any', ( doneFn ) => {
		expect.hasAssertions();
		const filter = stream.filter( 'recentchange' )
			.any( {
				wiki: 'commonswiki'
			} )
			.any( {
				wiki: 'wikidatawiki'
			} )
			.on( ( data ) => {
				// Meta
				expect( data.$schema ).toBe( '/mediawiki/recentchange/1.0.0' );
				expect( [ 'commonswiki', 'wikidatawiki' ] ).toContain( data.wiki );
			} );

		setTimeout( () => {
			filter.removeAllListeners();
			doneFn();
		}, 5e3 );
	}, 20e3 );

	test( 'depth 2', ( doneFn ) => {
		expect.hasAssertions();
		const filter = stream.filter( 'recentchange' )
			.all( {
				meta: {
					domain: 'www.wikidata.org'
				}
			} )
			.on( ( data ) => {
				expect( data.$schema ).toBe( '/mediawiki/recentchange/1.0.0' );
				expect( data.meta.domain ).toBe( 'www.wikidata.org' );
			} );

		setTimeout( () => {
			filter.removeAllListeners();
			doneFn();
		}, 5e3 );
	}, 20e3 );

	test( 'all and any (should not eval any)', ( doneFn ) => {
		expect.assertions( 0 );
		const filter = stream.filter( 'recentchange' )
			.all( {
				wiki: 'wikidatawiki'
			} )
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			.any( {
				wiki: 'commonswiki'
			} )
			.on( ( data ) => {
				expect( data.$schema ).toBe( '/mediawiki/recentchange/1.0.0' );
				expect( data.wiki ).toBe( 'wikidatawiki' );
			} );

		setTimeout( () => {
			filter.removeAllListeners();
			doneFn();
		}, 5e3 );
	}, 20e3 );

	test( 'cloning', ( doneFn ) => {
		expect.hasAssertions();
		const fakeFunction1 = jest.fn();
		const fakeFunction2 = jest.fn();
		const fakeFunction3 = jest.fn();

		const filter1 = stream.filter( 'recentchange' );

		filter1
			.all( {
				wiki: 'wikidatawiki'
			} );
		filter1
			.all( {
				wiki: 'commonswiki'
			} )
			.on( () => {
				// Impossible to have differing values of `wiki`.
				fakeFunction1();
			} );

		const filter2 = stream.filter( 'recentchange' );
		filter2
			.clone()
			.all( {
				wiki: 'wikidatawiki'
			} )
			.all( {
				type: 'edit'
			} )
			.on( ( rc ) => {
				expect( rc.wiki ).toBe( 'wikidatawiki' );
				expect( rc.type ).toBe( 'edit' );
				fakeFunction2();
			} );
		filter2
			.clone()
			.all( {
				wiki: 'enwiki'
			} )
			.all( {
				type: 'edit'
			} )
			.on( ( rc ) => {
				expect( rc.wiki ).toBe( 'enwiki' );
				expect( rc.type ).toBe( 'edit' );
				fakeFunction3();
			} );

		setTimeout( () => {
			expect( fakeFunction1 ).not.toBeCalled();
			expect( fakeFunction2 ).toBeCalled();
			expect( fakeFunction3 ).toBeCalled();
			filter1.removeAllListeners();
			filter2.removeAllListeners();
			doneFn();
		}, 5e3 );
	}, 20e3 );

	afterAll( ( done ) => {
		stream.on( 'close', done );
		stream.close();
	} );
} );
