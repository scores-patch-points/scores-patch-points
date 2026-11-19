#!/usr/bin/env node
// nexus/gen-map.mjs — THE MAP IS GENERATED, NOT TYPED TWICE.
// README.md = nexus/map.template.md with {{card:<repo>}} replaced by nexus/cards/<repo>.md, {{table:<name>}} by the table in nexus/nexus.json,
// and {{status}} by the self-awareness table computed from nexus/survey.json. nexus/check-nexus.mjs (and its test, run by `npm test`) fails when
// README.md differs from what this generates, so the map cannot drift from its sources, and when the manifest and the cards disagree.
//   node nexus/gen-map.mjs            print the map
//   node nexus/gen-map.mjs --write    write README.md
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const read = (p) => fs.readFileSync(path.join(HERE, p), "utf8");

export const renderTable = ({ header, sep, rows }) => [`| ${header.join(" | ")} |`, sep, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

export function statusTable(manifest, survey) {
  if (!survey) return "(no survey recorded)";
  const mark = (v) => (v === true ? "yes" : v === false ? "NO" : "?");
  const header = ["repo", "CLAUDE.md", "BRIEF", "CI", "gate named", "main protected", "door declared"];
  const rows = manifest.repos.filter((r) => !r.private && r.level !== "L3").map((r) => {
    const s = survey.repos?.[r.name] ?? {};
    return [`\`${r.name}\``, mark(s.claudeMd), mark(s.brief), s.ciWorkflows == null ? "?" : String(s.ciWorkflows), r.gate?.cmd ? `\`${r.gate.cmd}\`` : "typed gap", mark(s.mainProtected), r.doors?.length ? String(r.doors.length) : "typed gap"];
  });
  return renderTable({ header, sep: "|---|---|---|---|---|---|---|", rows });
}

export function generate({ template, cards, manifest, survey }) {
  let out = template;
  out = out.replace(/\{\{card:([^}]+)\}\}/g, (_, n) => { if (!(n in cards)) throw new Error(`template names card ${n} but nexus/cards/${n}.md does not exist`); return cards[n]; });
  out = out.replace(/\{\{table:([^}]+)\}\}/g, (_, n) => { if (!manifest.tables?.[n]) throw new Error(`template names table ${n} but nexus.json has none`); return renderTable(manifest.tables[n]); });
  out = out.replace(/\{\{status\}\}/g, () => statusTable(manifest, survey));
  return out;
}

export function load() {
  const manifest = JSON.parse(read("nexus.json"));
  const cards = {};
  for (const f of fs.readdirSync(path.join(HERE, "cards"))) if (f.endsWith(".md")) cards[f.slice(0, -3)] = read(path.join("cards", f));
  const survey = fs.existsSync(path.join(HERE, "survey.json")) ? JSON.parse(read("survey.json")) : null;
  return { template: read("map.template.md"), cards, manifest, survey };
}

export const build = () => generate(load());

if (process.argv[1] && import.meta.url === new URL(`file://${path.resolve(process.argv[1])}`).href) {
  const text = build();
  if (process.argv.includes("--write")) { fs.writeFileSync(path.join(ROOT, "README.md"), text); console.log(`gen-map: wrote README.md (${text.split("\n").length} lines)`); }
  else process.stdout.write(text);
}
