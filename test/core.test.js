const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");

test("parse reports valid and invalid JSON", () => {
  assert.equal(C.parse('{"a":1}').ok, true);
  const bad = C.parse('{\n  "a": 1,\n}');
  assert.equal(bad.ok, false);
  assert.ok(bad.error.length > 0);
});
test("format with sorting and indentation", () => {
  assert.equal(C.format({ b: 1, a: 2 }, 2, true), '{\n  "a": 2,\n  "b": 1\n}');
  assert.equal(C.format([1], "tab"), "[\n\t1\n]");
});
test("stats counts keys and depth", () => {
  const s = C.stats({ a: { b: [1, 2] } });
  assert.equal(s.keys, 2); assert.equal(s.depth, 3); assert.equal(s.types.number, 2);
});
test("query supports paths and wildcards", () => {
  const d = { users: [{ name: "a" }, { name: "b" }] };
  assert.equal(C.query(d, "users[1].name"), "b");
  assert.deepEqual(C.query(d, "$.users[*].name"), ["a", "b"]);
  assert.equal(C.query(d, "nope"), undefined);
});
test("TypeScript interfaces are generated", () => {
  const ts = C.toTypeScript({ id: 1, tags: ["x"], owner: { name: "s" } });
  assert.match(ts, /export interface Owner \{\n  name: string;\n\}/);
  assert.match(ts, /tags: string\[\];/);
  assert.match(ts, /owner: Owner;/);
});
test("CSV export quotes values", () => {
  assert.equal(C.toCSV([{ a: 1, b: "x,y" }, { a: 2 }]), 'a,b\n1,"x,y"\n2,');
  assert.throws(() => C.toCSV([1, 2]));
});
