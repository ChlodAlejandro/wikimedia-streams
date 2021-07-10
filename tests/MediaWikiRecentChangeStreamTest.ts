import WikimediaStream, {EventSourceState} from "../src";
import MediaWikiRecentChangeEvent from "../src/streams/MediaWikiRecentChangeEvent";

jest.setTimeout(60000);

export function testRecentChange(data : MediaWikiRecentChangeEvent) {

    /*
     * WikimediaEventBase
     */

    // Type checks
    expect(typeof data.$schema).toBe("string");
    expect(typeof data.meta).toBe("object");
    expect(typeof data.meta.dt).toBe("string");
    expect(typeof data.meta.stream).toBe("string");
    if (data.meta.uri)
        expect(typeof data.meta.uri).toBe("string");
    if (data.meta.request_id)
        expect(typeof data.meta.request_id).toBe("string");
    if (data.meta.id)
        expect(typeof data.meta.id).toBe("string");
    if (data.meta.domain)
        expect(typeof data.meta.domain).toBe("string");

    // Value checks
    expect(new Date(data.meta.dt).getTime()).not.toBeNaN();
    expect(WikimediaStream.isSpecificWikimediaStream(data.meta.stream)).toBe(true);

    /*
     * Comment
     */
    expect(typeof data.comment).toBe("string");
    if (data.parsedcomment)
        expect(typeof data.parsedcomment).toBe("string");

    /*
     * MediaWikiRecentChangeEventBase
     */

    // Type checks
    expect(["edit", "new", "log", "categorize", "external"]).toContain(data.type);
    expect(typeof data.title).toBe("string");
    expect(typeof data.namespace).toBe("number");
    expect(typeof data.timestamp).toBe("number");
    expect(typeof data.user).toBe("string");
    expect(typeof data.bot).toBe("boolean");
    expect(typeof data.server_url).toBe("string");
    expect(typeof data.server_script_path).toBe("string");
    expect(typeof data.wiki).toBe("string");
    if (data.id)
        expect(typeof data.id).toBe("number");

    // noinspection FallThroughInSwitchStatementJS
    switch(data.type) {
        case "edit":

            expect(typeof data.length.old).toBe("number");
            expect(typeof data.revision.old).toBe("number");

        case "new":

            // Type checks
            expect(typeof data.length).toBe("object");
            expect(typeof data.length.new).toBe("number");
            expect(typeof data.revision).toBe("object");
            expect(typeof data.revision.new).toBe("number");
            expect(typeof data.minor).toBe("boolean");

            // Value checks
            if (data.type === "new") {
                expect((data.length as any).old == null).toBe(true);
                expect((data.revision as any).old == null).toBe(true);
            }

            break;
        case "log":

            // Type checks
            expect(typeof data.log_action).toBe("string");
            expect(typeof data.log_action_comment).toBe("string");
            if (data.log_type)
                expect(typeof data.log_type).toBe("string");
            if (data.log_id)
                expect(typeof data.log_id).toBe("number");

            break;
        case "categorize":
            expect(data.parsedComment).toBeUndefined();
            break;
    }

}

let stream : WikimediaStream;

beforeAll((done) => {
    stream = new WikimediaStream("recentchange");
    done();
});

test("MediaWiki Recent Changes Stream test", async () => {
    const mainOK = {
        "new": false,
        "edit": false,
        "categorize": false,
        "log": false
    };
    const aliasOK = {
        "new": false,
        "edit": false,
        "categorize": false,
        "log": false
    };

    function stopCheck() {
        if (
            Object.values(mainOK).reduce((p, n) => p && n)
            && Object.values(aliasOK).reduce((p, n) => p && n)
        ) {
            return;
        }
    }

    expect(stream).toBeInstanceOf(WikimediaStream);

    stream.on("mediawiki.recentchange", (data, event) => {
        // Meta
        expect(data.$schema).toBe("/mediawiki/recentchange/1.0.0")

        if (!mainOK[data.type]) {
            mainOK[data.type] = true;
            testRecentChange(data);
        }

        stopCheck();
    });

    stream.on("recentchange", (data, event) => {
        // Meta
        expect(data.$schema).toBe("/mediawiki/recentchange/1.0.0")

        if (!aliasOK[data.type]) {
            aliasOK[data.type] = true;
            testRecentChange(data);
        }

        stopCheck();
    });
});

afterAll((done) => {
    stream.on("close", done);

    stream.close();
});