import test from "node:test";
import assert from "node:assert/strict";
import { ciFor, generateCi, readCi, ciTargets, KIT_URL } from "./gen-ci.mjs";
import { checkNexus } from "./check-nexus.mjs";
import { load, generate } from "./gen-map.mjs";
import { generateKits, readKits } from "./gen-kits.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clone = (x) => JSON.parse(JSON.stringify(x));
const full = () => { const l = load(); return { ...l, readme: fs.readFileSync(path.join(ROOT, "README.md"), "utf8"), kits: readKits(), ci: readCi() }; };

test("the committed workflows are exactly what the manifest generates, and the whole nexus check passes with them", () => {
  assert.deepEqual(readCi(), generateCi());
  assert.deepEqual(checkNexus(full()), []);
});
test("every workflow is named nexus, checks out, and has the kit-freshness step exactly where the nexus manages CLAUDE.md", () => {
  const l = load();
  for (const r of ciTargets(l.manifest)) {
    const t = ciFor(r);
    assert.match(t, /^name: nexus$/m); assert.match(t, /actions\/checkout@v4/); assert.match(t, /Do not edit by hand/);
    assert.equal(t.includes("CLAUDE.md is the generated kit"), r.kit === "managed", `${r.name}: kit step iff managed`);
    if (r.kit === "managed") assert.ok(t.includes(KIT_URL(r.name)), `${r.name}: fetches its own kit`);
  }
  const pen = ciFor(l.manifest.repos.find((r) => r.name === "penelope"));
  assert.ok(!pen.includes("generated kit"), "penelope keeps its own CLAUDE.md");
  assert.ok(pen.includes("nexus block in CLAUDE.md is the generated block"), "penelope checks only its block");
});
test("the gate runs only where it was verified in a clean checkout; elsewhere it is a typed gap with its reason, never a vacuous pass", () => {
  const l = load(), by = (n) => ciFor(l.manifest.repos.find((r) => r.name === n));
  assert.match(by("pharos"), /run: \|\n\s+npm test/); assert.doesNotMatch(by("pharos"), /typed gap/);
  assert.match(by("janus"), /gate is a typed gap: package.json has no scripts/); assert.doesNotMatch(by("janus"), /run: \|\n\s+npm test/);
  assert.match(by("scholia"), /skips itself without a khora checkout/);
});
test("drift is caught: a hand-edited workflow, a missing one, and a gate flagged true with no command", () => {
  const f = full();
  const edited = { ...f, ci: { ...f.ci, pharos: f.ci.pharos + "# hand edit\n" } };
  assert.ok(checkNexus(edited).some((p) => /ci pharos: .*out of date/.test(p)));
  const missing = { ...f, remoteCi: { ...generateCi(), janus: null } };
  assert.ok(checkNexus(missing).some((p) => /janus: its .github\/workflows\/nexus.yml is not installed/.test(p)));
  const handEdit = { ...f, remoteCi: { ...generateCi(), eodb: generateCi().eodb + "x" } };
  assert.ok(checkNexus(handEdit).some((p) => /eodb: its .github\/workflows\/nexus.yml differs/.test(p)));
  const m = clone(f.manifest); m.repos.find((r) => r.name === "janus").ci.gate = true;
  assert.ok(checkNexus({ ...f, manifest: m }).some((p) => /janus: ci.gate is true but the manifest names no gate command/.test(p)));
});

test("every managed repo's workflow runs the canonical text-regex ratchet (nexus rule 8); a repo with no baseline is told it checked nothing", async () => {
  const l = load();
  for (const r of l.manifest.repos.filter((x) => x.ci?.workflow === "managed")) { const y = ciFor(r); assert.match(y, /nexus\/guards\/text-regex-ratchet\.mjs/); assert.match(y, /node \.nexus-text-regex-ratchet\.mjs/); assert.match(y, /checked NOTHING here/); }
  const { addedHits } = await import("./guards/text-regex-ratchet.mjs");
  assert.equal(addedHits("organs/a.mjs", "const m = q.match(/where.*live/i);").length, 1, "the canonical detector flags a language regex");
  assert.equal(addedHits("organs/a.mjs", "const m = q.match(/\\d+/); // regex-ok: a page number").length, 0);
});

test("a generated workflow is valid YAML where it matters: no step name holds a colon-space (it turns a plain scalar into a mapping and GitHub refuses the whole file)", () => {
  const l = load();
  for (const r of l.manifest.repos.filter((x) => x.ci?.workflow === "managed")) for (const m of ciFor(r).matchAll(/^ +- name: (.*)$/gm)) assert.ok(!m[1].includes(": ") && !m[1].includes(" #"), `${r.name}: step name ${JSON.stringify(m[1])}`);
});
