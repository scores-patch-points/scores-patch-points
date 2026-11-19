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
│   ├── penelope   Generate      — the keeper · the record · the mouth
│   └── pharos     the shared log — the medium the three share  (⚑ placement proposed)
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
│   ├── foldcode        the agent's own doorway
│   ├── scholia           shows a machine reading as margin notes  (⚑ placement proposed)
│   └── mnemosyne         the system's mind: one hash-chained log  (⚑ placement proposed)
│
├── L3  THE ARCHIVES  (memory: frozen, read-only, superseded-not-edited)
│   ├── khora-archive                     frozen prior khora
│   ├── khora-polyglot-session-2026-10-05 results/notes/design docs (no code)
│   └── eo-teachings                      verified byte-addressed teaching snips
│
└── L0g THE ACCOUNTS  (the boundary of the commons — where a holon is published)
    ├── scores-patch-points   THE NEXUS — formal, interconnected, no wrong door
    └── clovenbradshaw-ctrl   ITERATION — where work iterates; promoted into the nexus when its gate passes
```

---

## L1 — The three-body spine

The spine is the constitutional level: the three modes of one movement over the
ground. Each is a holon that owns one mode and **not** the other two.

{{card:khora}}
{{card:janus}}
{{card:penelope}}
{{card:pharos}}
---

## L2 — The surfaces

Where the hand comes back to the loom. The surface is the **consumer**; the
spine is the **source**. Vendoring direction is fixed: app → surface, never the
reverse.

{{card:holodeck}}
{{card:the-fold}}
---

## L2 — The satellites

One job each, self-governing (Ostrom VII). A satellite may not be asked to do
another holon's job; if you need it done, assign it in the owning holon.

{{card:heimdall}}
{{card:Alhazen}}
{{card:Zenodotus}}
{{card:eodb}}
{{card:hyphae}}
{{card:holodeck-proxy}}
{{card:holodeck-samples}}
{{card:foldcode}}
{{card:scholia}}
{{card:mnemosyne}}
---

## L3 — The archives

Frozen memory. Superseded-not-edited (Ostrom: monitoring without rewriting the
record). Do not start new work here; bring what is needed *out* into a live
holon.

{{card:khora-archive}}
{{card:khora-polyglot-session-2026-10-05}}
{{card:eo-teachings}}
---

## L0g — The accounts (the boundary of the commons)

An assignment is only real once it names its account. One boundary rule:

{{table:accounts}}

Before any push, check which account your credentials act as (`gh auth status`, and the git credential, which can differ). Iterate under
`clovenbradshaw-ctrl`; publish into `scores-patch-points`.

---

## Where to put what — the assignment table

{{table:assignment}}

## Where to find what — the ground table

{{table:ground}}

---

## The nexus — what is true of every repo *(proposed 2026-11-18; agents propose, the record decides)*

A repo is part of the nexus, not merely beside it, when:

1. **It declares itself.** One manifest entry (`nexus/nexus.json`): its role, what it does **not** include, its doors, its gate, its siblings. This map and the repo's `CLAUDE.md` are generated from the manifest and the cards, and a test fails when they drift.
2. **It can say what it is, by command:** its commit, its siblings' commits, which priors and data it has, its gate state, its known red, and its claims with their labels.
3. **Its doors are declared and tested.** A missing sibling, prior or dataset is a typed refusal that says how to get it, never a silent skip.
4. **It has a gate that runs on every push and can only get less red** (penelope's ratchet is the model). A repo with no CI is a typed gap in the table below.
5. **Its seams are contracts.** The mark kinds khora, janus and penelope write into pharos have one registry, and each repo's tests check against it.
6. **It iterates before it enters.** Work iterates under `clovenbradshaw-ctrl`; it is promoted here when its gate passes and its claims are on a ledger (split label, stamp, pinned measure).
7. **Every result is stamped with its environment:** repo commit, sibling commits, prior hashes.

Where the nexus stands: a read-only survey of the public repos on 2026-11-18 (`nexus/survey.json`). `?` = not surveyed; `typed gap` = the manifest names no gate or door yet, which is the honest state, not a failure to look. Private repos are not visible to the survey.

{{status}}

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
8. **No wrong door.** Whichever repo you enter, you can learn the whole from it:
   read its `CLAUDE.md`, run its gate, follow the map. A missing sibling, prior or
   dataset is a typed refusal that says how to get it — never a silent degrade.

*This README is the front door of the commons. It is a holon too: it **does**
assign every repo its level, boundary, and account; it **does not include** the
ground itself — that is the record the map points to.*
