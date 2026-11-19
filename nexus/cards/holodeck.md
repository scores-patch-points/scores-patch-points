### holodeck — the fold · the reading/research surface
*pkg `the-fold-surface` · `scores-patch-points/holodeck`*

- **Does:** the single reading/research surface — paste, upload, or link
  anything; split into statements; trace every name, figure, and date back to
  where it appears; discover cross-document agreement, disagreement, and topical
  clusters; **vendors** `eoreader7/native/` + the fold engine and the chat app
  (`vendor/fold-chat/`, pinned `the-fold`); calls the proxy's `POST /v1/read`.
  No build step — `index.html` is the whole app.
- **Doesn't include:** the sample content (holodeck-samples); web fetching/storage
  (holodeck-proxy); the chat app's source (the-fold is upstream — the surface
  only vendors a pinned copy).
- **Finds at:** `README.md`; `VENDORING.md`; `docs/FOLD-CONSTITUTION.md` (the
  law); `docs/HOLODECK-FRAMEWORK.md`; `docs/CONSTITUTIVE-ETHOS-SPEC.md`.
