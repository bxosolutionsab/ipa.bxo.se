# OpenIPA site

This repository contains the static website for `ipa.bxo.se`.

There is no build step. Edit the HTML and CSS directly, then open the files in a browser to check the result.

## Structure

- `index.html`: overview and entry page
- `docs/getting-started.html`: quick start and acknowledgement model
- `docs/transport.html`: transport framing, timing, and security notes
- `docs/messages.html`: message-level reference
- `docs/reference.html`: alarm element details, result codes, and change log
- `assets/styles.css`: shared site styles
- `assets/app.js`: mobile menu and in-page section highlighting

## Maintain the site

1. Keep the navigation links in all HTML pages aligned if pages are added or renamed.
2. Keep protocol terms consistent across pages:
   - message names use the XML element names: `Ack`, `Heartbeat`, `TextMessage`, `Alarm`
   - acknowledgements use the `Result` attribute, not `Status`
   - if an `Id` is present, the text should describe that as requesting an acknowledgement
3. When the protocol draft changes, update the smallest relevant page instead of growing one large page again.
4. Open `index.html` and the changed docs pages in a browser and click through the links before publishing.

## Publishing

Upload the files as plain static site content for `ipa.bxo.se`. No generated assets are required.
