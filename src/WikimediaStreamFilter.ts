import type { default as WikimediaStream, WikimediaEventStreamEventTypes } from './WikimediaStream';
import {
	RawWikimediaStreamEventListener,
	WikimediaEventStream,
	WikimediaStreamEventListener
} from './WikimediaStream';

interface FilterOptions {
	/**
	 * The depth to which the filter should crawl for object values. This is
	 * set to a high number by default
	 *
	 * @default 50
	 */
	depth?: number;
	/**
	 * Indicates the mode to use when applying the filter.
	 * - literal: The event value must match the mask value exactly.
	 * - array:   The mask value must always be interpreted as an array, and
	 *            the event value must be a member of that array.
	 * - auto:    This is a combination of the two above. If the mask value
	 *            is an array, the event value must be a member of that array (array
	 *            check). If the mask value is a regular expression and the event value
	 *            is a string, the mask value must match the event value. If
	 *            none of these cases match, the event value must match the mask
	 *            value exactly (literal check).
	 *
	 * @default 'auto'
	 */
	mode?: 'auto' | 'literal' | 'array';
}

interface ClosedWikimediaStreamsFilter {
	none: never;
	all: never;
	any: never;
}

type DeepPartial<T extends object> = {
	[K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
};

/**
 * Describes a class that automatically filters events from a stream. A filter can be
 * instantiated using `WikimediaStream.filter`, and then chained with `none`, `all`,
 * and `any` methods to create a filter that will filter out events. The final filter
 * can then be used to add event listeners to the stream.
 *
 * `none`, `all`, and `any` are chainable, however this is only the case if they are
 * used in the correct order. `none` filters are executed first and take highest
 * priority. `all` filters are executed second, and `any` filters are executed last.
 * Types help narrow down the final type of events passed through the event handlers,
 * which is why the order of the filters is important.
 */
export class WikimediaStreamFilter<
	T extends WikimediaEventStreamEventTypes[U],
	U extends WikimediaEventStream
> {

	readonly noneFilters: [ any, FilterOptions ][] = [];
	readonly allFilters: [ any, FilterOptions ][] = [];
	readonly anyFilters: [ any, FilterOptions ][] = [];

	constructor(
		readonly stream: WikimediaStream,
		readonly eventType: U,
		filters?: {
			none: typeof WikimediaStreamFilter.prototype.noneFilters,
			all: typeof WikimediaStreamFilter.prototype.allFilters,
			any: typeof WikimediaStreamFilter.prototype.anyFilters
		}
	) {
		if ( filters ) {
			this.noneFilters = filters.none;
			this.allFilters = filters.all;
			this.anyFilters = filters.any;
		}
	}

	clone(): WikimediaStreamFilter<T, U> {
		// Shallow clones
		return new WikimediaStreamFilter( this.stream, this.eventType, {
			none: [ ...this.noneFilters ],
			all: [ ...this.allFilters ],
			any: [ ...this.anyFilters ]
		} );
	}

	/**
	 * Adds a filter that will filter out events that match the mask.
	 * `none` filters are run first, and take highest priority over other
	 * filters.
	 *
	 * Types for this method are only effective for specific cases due to
	 * the lack of negation types in TypeScript.
	 *
	 * @param mask
	 * @param options
	 */
	none<V extends DeepPartial<T>>( mask: V, options: FilterOptions = {} ):
		WikimediaStreamFilter<T, U> {
		this.noneFilters.push( [ mask, options ] );
		return this as unknown as WikimediaStreamFilter<T, U>;
	}

	/**
	 * Adds a filter that will filter out events that do not match all `all` masks.
	 *
	 * Note that, for use in TypeScript, `none` and `any` are set to `never`. This
	 * prevents unintended use of `none` and `any` after `all` is used, thus ensuring
	 * that the types emitted by the final event handler is correct. Since JavaScript
	 * does not perform type checks, this does not throw a runtime error.
	 *
	 * @param mask
	 * @param options
	 */
	all<V extends DeepPartial<T>>( mask: V, options: FilterOptions = {} ):
		WikimediaStreamFilter<T & V, U> & { none: never } {
		this.allFilters.push( [ mask, options ] );
		return this as unknown as WikimediaStreamFilter<T & V, U> & { none: never };
	}

	/**
	 * Adds a filter that will filter out events that do not match any `any` masks.
	 *
	 * Note that, for use in TypeScript, `none` and `all` are set to `never`. This
	 * prevents unintended use of `none` and `all` after `any` is used, thus ensuring
	 * that the types emitted by the final event handler is correct. Since JavaScript
	 * does not perform type checks, this does not throw a runtime error.
	 *
	 * @param mask
	 * @param options
	 */
	any<V extends DeepPartial<T>>( mask: V, options: FilterOptions = {} ):
		WikimediaStreamFilter<T | ( T & V ), U> & { none: never, all: never } {
		this.anyFilters.push( [ mask, options ] );
		return this as unknown as
			WikimediaStreamFilter<T | ( T & V ), U> & { none: never, all: never };
	}

	/**
	 * Crawling function. Only triggers when depth cap hit or
	 *
	 * @param expectedObject
	 * @param actualObject
	 * @param action
	 * @param depth
	 * @private
	 */
	private crawl(
		expectedObject: any,
		actualObject: any,
		action: ( expected: any, actual: any ) => boolean,
		depth: number = 0
	): boolean {
		if ( depth > 0 && typeof expectedObject === 'object' && typeof actualObject === 'object' ) {
			for ( const key of Object.keys( expectedObject ) ) {
				if ( !this.crawl( expectedObject[ key ],
					actualObject[ key ],
					action,
					depth - 1 ) ) {
					return false;
				}
			}
			return true;
		} else {
			return action( expectedObject, actualObject );
		}
	}

	/**
	 * Performs a deep equality check. This checks if all keys and values of expectedObject
	 * match all keys and values of actualObject and vice versa. If oneWay is set to true,
	 * this only checks if keys and values of expectedObject are in actualObject, and
	 * still returns true if the actualObject contains extra properties.
	 *
	 * @param expectedObject The object that is expected
	 * @param actualObject The actual object
	 * @param oneWay Whether the comparison is made one way
	 * @return Whether the two objects are equal
	 * @private
	 */
	private deepEqual( expectedObject: any, actualObject: any, oneWay?: boolean ): boolean {
		if ( typeof expectedObject !== typeof actualObject ) {
			return false;
		}
		if ( typeof expectedObject === 'object' ) {
			for ( const key of Object.keys( expectedObject ) ) {
				if ( !this.deepEqual( expectedObject[ key ], actualObject[ key ], oneWay ) ) {
					return false;
				}
			}
			if ( !oneWay ) {
				for ( const key of Object.keys( actualObject ) ) {
					if ( !this.deepEqual( expectedObject[ key ], actualObject[ key ], oneWay ) ) {
						return false;
					}
				}
			}
			return true;
		} else {
			return expectedObject === actualObject;
		}
	}

	private literalFilter( expected: any, actual: any ): boolean {
		return this.deepEqual( expected, actual );
	}

	private arrayFilter( expected: any[], actual: any ): boolean {
		return expected.includes( actual );
	}

	private autoFilter( expected: any, actual: any ): boolean {
		if ( Array.isArray( expected ) ) {
			return this.arrayFilter( expected, actual );
		} else if ( expected instanceof RegExp ) {
			return expected.test( actual );
		} else {
			return this.literalFilter( expected, actual );
		}
	}

	private filterFunction( event: T ) {
		const defaultMode = 'auto';
		const defaultDepth = 50;
		const filterFunctions:
			Record<FilterOptions['mode'], ( expected: any, actual: any ) => boolean> = {
				literal: this.literalFilter.bind( this ),
				array: this.arrayFilter.bind( this ),
				auto: this.autoFilter.bind( this )
			};

		for ( const noneFilter of this.noneFilters ) {
			const mask = noneFilter[ 0 ];
			const { depth, mode } = noneFilter[ 1 ];
			// Deep equality check, where `mask` is `expected` and `depth` controls depth.
			const noneMatch = this.crawl( mask, event, ( expected, actual ) => {
				if ( typeof expected === 'object' && actual == null ) {
					// Mask will never match, because `actual` is never an object.
					return false;
				} else {
					return filterFunctions[ mode ?? defaultMode ]( expected, actual );
				}
			}, depth ?? defaultDepth );

			if ( noneMatch ) {
				// Something matched. Don't emit.
				return false;
			}
		}

		for ( const allFilter of this.allFilters ) {
			const mask = allFilter[ 0 ];
			const { depth, mode } = allFilter[ 1 ];
			// Deep equality check, where `mask` is `expected` and `depth` controls depth.
			const allMatch = this.crawl( mask, event, ( expected, actual ) => {
				if ( typeof expected === 'object' && actual == null ) {
					// Mask will never match, because `actual` is never an object.
					return false;
				} else {
					return filterFunctions[ mode ?? defaultMode ]( expected, actual );
				}
			}, depth ?? defaultDepth );

			if ( !allMatch ) {
				return false;
			}
		}

		for ( const anyFilter of this.anyFilters ) {
			const mask = anyFilter[ 0 ];
			const { depth, mode } = anyFilter[ 1 ];
			// Deep equality check, where `mask` is `expected` and `depth` controls depth.
			const anyMatch = this.crawl( mask, event, ( expected, actual ) => {
				if ( typeof expected === 'object' && actual == null ) {
					// Mask will never match, because `actual` is never an object.
					return false;
				} else {
					return filterFunctions[ mode ?? defaultMode ]( expected, actual );
				}
			}, depth ?? defaultDepth );

			if ( anyMatch ) {
				// Something matched. Emit.
				return true;
			}
		}

		// Something didn't match `any` (if there are any `any` filters).
		// Check if we have `none` filters. If we got here, then they passed.
		// Check if we have `all` filters. If we got here, then they passed.
		// Check if we have `any` filters. If we got here, then we must skip.
		return ( this.noneFilters.length !== 0 ||
			this.allFilters.length !== 0 ) &&
			this.anyFilters.length === 0;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	listenerCache: Map<Function, WikimediaStreamEventListener<WikimediaEventStream>> = new Map();

	private getFilteredListener( listener: RawWikimediaStreamEventListener<T> ):
		( data: T, event: MessageEvent ) => void {
		return ( data: T, event: MessageEvent ) => {
			if ( this.filterFunction( data ) ) {
				listener( data, event );
			}
		};
	}

	private cleanupListenerCache() {
		const parentListeners = this.stream.rawListeners( this.eventType );
		for ( const [ originalListener, listener ] of this.listenerCache.entries() ) {
			if ( !parentListeners.includes( listener ) ) {
				this.listenerCache.delete( originalListener );
			}
		}
	}

	/** @inheritDoc */
	eventNames(): Array<string | symbol> {
		return [ this.eventType ];
	}

	/** @inheritDoc */
	addListener( listener: RawWikimediaStreamEventListener<T> ):
		this & ClosedWikimediaStreamsFilter {
		this.listenerCache.set( listener, this.getFilteredListener( listener ) );
		this.stream.addListener( this.eventType, this.listenerCache.get( listener ) );
		return this as this & ClosedWikimediaStreamsFilter;
	}

	/** @inheritDoc */
	off( listener: RawWikimediaStreamEventListener<T> ):
		this & ClosedWikimediaStreamsFilter {
		this.stream.off( this.eventType, this.listenerCache.get( listener ) );
		this.listenerCache.delete( listener );
		return this as this & ClosedWikimediaStreamsFilter;
	}

	/** @inheritDoc */
	on( listener: RawWikimediaStreamEventListener<T> ):
		this & ClosedWikimediaStreamsFilter {
		this.listenerCache.set( listener, this.getFilteredListener( listener ) );
		this.stream.on( this.eventType, this.listenerCache.get( listener ) );
		return this as this & ClosedWikimediaStreamsFilter;
	}

	/** @inheritDoc */
	once( listener: RawWikimediaStreamEventListener<T> ):
		this & ClosedWikimediaStreamsFilter {
		this.stream.once( this.eventType, this.getFilteredListener( listener ) );
		return this as this & ClosedWikimediaStreamsFilter;
	}

	/** @inheritDoc */
	prependListener( listener: RawWikimediaStreamEventListener<T> ):
		this & ClosedWikimediaStreamsFilter {
		this.listenerCache.set( listener, this.getFilteredListener( listener ) );
		this.stream.prependListener( this.eventType, this.listenerCache.get( listener ) );
		return this as this & ClosedWikimediaStreamsFilter;
	}

	/** @inheritDoc */
	prependOnceListener( listener: RawWikimediaStreamEventListener<T> ):
		this & ClosedWikimediaStreamsFilter {
		this.stream.prependOnceListener( this.eventType, this.getFilteredListener( listener ) );
		return this as this & ClosedWikimediaStreamsFilter;
	}

	/** @inheritDoc */
	removeListener( listener: RawWikimediaStreamEventListener<T> ):
		this & ClosedWikimediaStreamsFilter {
		this.stream.removeListener( this.eventType, this.listenerCache.get( listener ) );
		this.listenerCache.delete( listener );
		return this as this & ClosedWikimediaStreamsFilter;
	}

	/** @inheritDoc */
	removeAllListeners(): this & ClosedWikimediaStreamsFilter {
		for ( const listener of this.listenerCache.values() ) {
			this.stream.removeListener( this.eventType, listener );
		}
		this.listenerCache.clear();
		return this as this & ClosedWikimediaStreamsFilter;
	}

	/** @inheritDoc */
	// eslint-disable-next-line @typescript-eslint/ban-types
	listeners(): Function[] {
		this.cleanupListenerCache();
		return Array.from( this.listenerCache.keys() );
	}

	/** @inheritDoc */
	listenerCount(): number {
		this.cleanupListenerCache();
		return this.listenerCache.size;
	}
}
