import WikimediaStream from "../..";

test('Module resolution test: ESM', () => {
	new WikimediaStream("recentchange", {}).close();
});
