# wikimedia-streams
<img align="right" width="70" height="70" alt="wikimedia-streams logo" src="https://raw.githubusercontent.com/ChlodAlejandro/wikimedia-streams/master/assets/wikimedia-streams.png">

[![npm version](https://img.shields.io/npm/v/wikimedia-streams.svg?style=flat-square)](https://www.npmjs.org/package/wikimedia-streams)
[![npm downloads](https://img.shields.io/npm/dm/wikimedia-streams.svg?style=flat-square)](http://npm-stat.com/charts.html?package=wikimedia-streams)

wikimedia-streams connects to Wikimedia's [Event Platform EventStreams](https://wikitech.wikimedia.org/wiki/Event_Platform/EventStreams) in order to serve real-time changes to Wikimedia wikis. This entire library is typed, which makes parameter handling well-documented and defined. As of now, this package only works with Node.js. Browser support is planned in the future.

This package works best with TypeScript, but also works with plain JavaScript.

## Usage

**Note for Toolforge users:** This package requires at least Node 14.x, which is not available on the [Toolforge Grid Engine](https://wikitech.wikimedia.org/wiki/Help:Toolforge/Grid). Use the Node 14.x Docker image (`toolforge-node14-sssd-base`) on Kubernetes or [nvm](https://github.com/nvm-sh/nvm).

Create a new WikimediaStream with the following:

```ts
import WikimediaStream from "wikimedia-streams";

// "recentchange" can be replaced with any valid stream. 
const stream = new WikimediaStream("recentchange");
```

If you're using CommonJS imports, you'll need to add `.default` after `require()`.
```ts
const WikimediaStream = require("wikimedia-streams").default;
const stream = new WikimediaStream("recentchange");
```

From here, you can listen to sent events using `.on`.

```ts
stream.on("recentchange", (data: MediaWikiRecentChangeEvent, event) => {
	if (data.wiki === "enwiki") {
		// Edits from the English Wikipedia
		console.log(data.title); // Output the page title.
	}
});
```

Don't forget to close the stream when you're done (or else Node will remain open).

```ts
stream.close();
```

You can also use `.on("mediawiki.recentchange")` to listen to recent changes. A full list of streams and their available aliases are provided below.

### Available streams

| **Stream**                                                                                                          | **Aliases** | **Description**                                                                                      |
|---------------------------------------------------------------------------------------------------------------------|---|------------------------------------------------------------------------------------------------------|
| [eventgate-main.test.event](https://stream.wikimedia.org/v2/stream/eventgate-main.test.event)                       | `test` | Testing event.                                                                                       |
| [mediawiki.page-create](https://stream.wikimedia.org/v2/stream/mediawiki.page-create)                               | `page-create` | Newly-created pages.                                                                                 |
| [mediawiki.page-delete](https://stream.wikimedia.org/v2/stream/mediawiki.page-delete)                               | `page-delete` | Deleted pages.                                                                                       |
| [mediawiki.page-links-change](https://stream.wikimedia.org/v2/stream/mediawiki.page-links-change)                   | `page-links-change` | Changes to page links.                                                                               |
| [mediawiki.page-move](https://stream.wikimedia.org/v2/stream/mediawiki.page-move)                                   | `page-move` | Page moves.                                                                                          | 
| [mediawiki.page-properties-change](https://stream.wikimedia.org/v2/stream/mediawiki.page-properties-change)         | `page-properties-change` | Changes to page properties.                                                                          |
| [mediawiki.page-undelete](https://stream.wikimedia.org/v2/stream/mediawiki.page-undelete)                           | `page-undelete` | Undeleted pages.                                                                                     | 
| [mediawiki.recentchange](https://stream.wikimedia.org/v2/stream/mediawiki.recentchange)                             | `recentchange` | Recent changes. The recent changes schema is drastically different from the schema of other streams. |
| [mediawiki.revision-create](https://stream.wikimedia.org/v2/stream/mediawiki.revision-create)                       | `revision-create` | Edits to pages.                                                                                      |
| [mediawiki.revision-score](https://stream.wikimedia.org/v2/stream/mediawiki.revision-score)                         | `revision-score` | ORES scores for edits to pages.                                                                      |
| [mediawiki.revision-tags-change](https://stream.wikimedia.org/v2/stream/mediawiki.revision-tags-change)             |  | Changes to revision tags. Added in v0.4.0.                                                            |
| [mediawiki.revision-visibility-change](https://stream.wikimedia.org/v2/stream/mediawiki.revision-visibility-change) | | Changes to revision visibility (caused by suppression or revision deletion).                         |

### Multiple streams
You can listen to multiple streams at once by passing an array as the parameter when creating a WikimediaStream.

```ts
import WikimediaStream from "wikimedia-streams";

const stream = new WikimediaStream(["page-create", "revision-create"]);

stream.on("page-create", (data, event) => {
	if (data.database === "enwiki") {
		// Page created on the English Wikipedia.
	}
});
stream.on("revision-create", (data, event) => {
	if (data.database === "enwiki") {
		// Page edited on the English Wikipedia.
	}
});
```

## Filtering

You can filter a stream using masks. An event must match the provided mask to be accepted.
Filters are built using the `filter` function, and can only filter one stream type at a time
to ensure proper typing.

```ts
const filter = stream.filter("mediawiki.recentchange");
```

Three filter modes are provided; these mirror the types used by [Pywikibot](https://doc.wikimedia.org/pywikibot/stable/api_ref/pywikibot.comms.html#comms.eventstreams.EventStreams.register_filter) for parity:
* `none` skips the event if it matches the mask. If it skips no event, it proceeds to `all` filters.
* `all` skips the event if it does not match all `all` filters. If it skips no event, it proceeds to `any` filters.
* `any` skips the event if it does not match any `any` filters.

```ts
const filter1 = stream.filter("mediawiki.recentchange");
filter1.none({ type: "categorize" })
	.on((event) => {
		// Only edits that aren't "categorize" types will be accessible here.
	});

const filter2 = stream.filter("mediawiki.recentchange");
filter2
	.all({ type: "edit" })
	.all({ wiki: "enwiki" })
	.on((event) => {
		// Only edits on the English Wikipedia will be accessible here.
	});

const filter3 = stream.filter("mediawiki.recentchange");
filter3
	.any({ type: "commonswiki" })
	.any({ wiki: "enwiki" })
	.on((event) => {
		// Only changes on the English Wikipedia and Wikimedia Commons will be accessible here.
	});
```

Note that you are supposed to chain the filter functions together and in order. Type assistance
will not be available otherwise. Due to how the types are constructed, compile-time errors are
emitted to ensure proper use of the code. This is not available in JavaScript, and can lead to
unexpected behavior if filters are used improperly.

```ts
// This is an example of IMPROPER usage!!!

const filter = stream.filter("mediawiki.recentchange");

filter.all({ type: "categorize" })
	.on((event) => {
		// This will never be called.
	});

filter.all({ type: "edit" })
	.on((event) => {
		// This will never be called.
	});

// By using the above two, the functions in `on` will never be called, since the event will
// only pass through the filter if the edit has a type of both "categorize" and "edit", which
// is impossible.

// This is the correct way to clone filters:
const filter2 = stream.filter("mediawiki.recentchange");
filter2.clone().all({ type: "categorize" })
	.on((event) => {
		// This will be called.
	});
filter2.clone().all({ type: "categorize" })
	.on((event) => {
		// This will be called.
	});
```

```ts
// This is an example of IMPROPER usage!!!

stream.filter("mediawiki.recentchange")
	.all({ wiki: "enwiki" })
	.none({ type: "categorize" }) // This will fail on compile time.
	.on((event) => {
		// Though this will correctly provide English Wikipedia new/edit/log events,
		// types *may* be incorrect.
	});
```

Due to limitations in TypeScript, the received type may be too broad compared to the actual values of the types.

### Examples
1. Get all edits from the English Wikipedia.
	```ts
	stream.filter("mediawiki.recentchange")
	.all({ wiki: "enwiki" })
	.all({ type: "edit" })
	.on((event) => {
		console.log(`New edit from ${event.user} on "${event.title}"`)
	});
	```
2. Get all log events from the English Wikipedia.
	```ts
	stream.filter("mediawiki.recentchange")
	.all({ wiki: "enwiki" })
	.all({ type: "log" })
	.on((event) => {
		console.log(`${event.user} performed ${event.log_type}/${event.log_action} on "${event.title}"`)
	});
	```
3. Get edits from all wikis with a byte difference of greater than 500.
	```ts
	stream.filter("mediawiki.recentchange")
	.all({ wiki: "enwiki" })
	.all({ type: "edit" })
	.on((event) => {
		// Byte difference is a computed value. This must take place in manual filter.
		const byteDiff = event.length.new - event.length.old;
		if (Math.abs(byteDiff) > 500) {
			console.log(`${byteDiff > 0 ? `+${byteDiff}` : byteDiff} bytes ${event.user} on "${event.title}"`)
		}
	});
	```
## Resuming streams
After every received event, the stream stores the ID of the last event that was sent.
This ID can be used to continue streams, so that you don't miss any events. You can
also save this ID to a file when gracefully stopping for a restart, and use it again
at a later time. Note that streams cannot be replayed indefinitely; EventStreams may
only hold an event [for a certain duration](https://wikitech.wikimedia.org/wiki/Event_Platform/EventStreams#Historical_Consumption).

```ts
const stream = new WikimediaStream( 'recentchange' );

// Stopping!
fs.writeFileSync( 'last-event.json', JSON.stringify( stream.lastEventId ) );
stream.close();

// Restarting!
const stream2 = new WikimediaStream( 'recentchange', {
	lastEventId: JSON.parse( fs.readFileSync( 'last-event.json' ).toString( 'utf8' ) )
} );
```

When re-opening a previously closed stream, the library will automatically resume
from the last event that it processed. To avoid this, instantiate a new `WikimediaStream`.

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Type documentation is partially derived from https://stream.wikimedia.org/?doc, also licensed under the Apache License, Version 2.0.

## Disclaimer
You are expected to follow the Wikimedia Foundation [Terms of Use](https://foundation.wikimedia.org/wiki/Terms_of_Use) when accessing EventStreams. The package developer(s) are not liable for any damage caused by you using this package.

If you're developing a bot that runs on Wikimedia wikis which edits based on changes found on EventStreams, be sure to follow the [bot best practices](https://www.mediawiki.org/wiki/Manual:Creating_a_bot#General_guidelines_for_running_a_bot) when making edits or other changes. 
