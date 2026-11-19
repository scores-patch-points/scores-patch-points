# proteus: makes projected files (the virtual mp4 of an edit) from what other repos wrote to the pharos

> Generated from the nexus manifest (`scores-patch-points/nexus`). Do not edit by hand: change `nexus/nexus.json` or `nexus/cards/proteus.md` in the map repo and regenerate; the map's tests catch drift.

You are in one repo of the **nexus** (`scores-patch-points`): an interconnected body with **no wrong door**. Whichever repo you enter, you can learn the whole from it. The map: https://github.com/scores-patch-points/scores-patch-points. Its place on the map is PROPOSED; the owner has not confirmed it.

## What this repo is
Level `L2-satellite`. Default branch `main`.

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

## Doors, gate, siblings
- Doors:
  - `node bin/proteus.mjs record | check | status | sweep`
  - `node <pharos>/bin/pharos.mjs verify pharos-core --target door`
- Gate (run it before you finish): `npm test`
- Siblings: `pharos`

## Rules in every repo of the nexus
1. Respect the boundary. If a repo's "Doesn't include" names your thing, it belongs in another holon: put it in the smallest holon whose boundary includes it.
2. A typed gap beats a guess. An unknown repo, door, gate, prior or dataset is stated as a gap. A missing sibling or prior is a refusal that says how to get it, never a silent degrade.
3. Start from the default branch of origin, not a stale branch, and say which commit you read.
4. Read and write through the repo's declared door. Do not build a second reader or a second door beside it.
5. Do not push, merge or change user-level configuration without the owner's yes. Commit only paths you can name.
6. Quote every number with its split (dev, fresh, held-out, reused, exploratory) and its stamp. A measure that changed is a new row or a recorded pin, never the same number under the same name.
7. A negative result is a finding: record it with its falsifier.

## Before you start
- `git fetch`; work from `origin/main` and name the commit you read.
- The research rules and what is already established: https://raw.githubusercontent.com/scores-patch-points/penelope/main/BRIEF.md.
