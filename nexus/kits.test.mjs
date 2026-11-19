import test from "node:test";
import assert from "node:assert/strict";
import { generateKits, readKits, kitFor, needsKit, rules, MAP_URL, BRIEF_URL } from "./gen-kits.mjs";
import { load } from "./gen-map.mjs";
import { checkNexus } from "./check-nexus.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clone = (x) => JSON.parse(JSON.stringify(x));

test("the committed kits are exactly what the manifest, cards, rules and survey generate", () => {
  assert.deepEqual(readKits(), generateKits());
});
test("every kit says what the repo is and is not, its doors, gate and siblings, the nexus rules, the map and the brief", () => {
  const kits = generateKits();
  assert.ok(Object.keys(kits).length >= 15, "the 15 repos that had no CLAUDE.md on 2026-11-18");
  for (const [n, t] of Object.entries(kits)) {
    assert.match(t, new RegExp(`^# ${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}: `), `${n}: title`);
    assert.match(t, /no wrong door/); assert.ok(t.includes(MAP_URL)); assert.ok(t.includes(BRIEF_URL));
    assert.match(t, /\*\*Does:\*\*/); assert.match(t, /\*\*Doesn't include:\*\*/);
    assert.match(t, /## Doors, gate, siblings/);
    for (const r of rules()) assert.ok(t.includes(r.rule), `${n}: rule missing: ${r.rule.slice(0, 30)}`);
    assert.ok(t.split("\n").length <= 60, `${n}: a kit nobody reads is no kit`);
  }
});
test("a gap is stated as a gap, never invented: janus has no declared gate or door", () => {
  const t = generateKits().janus;
  assert.match(t, /TYPED GAP: no door is declared/); assert.match(t, /Gate \(run it before you finish\): TYPED GAP \(package.json has no scripts\)/);
});
test("a repo that already has a CLAUDE.md, a private repo and an archive get no kit", () => {
  const l = load(), kits = generateKits();
  assert.ok(!("khora" in kits) && !("penelope" in kits), "they have their own CLAUDE.md");
  assert.ok(!("khora-archive" in kits) && !("eo-teachings" in kits));
  assert.equal(needsKit({ name: "x", private: true, level: "L1" }, { repos: { x: { claudeMd: false } } }), false);
});
test("a change to a card or to a rule changes the kit (nothing is typed twice), and drift in nexus/kits/ is caught by the map's check", () => {
  const l = load(), a = generateKits(l);
  const c = { ...l, cards: { ...l.cards, pharos: l.cards.pharos + "\n- **Finds at:** a new place\n" } };
  assert.notEqual(generateKits(c).pharos, a.pharos);
  assert.notEqual(generateKits(l, [{ rule: "a different rule", source: "x" }]).pharos, a.pharos);
  const drifted = { ...a, pharos: a.pharos + "\nhand edit\n" };
  const problems = checkNexus({ ...l, readme: fs.readFileSync(path.join(ROOT, "README.md"), "utf8"), kits: drifted });
  assert.ok(problems.some((p) => /kit pharos: .*out of date/.test(p)));
});

test("a repo whose CLAUDE.md the nexus manages keeps its kit after the survey sees the file; the live check catches a missing or hand-edited installed kit", () => {
  const l = load(), a = generateKits(l);
  const afterInstall = { ...l.survey, repos: { ...l.survey.repos, pharos: { ...l.survey.repos.pharos, claudeMd: true } } };
  assert.ok("pharos" in generateKits({ ...l, survey: afterInstall }), "managed: still generated once CLAUDE.md exists");
  const unmanaged = clone(l.manifest); delete unmanaged.repos.find((r) => r.name === "pharos").kit;
  assert.ok(!("pharos" in generateKits({ ...l, manifest: unmanaged, survey: afterInstall })), "unmanaged and present: no kit");
  const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
  const ok = checkNexus({ ...l, readme, remoteKits: { ...a } });
  assert.deepEqual(ok, []);
  assert.ok(checkNexus({ ...l, readme, remoteKits: { ...a, pharos: null } }).some((p) => /pharos: its managed CLAUDE.md is not installed/.test(p)));
  assert.ok(checkNexus({ ...l, readme, remoteKits: { ...a, pharos: a.pharos + "x" } }).some((p) => /pharos: its CLAUDE.md differs from the generated kit/.test(p)));
});
