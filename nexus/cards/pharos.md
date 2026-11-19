### pharos — the shared log · the medium of the spine  *(⚑ placement proposed 2026-11-18, owner to confirm)*
*`scores-patch-points/pharos` · Node 20+, built-ins only, zero dependencies*

- **Does:** the one shared, append-only log (weave, watch, fold) that khora, janus and
  penelope write to and read from, by kind and cell and never by author; the install
  doors that wire a repo to it (`node bin/pharos.mjs install | verify | doors |
  undo-door`: `pharos-core`, `agents-md`, and `reader-stack` behind explicit flags);
  holds the rules khora works under (khora refuses to read without the pharos gate).
- **Doesn't include:** reading, relating or generating (the three bodies are the
  spine; pharos is the medium they share, not a fourth mode); anything heavier than
  the two safe doors unless the human names the flag; writes outside the directory
  the human named, or in the real home.
- **Finds at:** `README.md` ("Do this", "Rules for agents", "Doors"); `bin/pharos.mjs`;
  `lib/gate.mjs` (the gate khora checks).
