# 3.0.0
* **BREAKING CHANGE:** Various files moved around; the main file is now `dist/cjs/index.js`.
* Added browser support
* `require`/`import`/`browser` exports now available
* `dist/browser/lib.js` is now available for on-wiki gadget use
* `dist/browser/bundle.js` is now available for on-wiki userscript use
* Radical TypeScript configuration build changes
* Added Rollup as a bundler and Selenium Webdriver as a browser test runner
* Removed custom header case sensitivity

No changes to method signatures is expected with this version; the library will use
Node.js' native EventEmitter when running on Node, and an EventEmitter polyfill and
native EventSource on browsers.

# 2.1.0
* Added option to avoid filtering out canary events: `enableCanary`.

# 2.0.1
* Fixed `package.json` main field to point to the correct file.

# 2.0.0
* **BREAKING CHANGE:** `mediawiki.revision-score` has been removed following its deprecation ([phab:T342116](https://phabricator.wikimedia.org/T342116))

# 1.0.1
* Minor cleanup and documentation fixes.

# 1.0.0
* **BREAKING CHANGE:** Node.js v12 support has been dropped. Use v14 or greater to continue using the library.
* **BREAKING CHANGE:** Types have been updated to reflect real stream output.
* **BREAKING CHANGE:** `open()` now returns a promise that resolves when the stream has opened.
* **BREAKING CHANGE:** Errors will no longer be emitted for natural stream disconnects (every 15 minutes).
* **BREAKING CHANGE:** The stream will now automatically reconnect every 15 minutes, regardless if the server disconnects first.
  * This is to prevent lockups due to the stream staying alive despite the connection dying and messages failing to send.
* **BREAKING CHANGE:** The error type has been changed to reflect the actual type.
* `lastEventId` is now a possible stream configuration field.
* `since` is now a possible stream configuration field.
* The last event ID can now be retrieved using `WikimediaStream#getLastEventId`.
* WikimediaStream was moved into its own class.
  * For backwards compatibility, the main export now exports WikimediaStream by default, and exports WikimediaStream and the WikimediaStreamFilter type as named exports.
* Additional exports are now available, namely the array of supported event keys.
* Added option to disable automatic reconnects on close
* Added filtering using `WikimediaStream#filters` method

# 0.4.0
* Added `mediawiki.revision-tags-change` event.
