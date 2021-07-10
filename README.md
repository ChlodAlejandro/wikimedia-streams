# wikimedia-streams
*This package works best with TypeScript, but also works with plain JavaScript.*

wikimedia-streams connects to Wikimedia's [Event Platform EventStreams](https://wikitech.wikimedia.org/wiki/Event_Platform/EventStreams) in order to serve real-time changes to Wikimedia wikis. This entire library is typed, which makes parameter handling well-documented and defined.

## Usage
Create a new WikimediaStream with the following:

```ts
import WikimediaStream from "wikimedia-streams";

// "recentchange" can be replaced with any valid stream. 
const stream = new WikimediaStream("recentchange");
```

If you're using plain JavaScript, you'll need to add `.default` after `require()`.
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

You can also use `.on("mediawiki.recentchange")` to listen to recent changes. A full list of streams and their available aliases are provided below.

### Available streams

| **Stream** | **Aliases** | **Description** |
|------------|-------------|-----------------|
| [eventgate-main.test.event](https://stream.wikimedia.org/v2/stream/eventgate-main.test.event) | `test` | Testing event. |
| [mediawiki.page-create](https://stream.wikimedia.org/v2/stream/mediawiki.page-create) | `page-create` | Newly-created pages. |
| [mediawiki.page-delete](https://stream.wikimedia.org/v2/stream/mediawiki.page-delete) | `page-delete` | Deleted pages. |
| [mediawiki.page-links-change](https://stream.wikimedia.org/v2/stream/mediawiki.page-links-change) | `page-links-change` | Changes to page links. |
| [mediawiki.page-move](https://stream.wikimedia.org/v2/stream/mediawiki.page-move) | `page-move` | Page moves. | 
| [mediawiki.page-properties-change](https://stream.wikimedia.org/v2/stream/mediawiki.page-properties-change) | `page-properties-change` | Changes to page properties. |
| [mediawiki.page-undelete](https://stream.wikimedia.org/v2/stream/mediawiki.page-undelete) | `page-undelete` | Undeleted pages. | 
| [mediawiki.recentchange](https://stream.wikimedia.org/v2/stream/mediawiki.recentchange) | `recentchange` | Recent changes. The recent changes schema is drastically different from the schema of other streams. |
| [mediawiki.revision-create](https://stream.wikimedia.org/v2/stream/mediawiki.revision-create) | `revision-create` | Edits to pages. |
| [mediawiki.revision-score](https://stream.wikimedia.org/v2/stream/mediawiki.revision-score) | `revision-score` | ORES scores for edits to pages. |
| [mediawiki.revision-visibility-change](https://stream.wikimedia.org/v2/stream/mediawiki.revision-visibility-change) | | Changes to revision visibility (caused by suppression or revision deletion). |

### Multiple streams
You can listen to multiple streams at once by passing an array as the parameter when creating a WikimediaStream.

```ts
import WikimediaStream from "wikimedia-streams";

const stream = new WikimediaStream(["page-create", "revision-create"]);

stream.on("page-create", (data: MediaWikiRecentChangeEvent, event) => {
    if (data.wiki === "enwiki") {
        // Page created on the English Wikipedia.
    }
});
stream.on("revision-create", (data: MediaWikiRecentChangeEvent, event) => {
    if (data.wiki === "enwiki") {
        // Page edited on the English Wikipedia.
    }
});
```

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Type documentation is partially derived from https://stream.wikimedia.org/?doc, which indicates that the documentation is under the aforementioned license as well.

## Disclaimer
You are expected to follow the Wikimedia Foundation [Terms of Use](https://foundation.wikimedia.org/wiki/Terms_of_Use) when accessing EventStreams. The package developer(s) are not liable for any damage caused by you using this package.