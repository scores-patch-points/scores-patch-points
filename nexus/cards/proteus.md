### proteus — makes projected files · the virtual mp4 of an edit  *(⚑ placement proposed 2026-11-19, owner to confirm)*
*`scores-patch-points/proteus` · Node 20+, built-ins only, zero dependencies (ffmpeg to build)*

- **Does:** reads the editor's `placement` entries from the pharos by kind, builds the virtual mp4 of an
  edit (a computed header over cached all-intra chunks, no render per edit), and weaves the recipe
  (`vfile`) and the evidence (`vfile-check`); honours the management entries (`vfile-pin`, `vfile-evict`)
  that another repo weaves, dropping only cached chunks that no live pinned or unrequested file needs,
  and answering with `vfile-evicted`.
- **Doesn't include:** editing (the editor weaves the placements); deciding what to keep or when to
  drop (the management entries are another repo's); serving a file from a recipe id; audio, overlays or
  effects (only the V1 picture is folded); the bytes in the log (chunks are a rebuildable cache); any
  call to another repo (it loads only the pharos library, through the sha256-pinned pointer in `door/`).
- **Finds at:** `README.md`; `docs/VFILE.md` (the entry contract); `bin/proteus.mjs`; `door/` (the pharos door).
