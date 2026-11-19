### eodb — the event layer
*pkg `matrix-events` · `scores-patch-points/eodb`*

- **Does:** deletes the backend tier — the app is a single client over a commodity
  Matrix homeserver; one shared append-only, end-to-end-encrypted event stream
  with typed operators and a deterministic state projection (rooms are bases,
  events are transformations, the fold is the query).
- **Doesn't include:** any database, auth tier, or API tier of its own; plaintext
  at the homeserver (it holds ciphertext only); app-specific logic above the
  event layer.
- **Finds at:** `README.md`; `BUILDING.md`; `MEMORY.md`; `USE_ME.md`.
