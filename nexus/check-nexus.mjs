#!/usr/bin/env node
// nexus/check-nexus.mjs — THE MAP CANNOT LIE ABOUT ITSELF.
// Fails when: the README differs from what nexus/gen-map.mjs generates; a manifest entry lacks a field (account, level, summary, placement, doors, gate;
// a gate of null must say why: a typed gap, never silence); a repo has no card, or a card states no boundary (Ostrom 1: a holon with no stated boundary is
// not assigned); a card has no manifest entry or no place in the template; a repo is missing from the holarchy tree; a sibling is not a repo on the map;
// a public repo is missing from the survey. With --live it also fails when a public repo of the org is not on the map at all.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { generate, load } from "./gen-map.mjs";
import { generateKits, readKits, generateBlocks, readBlocks, blockOf } from "./gen-kits.mjs";
import { generateCi, readCi } from "./gen-ci.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const LEVELS = new Set(["L1", "L2-surface", "L2-satellite", "L3", "map"]);

export function checkNexus({ template, cards, manifest, survey, readme, liveNames = null, kits = null, remoteKits = null, ci = null, remoteCi = null, blocks = null, remoteBlocks = null }) {
  const out = [];
  const repos = manifest.repos ?? [], names = repos.map((r) => r.name);
  const dup = names.filter((n, i) => names.indexOf(n) !== i);
  for (const d of new Set(dup)) out.push(`manifest: repo ${d} is listed twice`);
  const known = new Set(names);
  for (const r of repos) {
    const at = `repo ${r.name}`;
    for (const k of ["account", "level", "summary", "placement"]) if (!r[k]) out.push(`${at}: no "${k}"`);
    if (r.level && !LEVELS.has(r.level)) out.push(`${at}: unknown level "${r.level}"`);
    if (r.ci != null && (r.ci.workflow !== "managed" || typeof r.ci.gate !== "boolean")) out.push(`${at}: "ci" must be { workflow: "managed", gate: true|false, gateWhy }`);
    if (r.ci?.gate && !r.gate?.cmd) out.push(`${at}: ci.gate is true but the manifest names no gate command`);
    if (r.kit != null && r.kit !== "managed" && r.kit !== "block") out.push(`${at}: "kit" must be "managed", "block" or absent`);
    if (!Array.isArray(r.doors)) out.push(`${at}: "doors" must be a list (empty is a typed gap, shown as such)`);
    if (!r.gate || !("cmd" in r.gate)) out.push(`${at}: no "gate" ({ cmd } or { cmd: null, why })`);
    else if (r.gate.cmd == null && !r.gate.why) out.push(`${at}: gate is null with no reason: a gap must say why`);
    for (const s of r.siblings ?? []) if (!known.has(s)) out.push(`${at}: sibling ${s} is not a repo on the map`);
    if (r.level !== "map") {
      const card = cards[r.name];
      if (card == null) out.push(`${at}: no card (nexus/cards/${r.name}.md)`);
      else {
        if (!/\*\*Does:\*\*/.test(card) || !/\*\*Doesn't include:\*\*/.test(card)) out.push(`${at}: its card states no boundary (needs **Does:** and **Doesn't include:**)`);
        if (!template.includes(`{{card:${r.name}}}`)) out.push(`${at}: its card is not placed in the template`);
      }
    }
    if (!r.private && r.level !== "L3" && !survey?.repos?.[r.name]) out.push(`${at}: not in the survey (nexus/survey.json)`);
  }
  for (const c of Object.keys(cards)) if (!known.has(c)) out.push(`card ${c}: no manifest entry`);
  const tree = (readme.match(/## The holarchy\s+```([\s\S]*?)```/) ?? [])[1] ?? "";
  for (const r of repos) if (r.level !== "map" && !tree.includes(r.name)) out.push(`repo ${r.name}: missing from the holarchy tree`);
  let generated = null;
  try { generated = generate({ template, cards, manifest, survey }); } catch (e) { out.push(`generate: ${e.message}`); }
  if (generated !== null && generated !== readme) out.push("README.md differs from what `node nexus/gen-map.mjs` generates: run `npm run map` (never edit the README by hand)");
  if (kits) {
    const want = generateKits({ template, cards, manifest, survey });
    for (const n of Object.keys(want)) if (kits[n] !== want[n]) out.push(`kit ${n}: nexus/kits/${n}/CLAUDE.md is ${kits[n] == null ? "missing" : "out of date"}: run \`npm run kits\``);
    for (const n of Object.keys(kits)) if (!(n in want)) out.push(`kit ${n}: no longer needed (the repo has a CLAUDE.md, is private or is not on the map)`);
  }
  if (ci) {
    const want = generateCi({ manifest });
    for (const n of Object.keys(want)) if (ci[n] !== want[n]) out.push(`ci ${n}: nexus/ci/${n}/nexus.yml is ${ci[n] == null ? "missing" : "out of date"}: run \`npm run ci:gen\``);
    for (const n of Object.keys(ci)) if (!(n in want)) out.push(`ci ${n}: no longer needed`);
  }
  if (remoteCi) {
    const want = generateCi({ manifest });
    for (const n of Object.keys(want)) {
      if (remoteCi[n] == null) out.push(`repo ${n}: its .github/workflows/nexus.yml is not installed`);
      else if (remoteCi[n] !== want[n]) out.push(`repo ${n}: its .github/workflows/nexus.yml differs from the generated workflow (a hand edit, or the generator moved on)`);
    }
  }
  if (remoteKits) {
    const want = generateKits({ template, cards, manifest, survey });
    for (const n of Object.keys(want)) {
      const repo = repos.find((r) => r.name === n);
      if (repo?.kit !== "managed") continue;
      if (remoteKits[n] == null) out.push(`repo ${n}: its managed CLAUDE.md is not installed`);
      else if (remoteKits[n] !== want[n]) out.push(`repo ${n}: its CLAUDE.md differs from the generated kit (a hand edit, or the kit moved on): reinstall or update the manifest`);
    }
  }
  if (blocks) {
    const want = generateBlocks({ template, cards, manifest, survey });
    for (const n of Object.keys(want)) if (blocks[n] !== want[n]) out.push(`block ${n}: nexus/blocks/${n}.md is ${blocks[n] == null ? "missing" : "out of date"}: run \`npm run kits\``);
  }
  if (remoteBlocks) {
    const want = generateBlocks({ template, cards, manifest, survey });
    for (const n of Object.keys(want)) {
      if (remoteBlocks[n] == null) out.push(`repo ${n}: its CLAUDE.md has no nexus block`);
      else if (blockOf(remoteBlocks[n]) !== want[n]) out.push(`repo ${n}: the nexus block in its CLAUDE.md differs from the generated block`);
    }
  }
  if (liveNames) for (const n of liveNames) if (!known.has(n)) out.push(`repo ${n} exists in the org but is not on the map`);
  return out;
}

export function checkFiles({ liveNames = null, remoteKits = null, remoteCi = null, remoteBlocks = null } = {}) {
  const l = load();
  return checkNexus({ ...l, readme: fs.readFileSync(path.join(ROOT, "README.md"), "utf8"), liveNames, kits: readKits(), remoteKits, ci: readCi(), remoteCi, blocks: readBlocks(), remoteBlocks });
}

if (process.argv[1] && import.meta.url === new URL(`file://${path.resolve(process.argv[1])}`).href) {
  let liveNames = null;
  if (process.argv.includes("--live")) {
    liveNames = JSON.parse(execFileSync("gh", ["repo", "list", "scores-patch-points", "--limit", "100", "--json", "name,isArchived"], { encoding: "utf8" })).filter((r) => !r.isArchived).map((r) => r.name);
    console.log(`nexus: ${liveNames.length} public repos in the org (live)`);
  }
  let remoteKits = null;
  if (liveNames) {
    remoteKits = {};
    for (const r of load().manifest.repos) if (r.kit === "managed") {
      try { remoteKits[r.name] = Buffer.from(execFileSync("gh", ["api", `repos/scores-patch-points/${r.name}/contents/CLAUDE.md`, "--jq", ".content"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }), "base64").toString("utf8"); } catch { remoteKits[r.name] = null; }
    }
  }
  let remoteCi = null;
  if (liveNames) {
    remoteCi = {};
    for (const r of load().manifest.repos) if (r.ci?.workflow === "managed") {
      try { remoteCi[r.name] = Buffer.from(execFileSync("gh", ["api", `repos/scores-patch-points/${r.name}/contents/.github/workflows/nexus.yml`, "--jq", ".content"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }), "base64").toString("utf8"); } catch { remoteCi[r.name] = null; }
    }
  }
  let remoteBlocks = null;
  if (liveNames) {
    remoteBlocks = {};
    for (const r of load().manifest.repos) if (r.kit === "block") {
      try { remoteBlocks[r.name] = Buffer.from(execFileSync("gh", ["api", `repos/scores-patch-points/${r.name}/contents/CLAUDE.md`, "--jq", ".content"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }), "base64").toString("utf8"); } catch { remoteBlocks[r.name] = null; }
    }
  }
  const problems = checkFiles({ liveNames, remoteKits, remoteCi, remoteBlocks });
  if (problems.length) { console.error(`nexus: ${problems.length} problem(s)\n` + problems.map((p) => "  " + p).join("\n")); process.exit(1); }
  console.log("nexus: the map matches its manifest, cards and survey" + (liveNames ? ", and every public repo of the org is on it" : ""));
}
