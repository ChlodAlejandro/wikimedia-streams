# 1.0.0
* **BREAKING CHANGE:** Node.js v12 support has been dropped. Use v14 or greater to continue using the library.
* **BREAKING CHANGE:** Types have been updated to reflect real stream output.
* **BREAKING CHANGE:** `open()` now returns a promise that resolves when the stream has opened.
* **BREAKING CHANGE:** Errors will no longer be emitted for natural stream disconnects (every 15 minutes)
* **BREAKING CHANGE:** The stream will now automatically reconnect every 15 minutes, regardless if the server disconnects first
  * This is to prevent lockups due to the stream staying alive despite the connection dying and messages failing to send.
* **BREAKING CHANGE:** The error type has been changed to reflect the actual type
* `lastEventId` is now a possible stream configuration field.
* `since` is now a possible stream configuration field.
* The last event ID can now be retrieved using `WikimediaStream#getLastEventId`.
* WikimediaStream was moved into its own class.
  * For backwards compatibility, the main export now exports WikimediaStream by default, and exports WikimediaStream and the WikimediaStreamFilter type as named exports.
* Added option to disable automatic reconnects on close
* Added filtering using `WikimediaStream#filters` method

# 0.4.0
* Added `mediawiki.revision-tags-change` event.
