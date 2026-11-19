#!/usr/bin/env node
// nexus/install-kits.mjs — put each generated kit into its repo. OWNER-APPROVED STEP: it pushes to other repos.
//   node nexus/install-kits.mjs              dry run: per repo, the default branch, whether CLAUDE.md is absent, and what would be committed (no network write)
//   node nexus/install-kits.mjs --apply      shallow, blobless clone; add CLAUDE.md; commit with the GitHub noreply identity; push the default branch
// It refuses (a typed refusal) when a repo already has a CLAUDE.md or its default branch moved since the survey, and never overwrites.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { generateKits, generateBlocks, withBlock, blockOf } from "./gen-kits.mjs";
import { generateCi } from "./gen-ci.mjs";
import { load } from "./gen-map.mjs";

const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts }).trim();
const gh = (p, jq) => { try { return sh("gh", ["api", p, ...(jq ? ["--jq", jq] : [])]); } catch { return null; } };
const apply = process.argv.includes("--apply");
const what = process.argv.includes("--what") ? process.argv[process.argv.indexOf("--what") + 1] : "kits";
if (!["kits", "ci", "blocks"].includes(what)) { console.error("--what kits | ci | blocks"); process.exit(2); }
const l = load(), kits = what === "ci" ? generateCi(l) : what === "blocks" ? generateBlocks(l) : generateKits(l);
const FILE = what === "ci" ? ".github/workflows/nexus.yml" : "CLAUDE.md";
const BMSG = "CLAUDE.md: a generated nexus block (where this repo sits, doors, gate, siblings, rules); the rest of the file is untouched\n\nGenerated from the nexus manifest in scores-patch-points/scores-patch-points (nexus/blocks). Only the text between the nexus:begin and nexus:end markers is the map's; this repo's own instructions are unchanged.\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>\n";
const owner = "scores-patch-points";
const id = apply ? sh("gh", ["api", "user", "--jq", ".id"]) : null, login = apply ? sh("gh", ["api", "user", "--jq", ".login"]) : null;
const who = apply ? { GIT_AUTHOR_NAME: "Michael Lacy", GIT_COMMITTER_NAME: "Michael Lacy", GIT_AUTHOR_EMAIL: `${id}+${login}@users.noreply.github.com`, GIT_COMMITTER_EMAIL: `${id}+${login}@users.noreply.github.com` } : {};
const MSG = what === "blocks" ? BMSG : what === "ci" ? "nexus workflow: the generated check every repo of the nexus carries (generated)\n\nGenerated from the nexus manifest in scores-patch-points/scores-patch-points (nexus/ci): CLAUDE.md must equal the generated kit, and the gate runs where it has been verified in a clean checkout; elsewhere the gate is stated as a typed gap.\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>\n" : "CLAUDE.md: what this repo is, its doors, gate and siblings, and the rules of the nexus (generated)\n\nGenerated from the nexus manifest in scores-patch-points/scores-patch-points (nexus/kits). Every repo of the nexus now says what it is and is not, so no door is the wrong door.\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>\n";
let ok = 0, refused = 0;
for (const [name, text] of Object.entries(kits)) {
  const branch = gh(`repos/${owner}/${name}`, ".default_branch");
  const surveyed = l.survey.repos[name].defaultBranch;
  const hasB64 = gh(`repos/${owner}/${name}/contents/${FILE}?ref=${branch}`, ".content");
  const has = hasB64 != null;
  if (what === "blocks") {
    if (!has) { console.log(`REFUSED ${name}: no CLAUDE.md to put a block in`); refused++; continue; }
    const cur = Buffer.from(hasB64, "base64").toString("utf8");
    if (blockOf(cur) === text) { console.log(`ALREADY ${name}: the block is current`); ok++; continue; }
    if (branch !== surveyed) { console.log(`REFUSED ${name}: default branch is ${branch}, the survey said ${surveyed}`); refused++; continue; }
    const next = withBlock(cur, text);
    if (!apply) { console.log(`WOULD ${blockOf(cur) ? "UPDATE" : "ADD"} ${name}@${branch}: nexus block (+${next.split("\n").length - cur.split("\n").length} lines), the rest unchanged`); ok++; continue; }
    const d = fs.mkdtempSync(path.join(os.tmpdir(), `blk-${name}-`));
    sh("git", ["clone", "-q", "--depth", "1", "--filter=blob:none", "--branch", branch, `https://github.com/${owner}/${name}.git`, d]);
    fs.writeFileSync(path.join(d, FILE), withBlock(fs.readFileSync(path.join(d, FILE), "utf8"), text));
    sh("git", ["-C", d, "add", FILE]); sh("git", ["-C", d, "commit", "-q", "-m", MSG], { env: { ...process.env, ...who } });
    sh("git", ["-C", d, "push", "-q", "origin", `HEAD:${branch}`]);
    console.log(`ADDED ${name}@${branch}: ${sh("git", ["-C", d, "rev-parse", "--short", "HEAD"])}`); ok++; continue;
  }
  if (has && Buffer.from(hasB64, "base64").toString("utf8") === text) { console.log(`ALREADY ${name}: ${FILE} is current`); ok++; continue; }
  if (!branch) { console.log(`REFUSED ${name}: repo not readable`); refused++; continue; }
  if (branch !== surveyed) { console.log(`REFUSED ${name}: default branch is ${branch}, the survey said ${surveyed}`); refused++; continue; }
  const ours = has && what === "ci" && Buffer.from(hasB64, "base64").toString("utf8").startsWith("# Generated by scores-patch-points/scores-patch-points");
  if (has && !ours) { console.log(`REFUSED ${name}: already has a different ${FILE} (never overwritten)`); refused++; continue; }
  if (!apply) { console.log(`WOULD ${ours ? "UPDATE (our generated workflow)" : "ADD"} ${name}@${branch}: ${FILE} (${text.split("\n").length} lines)`); ok++; continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `kit-${name}-`));
  sh("git", ["clone", "-q", "--depth", "1", "--filter=blob:none", "--branch", branch, `https://github.com/${owner}/${name}.git`, dir]);
  fs.mkdirSync(path.dirname(path.join(dir, FILE)), { recursive: true });
  fs.writeFileSync(path.join(dir, FILE), text);
  sh("git", ["-C", dir, "add", FILE]);
  sh("git", ["-C", dir, "commit", "-q", "-m", MSG], { env: { ...process.env, ...who } });
  sh("git", ["-C", dir, "push", "-q", "origin", `HEAD:${branch}`]);
  console.log(`ADDED ${name}@${branch}: ${sh("git", ["-C", dir, "rev-parse", "--short", "HEAD"])}`); ok++;
}
console.log(`${apply ? "installed" : "would install"} ${ok}, refused ${refused}`);
