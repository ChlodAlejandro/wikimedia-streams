import WikimediaStream from "../src";
import {version} from "../package.json";
import {isMediaWikiRecentChangeEvent} from "../src/streams/MediaWikiRecentChangeEvent";

jest.setTimeout(60000);

let stream : WikimediaStream;
const minToPass = 10;

beforeAll((done) => {
    expect(WikimediaStream.VERSION).toBe(version);
    stream = new WikimediaStream("recentchange");
    done();
});

let done = false;
test("MediaWiki Recent Changes Stream test", (doneFn) => {
    const status = {};

    function stopCheck() {
        if (
			!done
			&& Object.keys(status).length > 0
			&& Object.values(status).every((typeSet) =>
				Object.values(typeSet).every(v => v >= minToPass)
			)
		) {
			done = true;
			doneFn();
		}
		console.log(status);
    }

    expect(stream).toBeInstanceOf(WikimediaStream);

	function observeStream(streamName: "mediawiki.recentchange" | "recentchange") {
		stream.on(streamName, (data, event) => {
			// Meta
			expect(data.$schema).toBe("/mediawiki/recentchange/1.0.0")

			if (status[streamName] == null)
				status[streamName] = {
					"new": 0,
					"edit": 0,
					"categorize": 0,
					"log": 0
				};

			if (status[streamName][data.type] < minToPass) {
				expect(isMediaWikiRecentChangeEvent(data)).toBe(true);
				status[streamName][data.type]++;
				console.log(JSON.stringify(status));
			}

			stopCheck();
		});
	}

	observeStream("mediawiki.recentchange");
	observeStream("recentchange");
});

afterAll((done) => {
    stream.on("close", done);

    stream.close();
});
