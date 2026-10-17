# scores-patch-points

**The Fold, assigned as a holarchy — a map for AI agents.**

Read this before you name a repo, pick an account, or write a file. Every noun
here is a real repository; every *where* is a real boundary. An assignment is a
**holon**: a whole that is also a part, governed at its own level. Each holon
declares its **boundary** — what it does and, as strictly, what it does **not**
include. A typed gap beats a guess: if the thing you need is not on this map,
say so; never invent a repo, an account, or a role.

---

## How the assignments are governed — Ostrom's design principles

The repos are a **common-pool resource** (shared ground, one record, many
producers), so they are assigned by Elinor Ostrom's rules for governing a
commons — not by org chart. Every assignment below must satisfy all eight:

1. **Clearly defined boundaries.** Every holon states its *does* and its
   *doesn't*, and which account it is published under. A holon with no stated
   boundary is not assigned.
2. **Congruence between rules and local conditions.** The assignment must match
   the holon's *actual* job — the package name and the README, not an intention.
3. **Collective-choice arrangements.** Those affected by a rule participate:
   agents propose, the record (penelope) decides.
4. **Monitoring.** The state of the commons is watched on the record — the
   append-only ledgers (`content-rules`, `user-memory`, `heimdall-derived-rules`,
   the dispatch ledger) — accountable to the users, never to a central tier.
5. **Graduated sanctions.** Failure is typed before it is fatal: a typed gap, a
   `refuse` lane, a disclosed wall — never a silent fill or a confident guess.
6. **Conflict-resolution mechanisms.** Cost of resolving a disagreement is low
   and local: the ant-swarm, falsification, the constitution — before any hard
   ruling.
7. **Minimal recognition of the right to organize.** Each satellite governs its
   own domain; no holon needs permission from a center to do its one job.
8. **Nested enterprises.** Governance is layered — the spine nests in the
   surfaces nests in the accounts. (A holarchy, not a hierarchy: the lower holon
   is self-governing *and* a part.)

**Assignment law (read the whole guide through it):**
*an agent puts a thing in the smallest holon whose boundary includes it, under the
account that matches its publication state, and finds a thing by its byte address
in that holon's ground — never by a pattern guessed over the whole.*

---

## The holarchy

```
L0  THE FOLD  (the commons — the whole system)
│
├── L1  THE THREE-BODY SPINE  (constitutional: how ground is made and kept)
│   ├── khora      Differentiate — the perceiver · ground-producer
│   ├── janus      Relate        — the reasoner · the mark
│   └── penelope   Generate      — the keeper · the record · the mouth
│
├── L2  THE SURFACES  (constitutional-adjacent: where the ground is shown)
│   ├── holodeck   the fold — reading/research surface (vendors the chat app)
│   └── the-fold   the chat app (fold-chat) — the SOURCE the surface vendors
│
├── L2  THE SATELLITES  (operational: one job each, polycentric)
│   ├── heimdall          distributed local inference (the fleet)
│   ├── Alhazen           the optics pipeline (documents → legible)
│   ├── Zenodotus         the living corpus (live_priors)
│   ├── eodb              the event layer (matrix-events)
│   ├── hyphae            seal what you write
│   ├── holodeck-proxy    no-record web gateway
│   ├── holodeck-samples  sample source sets (readings)
│   └── openfold        the agent's own doorway
│
├── L3  THE ARCHIVES  (memory: frozen, read-only, superseded-not-edited)
│   ├── khora-archive                     frozen prior khora
│   ├── khora-polyglot-session-2026-10-05 results/notes/design docs (no code)
│   └── eo-teachings                      verified byte-addressed teaching snips
│
└── L0g THE ACCOUNTS  (the boundary of the commons — where a holon is published)
    ├── scores-patch-points   FORMAL — publicly released work lives here only
    └── clovenbradshaw-ctrl   DRAFT — in-progress/experimental; LEGACY, salvage only
```

---

## L1 — The three-body spine

The spine is the constitutional level: the three modes of one movement over the
ground. Each is a holon that owns one mode and **not** the other two.

### khora — Differentiate · the perceiver · ground-producer
*pkg `eoreader7` · formerly EOReader 7 · `scores-patch-points/khora`*

- **Does:** reading, perception, measurement, ground; the native kernel and the
  organs; finds and snips a thing by its **byte address** in the field, never by
  a pattern; the reason-gate (a turn is classified before any draw); the doorways
  (proxy / TUI / browser surfaces); serves the surface-side rules at
  `GET /content-rules`; owns the reading corpus, the fleet integration, and the
  AntiStrauss choke point.
- **Doesn't include:** artifact generation (that is penelope); reasoning to a
  conclusion (that is janus — and the reason-gate *forbids* the model reasoning);
  the reading/research UI (that is holodeck).
- **Finds at:** `KHORA.md` (the re-claim: the triad, the discipline, what was
  stripped); `content-rules.json`; `heimdall-derived-rules.json`;
  `docs/PORTS.md` (the doors).

### janus — Relate · the logos · the mark
*pkg `janus` · extracted from khora 2026-10-04 · `scores-patch-points/janus`*

- **Does:** the **Relate** mode — what follows from the record; the reasoning
  closure; two faces at one door: the *reason* (what follows) and the *mark*
  (what stands first in that order).
- **Doesn't include:** perception/ground (khora); artifact generation
  (penelope); originating a fact (the record decides — the mouth only phrases a
  register, narrates a surfaced ground, or writes notes the kernel derives).
- **Finds at:** `README.md`; `content-rules.json`; `native/`, `priors/`.

### penelope — Generate · the keeper · the record · the mouth
*pkg `penelope` · `scores-patch-points/penelope`*

- **Does:** the autonomous app pipeline (a plain-words intent → **remember**
  (library) → **derive** (box) → **get** (hunt) → the local **mouth** only for
  irreducible residue); artifact generation through the artifact-neutral API
  (`POST /api/weave`, an `intent` or an `artifact`); keeps the record; holds the
  mouth and the judgment; runs code and prose pipelines over one shared engine.
- **Doesn't include:** reading source ground (khora); reasoning (janus); the
  reading surface (holodeck). The mouth is never the first resort.
- **Finds at:** `README.md`; `SYSTEM-MAP.md`; `LOOMS.md`; `TAPESTRY.md`;
  `organs/GENERATION-INVENTORY.md`; `ladder/` (the no-model boundary).

---

## L2 — The surfaces

Where the hand comes back to the loom. The surface is the **consumer**; the
spine is the **source**. Vendoring direction is fixed: app → surface, never the
reverse.

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

### the-fold — The Fold's chat version · the chat app
*pkg `fold-chat` · `scores-patch-points/the-fold`*

- **Does:** the browser chat surface — **models are organs, the chat is the
  mouth**; the model runs in the tab (WebLLM on WebGPU); heimdall is embedded in
  the same server as the page; static, deployable to Pages. This is the **SOURCE**
  of the chat app that holodeck vendors.
- **Doesn't include:** document reading/research (holodeck); inference
  infrastructure (heimdall owns the fleet; the chat only embeds it); the surface.
- **Finds at:** `README.md`; `brand/`. **Note:** the former `the-fold` reading
  surface is absorbed by holodeck; this repo now names the chat app.

---

## L2 — The satellites

One job each, self-governing (Ostrom VII). A satellite may not be asked to do
another holon's job; if you need it done, assign it in the owning holon.

### heimdall — distributed local inference
*pkg `heimdall` · `scores-patch-points/heimdall`*

- **Does:** turns any phone or laptop into a managed compute node — a link,
  **Accept**, the device runs a small model in-browser and streams answers back;
  Matrix for signaling, WebRTC for data, WebLLM for local inference; the gate
  (typed admission), the fleet, the ledger.
- **Doesn't include:** any central datastore (no data on a central server); content
  reasoning/generation; the corpus or the reader.
- **Finds at:** `README.md`; `ACTIVITIES.md` (the whole map: doors, gate, the
  degradation ladder, executors, the test/security truth).

### Alhazen — the optics pipeline
*pkg `alhazen` · `scores-patch-points/Alhazen`*

- **Does:** the reading pipeline for document *images* — binarize a page (grayscale
  + Otsu), read its keys and **value formats** (the value's shape; content is
  discarded), read grid structure, propose rules; pure and dependency-free
  (ESM / CommonJS / `window.Alhazen`). Named for Ibn al-Haytham: vision is
  measured, not willed.
- **Doesn't include:** a vision model or the network (none); retained value
  content (format only); OCR-as-flat-text (the unit is the nested grounded
  record); the reading of text itself (khora).
- **Finds at:** `README.md`; `alhazen.js`. Vendored into `holodeck/alhazen.js`
  and `ab/vendor/`.

### Zenodotus — the living corpus
*pkg `live_priors` · `scores-patch-points/Zenodotus`*

- **Does:** **pulls** source texts (not merely catalogues them) by the 17
  categories from the corpus-sources doc, plus children's books (`18-`); fetch
  scripts for every API-accessible source; 2,100+ documents, each ≥ 600 words
  (one deliberate exception); holds derived priors.
- **Doesn't include:** the reading machinery (khora reads; the corpus is source,
  not reader); the surface that displays it.
- **Finds at:** `README.md`; `SOURCES.md`; `POLICIES.md`; `derived-priors/`.

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

### hyphae — seal what you write
*pkg `hyphae` · `scores-patch-points/hyphae`*

- **Does:** a browser extension that turns text, Gmail messages, and Drive
  uploads into ciphertext **on your device**; a HYPHAE switch in Gmail compose, a
  HYPHAE button in Drive (seal / verify / undo a whole Drive); recipients
  suggested from a local directory.
- **Doesn't include:** keys traveling over the channel that carries the ciphertext
  (they never do); plaintext at the site (it stores sealed bytes only). **Phase 0**
  runs on mock data.
- **Finds at:** `README.md`; `GOAL.md`; `extension/`, `app/`.

### holodeck-proxy — no-record web gateway
*pkg `holodeck-proxy` · `scores-patch-points/holodeck-proxy`*

- **Does:** a Cloudflare Worker giving static pages the three things a browser
  cannot do alone — `GET /raw?url=` (fetch + CORS), `GET /search?scope=web|news|
  youtube&q=` (JSON results), `GET /yt?v=` (title, description, caption
  transcript).
- **Doesn't include:** any storage or logs (it stores nothing, writes none); a
  search index of its own (it reads DuckDuckGo/Brave).
- **Finds at:** `README.md`; `src/`; `wrangler.toml`.

### holodeck-samples — sample source sets
*`scores-patch-points/holodeck-samples`*

- **Does:** carries the **readings** for the fold demo (e.g.
  `titanic-1912/readings.json` — each source already read down to its passages,
  installed as the app installs them); the app carries only a pointer.
- **Doesn't include:** any content — recordings and scans are served from the VM,
  book texts live where they live; nothing is parsed or OCR'd in a visitor's
  browser.
- **Finds at:** `README.md`; `titanic-1912/`.

### openfold — the agent's own doorway
*pkg `opencode` · `scores-patch-points/openfold`*

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

---

## L3 — The archives

Frozen memory. Superseded-not-edited (Ostrom: monitoring without rewriting the
record). Do not start new work here; bring what is needed *out* into a live
holon.

### khora-archive — *private*
- **Does:** a frozen prior state of the khora (same perceiver/ground discipline).
- **Doesn't include:** the live khora — new reading work goes to `khora`.
- **Finds at:** its `KHORA.md` (mirrors the live re-claim).

### khora-polyglot-session-2026-10-05 — *private*
- **Does:** keeps the **results, notes, and design documents** of the
  2026-10-05/06 polyglot session (how well the khora reads many languages,
  programming languages, and notations).
- **Doesn't include:** code (it lives in `khora`) or priors; the numbers are
  instrument-computed, the *explanations* are AI-written and NOT verified.
- **Finds at:** `README.md`; `docs/COMPETENCE-CARD.md`, `docs/POLYGLOT-CARD.md`.

### eo-teachings — *private*
- **Does:** verified, **byte-addressed snips** of what the archons were taught;
  archon activation/swarm, the ethos pipeline, AntiStrauss, logos-yield.
- **Doesn't include:** the sources publicly — `sources/` holds fair-use excerpts
  (hence private).
- **Finds at:** `ETHOS-ARCHONS.md`; `manifest/`; `falsify/`; `research/`.

---

## L0g — The accounts (the boundary of the commons)

An assignment is only real once it names its account. One boundary rule:

| Account | Boundary |
|---|---|
| **scores-patch-points** | The **FORMAL** publishing account. Publicly released work goes here **only**. |
| **clovenbradshaw-ctrl** | The **DRAFT** account — in-progress, experimental, private work. **LEGACY: salvage only.** Bring what is needed into `scores-patch-points`; do not start here. |

Before any push: check `gh auth status`. Publish under `scores-patch-points`;
drafts under `clovenbradshaw-ctrl`.

---

## Where to put what — the assignment table

| When you have… | Put it in… | Because its boundary includes it |
|---|---|---|
| a change to reading / perception / ground | **khora** | khora Differentiates |
| a rule for what follows from the record | **janus** | janus Relates |
| an artifact generator, the mouth, the record | **penelope** (enter via `POST /api/weave`) | penelope Generates |
| a change to the reading/research surface | **holodeck** | the surface is the consumer |
| a change to the chat app | **the-fold**, then re-vendor into holodeck | the app is the source |
| a corpus text / source set | **Zenodotus** | the corpus is source, not reader |
| an optics / OCR / document-image rule | **Alhazen** | the optics pipeline |
| the event / data layer | **eodb** | the backend-free event layer |
| sealed-writing / extension work | **hyphae** | seal what you write |
| a web fetch/search gateway change | **holodeck-proxy** | the no-record gateway |
| sample readings for a demo | **holodeck-samples** | it carries the readings |
| a doorway/plugin or fold-UI change to the agent | **openfold** | the delta is the add-only doorway + its fold UI |
| frozen session results / notes | an **archive** (L3) | memory is read-only |
| a public release | **scores-patch-points** | the formal account |
| in-progress / experimental work | **clovenbradshaw-ctrl** | the draft account |

## Where to find what — the ground table

| You need… | Read… |
|---|---|
| the whole system, in one breath | `khora/KHORA.md` |
| the law / constitution | `holodeck/docs/FOLD-CONSTITUTION.md` |
| the framework and the ethos | `holodeck/docs/HOLODECK-FRAMEWORK.md`, `CONSTITUTIVE-ETHOS-SPEC.md` |
| standing reading rules (agent side) | `~/.config/opencode/content-rules.md` |
| standing reading rules (surface side) | `khora/content-rules.json` — served at `GET /content-rules` |
| the agent policy (swarm protocol) | `~/.config/opencode/AGENTS.md` |
| facts about the operator and their world | `~/.config/opencode/user-memory.md` ↔ `holodeck/user-memory.json` |
| what the system may read on demand, and the prompts attached to an ask | `~/.config/opencode/user-refs.md`, `~/.config/opencode/system-prompts.json` (agent side; written from the Remember window, injected only when an ask bears on them — **no surface mirror yet**) |
| derived rules for surface material | `khora/heimdall-derived-rules.json` |
| how the repos relate (vendoring direction) | `holodeck/VENDORING.md` |
| the doors / ports | `khora/docs/PORTS.md` |
| the generation inventory | `penelope/organs/GENERATION-INVENTORY.md` |

---

## The assignment law, for the agent

1. **Read the ground before you name anything.** Read `AGENTS.md`,
   `content-rules`, and `user-memory` before you name a repo or account
   canonical.
2. **Find by address, never by pattern.** A thing is found by its byte address
   in its holon's field, and snipped at its permanent address — never by a match
   guessed over the whole.
3. **Put it in the smallest holon whose boundary includes it**, under the account
   that matches its publication state.
4. **Respect the boundary.** If a holon's *doesn't include* names your thing, it
   belongs in another holon — do not cross the boundary because it is convenient.
5. **The mouth never originates a fact and never reasons to a conclusion.** It
   phrases a register, narrates a surfaced ground, or writes notes the kernel
   derives.
6. **Falsify or die.** Every artifact carries its dissent — scars, refusals,
   non-convergence, named gaps. Never report a confident meaning over a swarm
   that did not converge.
7. **A typed gap beats a guess.** An unknown repo, account, or role is stated as
   a gap — never filled silently.

*This README is the front door of the commons. It is a holon too: it **does**
assign every repo its level, boundary, and account; it **does not include** the
ground itself — that is the record the map points to.*
