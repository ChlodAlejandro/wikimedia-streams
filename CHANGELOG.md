# 0.4.1
* **BREAKING CHANGE:** Errors will no longer be emitted for natural stream disconnects (every 15 minutes)
* **BREAKING CHANGE:** The stream will now automatically reconnect every 15 minutes, regardless if the server disconnects first
  * This is to prevent lockups due to the stream staying alive despite the connection dying and messages failing to send.
* **BREAKING CHANGE:** The error type has been changed to reflect the actual type
* WikimediaStream was moved into its own class.
  * For backwards compatibility, the main export now exports WikimediaStream by default, and exports WikimediaStream and the WikimediaStreamFilter type as named exports.
* Added option to disable automatic reconnects on close
* Added filtering using `WikimediaStream#filters` method

# 0.4.0
* Added `mediawiki.revision-tags-change` event.
