import { WikimediaStream } from '../src';

( async () => {

	const stream = new WikimediaStream( 'recentchange', {
		autoStart: false,
		since: new Date( Date.now() - ( 1000 * 60 * 60 * 24 ) ).toISOString()
	} );

	const autoClose = setTimeout( () => {
		stream.close();
	}, 10e3 );

	const lastOffset: Record<string, number> = {};
	let lastTimestamp: number;
	stream.on( 'recentchange', ( data ) => {
		const offsetKey = `${data.meta.topic}#${data.meta.partition}`;
		console.log( `${offsetKey}: ${data.meta.offset}` );
		console.log( `:: ${ data.meta.dt }` );

		if ( lastOffset[ offsetKey ] != null ) {
			if ( lastOffset[ offsetKey ] + 1 !== data.meta.offset ) {
				clearTimeout( autoClose );
				stream.close();
				throw new Error( 'Offset is not sequential.' );
			}
		}
		if ( lastTimestamp != null ) {
			if ( lastTimestamp > new Date( data.meta.dt ).getTime() ) {
				clearTimeout( autoClose );
				stream.close();
				throw new Error( 'Timestamp is not sequential.' );
			}
		}

		lastOffset[ offsetKey ] = data.meta.offset;
		lastTimestamp = new Date( data.meta.dt ).getTime();
	} );

	await stream.open();
	await stream.waitUntilClosed();

} )();
