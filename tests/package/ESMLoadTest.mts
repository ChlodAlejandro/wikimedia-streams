import WikimediaStream from "../..";

test('Module load test: ESM', () => {
	new WikimediaStream("recentchange", {}).close();
});
