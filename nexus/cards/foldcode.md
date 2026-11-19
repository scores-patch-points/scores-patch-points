### foldcode — the agent's own doorway
*pkg `opencode` · `scores-patch-points/foldcode`*

- **Does:** a thin fork of the opencode AI coding agent whose delta is **add-only**
  and guarded (`fold-sync.sh` fails if it deletes an upstream line or leaves the
  allowed list): the doorway plugin (how this environment reaches The Fold's
  surfaces) and the **fold UI** — the side tabs the doorway feeds (Fold/Sent/
  Worktree/Holodeck/Perceive/Plans), among them the **Remember** window over the
  operator's standing stores.
- **Doesn't include:** any change to an upstream line (the delta only ever adds);
  the stores themselves (their content is the operator's — the fork only shows
  and appends them); the readers that decide what a store buys (that is khora).
- **Finds at:** `AGENTS.md`; `UPSTREAM.md` (the delta contract and its falsifying
  control); `packages/core/src/plugin/fold.ts` (the doorway plugin),
  `packages/gui-extensions/src/fold/` (the fold UI, incl. `remember.tsx`).
