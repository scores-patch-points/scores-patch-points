import test from "node:test";
import assert from "node:assert/strict";
import { generate, load, renderTable, statusTable } from "./gen-map.mjs";
import { checkNexus, checkFiles } from "./check-nexus.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = () => { const l = load(); return { ...l, readme: generate(l) }; };
const clone = (x) => JSON.parse(JSON.stringify(x));

test("the real map matches its manifest, cards, template and survey, and README.md is what the generator writes", () => {
  assert.deepEqual(checkFiles(), []);
  assert.equal(fs.readFileSync(path.join(ROOT, "README.md"), "utf8"), generate(load()));
});
test("README drift is caught: a hand edit to the generated map fails", () => {
  const b = base(); b.readme += "\nhand edit\n";
  assert.ok(checkNexus(b).some((p) => /README.md differs/.test(p)));
});
test("a repo on the org but not on the map is caught (the live check)", () => {
  const b = base();
  assert.ok(checkNexus({ ...b, liveNames: [...b.manifest.repos.map((r) => r.name), "brand-new-repo"] }).some((p) => /brand-new-repo exists in the org but is not on the map/.test(p)));
});
test("a repo with no card, or a card with no stated boundary, is caught (Ostrom 1)", () => {
  const b = base(); delete b.cards.pharos;
  assert.ok(checkNexus(b).some((p) => /repo pharos: no card/.test(p)));
  const c = base(); c.cards.scholia = "### scholia\n- **Does:** things\n";
  assert.ok(checkNexus(c).some((p) => /scholia: its card states no boundary/.test(p)));
});
test("a gate or door left null must say why; an unknown sibling and a repo missing from the tree are caught", () => {
  const b = base(); b.manifest = clone(b.manifest); b.manifest.repos.find((r) => r.name === "janus").gate = { cmd: null };
  assert.ok(checkNexus(b).some((p) => /janus: gate is null with no reason/.test(p)));
  const c = base(); c.manifest = clone(c.manifest); c.manifest.repos.find((r) => r.name === "khora").siblings = ["nowhere"];
  assert.ok(checkNexus(c).some((p) => /sibling nowhere is not a repo on the map/.test(p)));
  const d = base(); d.readme = d.readme.replace(/mnemosyne\s+the system's mind: one hash-chained log\s+\(⚑ placement proposed\)/, "");
  assert.ok(checkNexus(d).some((p) => /mnemosyne: missing from the holarchy tree/.test(p)));
});
test("a card or a table the template names but the data lacks fails to generate, never prints a hole", () => {
  const l = load();
  assert.throws(() => generate({ ...l, template: l.template + "\n{{card:ghost}}" }), /ghost/);
  assert.throws(() => generate({ ...l, template: l.template + "\n{{table:ghost}}" }), /ghost/);
});
test("the status table shows the truth: a repo with no survey row is '?', a null gate is a typed gap", () => {
  const l = load();
  const t = statusTable(l.manifest, { repos: {} });
  assert.match(t, /\| `janus` \| \? \| \? \| \? \| typed gap/);
  assert.equal(renderTable({ header: ["a", "b"], sep: "|---|---|", rows: [["1", "2"]] }), "| a | b |\n|---|---|\n| 1 | 2 |");
});
