# nexus/guards: the one canonical copy of the language-is-read-by-the-reader guard (nexus rule 8)

- `text-regex-ratchet.mjs`: the detector and the ratchet (the count of regex applications may not grow; baseline `text-regex-baseline.jsonl`, in `gym/` if the repo has one, else the repo root; `--list`, `--record --why`, `--tighten --why`).
- `hook-no-text-regex.mjs`: a Claude Code PreToolUse hook (Edit | Write | MultiEdit) that blocks a write that adds an undeclared regex on language. Wire it in the repo's `.claude/settings.json` (see `claude-settings.json`; adjust the path if the file is not under `gym/`).
- CI: every managed repo's generated `.github/workflows/nexus.yml` fetches the ratchet from THIS directory and runs it against the repo's own baseline, so the detector cannot drift between repos. A repo with no baseline yet gets a typed gap (a notice that says how to record one), never a pass that checked nothing.
- A pattern on a path, hash, id or file format is declared on its line: `// regex-ok: <why it is not language>`.
