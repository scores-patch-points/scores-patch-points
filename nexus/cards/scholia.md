### scholia — shows a machine reading · the margin notes  *(⚑ placement proposed 2026-11-18, owner to confirm)*
*`scores-patch-points/scholia`*

- **Does:** renders one khora read (`readToWeft`) as one static HTML page: every word
  tinted by class, names, pronoun bindings (confident or contested), prepositional
  phrases, each sentence as a dependency tree and a clause nest, every top-level field
  of the entry raw. A read appends to no log; nothing is written but the HTML.
- **Doesn't include:** reading (it reads through khora, English only for now; point it
  at a checkout with `--khora ../khora` or `KHORA_DIR`) or judging the read.
- **Finds at:** `README.md`; `build.mjs`; test `KHORA_DIR=../khora npm test` (skips when
  no khora checkout is found).
