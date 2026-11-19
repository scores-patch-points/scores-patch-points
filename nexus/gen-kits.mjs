#!/usr/bin/env node
// nexus/gen-kits.mjs — EVERY REPO KNOWS WHAT IT IS, FROM ONE SOURCE.
// Generates nexus/kits/<repo>/CLAUDE.md for each public repo that has none, from the manifest (nexus/nexus.json), the repo's card (nexus/cards/<repo>.md),
// the nexus-wide rules (nexus/rules.json) and the survey (default branch). Nothing is typed twice: the kit says what the repo is and is NOT (its card), its
// doors, its gate and its siblings (a gap is stated as a gap), and the rules every repo of the nexus carries. `npm test` fails when nexus/kits/ differs from
// what this generates. Installing a kit into its repo is a separate, owner-approved step (nexus/install-kits.mjs).
//   node nexus/gen-kits.mjs --write     write nexus/kits/*/CLAUDE.md
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "./gen-map.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const MAP_URL = "https://github.com/scores-patch-points/scores-patch-points";
export const BRIEF_URL = "https://raw.githubusercontent.com/scores-patch-points/penelope/main/BRIEF.md";
export const rules = () => JSON.parse(fs.readFileSync(path.join(HERE, "rules.json"), "utf8")).rules;

// the card body without its heading line (the italic provenance line, e.g. the package and runtime, stays)
const cardBody = (card) => String(card ?? "").split("\n").filter((l, i) => !(i === 0 && l.startsWith("### "))).join("\n").trim();

export function kitFor(repo, { cards, manifest, survey, ruleList }) {
  const branch = survey?.repos?.[repo.name]?.defaultBranch ?? "main";
  const doors = repo.doors?.length ? repo.doors.map((d) => `  - \`${d}\``).join("\n") : "  - TYPED GAP: no door is declared for this repo yet. Say so; do not guess one.";
  const gate = repo.gate?.cmd ? `\`${repo.gate.cmd}\`` : `TYPED GAP (${repo.gate?.why ?? "not stated"}). Say so; do not claim it passes.`;
  const sibs = repo.siblings?.length ? repo.siblings.map((s) => `\`${s}\``).join(", ") : "none declared";
  const body = repo.level === "map" ? "- **Does:** assigns every repo its level, boundary and account; holds the nexus manifest, the cards, the survey and the generators.\n- **Doesn't include:** the ground itself: that is the record the map points to." : cardBody(cards[repo.name]);
  return [
    `# ${repo.name}: ${repo.summary}`,
    "",
    `> Generated from the nexus manifest (\`scores-patch-points/nexus\`). Do not edit by hand: change \`nexus/nexus.json\` or \`nexus/cards/${repo.name}.md\` in the map repo and regenerate; the map's tests catch drift.`,
    "",
    `You are in one repo of the **nexus** (\`scores-patch-points\`): an interconnected body with **no wrong door**. Whichever repo you enter, you can learn the whole from it. The map: ${MAP_URL}.${repo.placement === "proposed" ? " Its place on the map is PROPOSED; the owner has not confirmed it." : ""}`,
    "",
    "## What this repo is",
    `Level \`${repo.level}\`. Default branch \`${branch}\`.`,
    "",
    body,
    "",
    "## Doors, gate, siblings",
    "- Doors:",
    doors,
    `- Gate (run it before you finish): ${gate}`,
    `- Siblings: ${sibs}`,
    "",
    "## Rules in every repo of the nexus",
    ...ruleList.map((r, i) => `${i + 1}. ${r.rule}`),
    "",
    "## Before you start",
    `- \`git fetch\`; work from \`origin/${branch}\` and name the commit you read.`,
    `- The research rules and what is already established: ${BRIEF_URL}.`,
    "",
  ].join("\n");
}

// a repo gets a kit when the nexus MANAGES its CLAUDE.md (manifest "kit": "managed", set once the kit is installed) or when the survey found it has none
export const needsKit = (repo, survey) => !repo.private && repo.level !== "L3" && (repo.kit === "managed" || (survey?.repos?.[repo.name] && survey.repos[repo.name].claudeMd === false));

export function generateKits(l = load(), ruleList = rules()) {
  const out = {};
  for (const r of l.manifest.repos) if (needsKit(r, l.survey)) out[r.name] = kitFor(r, { ...l, ruleList });
  return out;
}

export function readKits() {
  const dir = path.join(HERE, "kits"), out = {};
  if (!fs.existsSync(dir)) return out;
  for (const n of fs.readdirSync(dir)) { const f = path.join(dir, n, "CLAUDE.md"); if (fs.existsSync(f)) out[n] = fs.readFileSync(f, "utf8"); }
  return out;
}

if (process.argv[1] && import.meta.url === new URL(`file://${path.resolve(process.argv[1])}`).href && process.argv.includes("--write")) {
  const kits = generateKits();
  for (const [n, t] of Object.entries(kits)) { fs.mkdirSync(path.join(HERE, "kits", n), { recursive: true }); fs.writeFileSync(path.join(HERE, "kits", n, "CLAUDE.md"), t); }
  console.log(`gen-kits: wrote ${Object.keys(kits).length} kits: ${Object.keys(kits).join(", ")}`);
}
