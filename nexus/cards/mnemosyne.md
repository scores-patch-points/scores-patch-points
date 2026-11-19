### mnemosyne — the system's mind · one binary hash-chained log  *(⚑ placement proposed 2026-11-18, owner to confirm)*
*`scores-patch-points/mnemosyne`*

- **Does:** `mind.eot`: one file, one hash chain, one writer at a time (append through a
  PR so the chain never forks), recording only the differences that make a difference
  as what was read changed the reader's conclusions; one immutable core, the Universal
  Declaration of Human Rights (the first records, pinned by `core.json`). Tools:
  `node eotm-cli.mjs mind.eot` (dump) and `... verify` (check the chain); test
  `node --test eotm.test.mjs`.
- **Doesn't include:** a library, a record of what sources say, or a second log or
  per-domain file (one log, many readings).
- **Finds at:** `README.md`; `core.json`; `eotm-cli.mjs`; `eotm.test.mjs`.
