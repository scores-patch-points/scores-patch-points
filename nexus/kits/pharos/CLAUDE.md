# pharos: the shared log, the medium the three share

> Generated from the nexus manifest (`scores-patch-points/nexus`). Do not edit by hand: change `nexus/nexus.json` or `nexus/cards/pharos.md` in the map repo and regenerate; the map's tests catch drift.

You are in one repo of the **nexus** (`scores-patch-points`): an interconnected body with **no wrong door**. Whichever repo you enter, you can learn the whole from it. The map: https://github.com/scores-patch-points/scores-patch-points. Its place on the map is PROPOSED; the owner has not confirmed it.

## What this repo is
Level `L1`. Default branch `main`.

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

## Doors, gate, siblings
- Doors:
  - `node bin/pharos.mjs install | verify | doors`
- Gate (run it before you finish): `npm test`
- Siblings: none declared

## Rules in every repo of the nexus
1. Respect the boundary. If a repo's "Doesn't include" names your thing, it belongs in another holon: put it in the smallest holon whose boundary includes it.
2. A typed gap beats a guess. An unknown repo, door, gate, prior or dataset is stated as a gap. A missing sibling or prior is a refusal that says how to get it, never a silent degrade.
3. Start from the default branch of origin, not a stale branch, and say which commit you read.
4. Read and write through the repo's declared door. Do not build a second reader or a second door beside it.
5. Do not push, merge or change user-level configuration without the owner's yes. Commit only paths you can name.
6. Quote every number with its split (dev, fresh, held-out, reused, exploratory) and its stamp. A measure that changed is a new row or a recorded pin, never the same number under the same name.
7. A negative result is a finding: record it with its falsifier.
8. Language is read by the reader, never by a pattern: a sentence, a question, a name or a relation goes through the reader's rows (its UD codec) to marks in EOT, and matching and reasoning happen on those marks, never on surface strings; a language with no codec is a typed gap, never English by default. Carry the text-regex ratchet (the count of regex applications may not grow); a pattern on a path, hash, id or file format is declared `// regex-ok: <why it is not language>`.

## Before you start
- `git fetch`; work from `origin/main` and name the commit you read.
- The research rules and what is already established: https://raw.githubusercontent.com/scores-patch-points/penelope/main/BRIEF.md.
