/* Prism JSON Studio · core logic (browser + Node) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  function locate(text, msg) {
    const m = /position (\d+)/.exec(msg) || [];
    let pos = m[1] != null ? +m[1] : -1;
    const lc = /line (\d+) column (\d+)/.exec(msg);
    if (lc) return { line: +lc[1], col: +lc[2] };
    if (pos < 0) return null;
    const before = text.slice(0, pos).split("\n");
    return { line: before.length, col: before[before.length - 1].length + 1 };
  }
  function parse(text) {
    try { return { ok: true, value: JSON.parse(text) }; }
    catch (e) { return { ok: false, error: e.message.replace(/^JSON\.parse: /, ""), at: locate(text, e.message) }; }
  }
  function sortKeys(v) {
    if (Array.isArray(v)) return v.map(sortKeys);
    if (v && typeof v === "object") return Object.keys(v).sort().reduce((o, k) => ((o[k] = sortKeys(v[k])), o), {});
    return v;
  }
  function format(value, indent = 2, sort = false) {
    return JSON.stringify(sort ? sortKeys(value) : value, null, indent === "tab" ? "\t" : +indent);
  }
  function stats(value) {
    let keys = 0, depth = 0, nodes = 0;
    const types = { object: 0, array: 0, string: 0, number: 0, boolean: 0, null: 0 };
    (function walk(v, d) {
      nodes++; depth = Math.max(depth, d);
      const t = v === null ? "null" : Array.isArray(v) ? "array" : typeof v;
      types[t]++;
      if (t === "array") v.forEach((x) => walk(x, d + 1));
      else if (t === "object") for (const k in v) { keys++; walk(v[k], d + 1); }
    })(value, 0);
    return { keys, depth, nodes, types, bytes: new TextEncoder().encode(JSON.stringify(value)).length };
  }
  function query(value, path) {
    path = String(path || "").trim().replace(/^\$\.?/, "");
    if (!path) return value;
    const tokens = [];
    path.replace(/\[(\d+|\*)\]|\[["']([^"']+)["']\]|([^.[\]]+)/g, (_, i, q, k) => tokens.push(i ?? q ?? k));
    let cur = [value];
    for (const t of tokens) {
      const next = [];
      for (const c of cur) {
        if (c == null || typeof c !== "object") continue;
        if (t === "*") next.push(...(Array.isArray(c) ? c : Object.values(c)));
        else if (Array.isArray(c) && /^\d+$/.test(t)) { if (t < c.length) next.push(c[+t]); }
        else if (Array.isArray(c)) c.forEach((x) => x && typeof x === "object" && t in x && next.push(x[t]));
        else if (t in c) next.push(c[t]);
      }
      cur = next;
    }
    return path.includes("*") || cur.length > 1 ? cur : cur[0];
  }
  const pascal = (s) => (String(s).replace(/[^a-zA-Z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : "")).replace(/^./, (c) => c.toUpperCase()) || "Item").replace(/^(\d)/, "T$1");
  function toTypeScript(value, rootName = "Root") {
    const out = [];
    const seen = new Map();
    function typeOf(v, name) {
      if (v === null) return "null";
      if (Array.isArray(v)) {
        if (!v.length) return "unknown[]";
        const ts = [...new Set(v.map((x) => typeOf(x, name.replace(/s$/, "") || name)))];
        return ts.length === 1 ? (/[|]/.test(ts[0]) ? `(${ts[0]})[]` : `${ts[0]}[]`) : `(${ts.join(" | ")})[]`;
      }
      if (typeof v === "object") return iface(v, pascal(name));
      return typeof v;
    }
    function iface(obj, name) {
      const body = Object.keys(obj).map((k) => `  ${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${typeOf(obj[k], k)};`).join("\n");
      const sig = body;
      if (seen.has(sig)) return seen.get(sig);
      let n = name, i = 2;
      while ([...seen.values()].includes(n)) n = name + i++;
      seen.set(sig, n);
      out.push(`export interface ${n} {\n${body}\n}`);
      return n;
    }
    const t = typeOf(value, rootName);
    if (!(value && typeof value === "object" && !Array.isArray(value))) out.push(`export type ${rootName} = ${t};`);
    return out.join("\n\n");
  }
  function toCSV(value) {
    const rows = Array.isArray(value) ? value : [value];
    if (!rows.every((r) => r && typeof r === "object" && !Array.isArray(r))) throw new Error("CSV needs an array of objects");
    const cols = [...new Set(rows.flatMap(Object.keys))];
    const cell = (v) => { const s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
    return [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\n");
  }
  return { parse, format, sortKeys, stats, query, toTypeScript, toCSV };
});
