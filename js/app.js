(() => {
  const { $, toast, copy, download, store, esc, debounce, tabs } = Prism;
  const input = $("#input"), out = $("#out"), status = $("#status");
  let view = "pretty", last = null;
  const SAMPLE = { project: "Prism Protocol", version: "1.0.0", active: true, stars: 128, maintainer: null,
    tags: ["community", "open-source", "devtools"],
    users: [{ id: 1, name: "Soumya", role: "founder", skills: ["js", "design"] }, { id: 2, name: "Aarav", role: "builder", skills: ["python"] }, { id: 3, name: "Isha", role: "mentor", skills: ["rust", "go"] }],
    config: { theme: "dark", accent: "#00d2ff", features: { ai: true, events: true } } };

  function hl(json) {
    return esc(json).replace(/(&quot;(?:\\.|[^&]|&(?!quot;))*?&quot;)(\s*:)?|\b(true|false)\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, (m, str, colon, bool) =>
      str ? `<span class="${colon ? "k" : "s"}">${str}</span>${colon || ""}` : bool ? `<span class="b">${m}</span>` : m === "null" ? `<span class="z">null</span>` : `<span class="n">${m}</span>`);
  }
  function tree(v, key) {
    const label = key != null ? `<span class="k">${esc(key)}</span>: ` : "";
    if (v && typeof v === "object") {
      const arr = Array.isArray(v), entries = arr ? v.map((x, i) => [i, x]) : Object.entries(v);
      return `<details open><summary>${label}<span class="c">${arr ? `Array(${v.length})` : `{${entries.length}}`}</span></summary><ul>${entries.map(([k, x]) => `<li>${tree(x, k)}</li>`).join("")}</ul></details>`;
    }
    const cls = v === null ? "z" : typeof v === "string" ? "s" : typeof v === "number" ? "n" : "b";
    return `${label}<span class="${cls}">${esc(JSON.stringify(v))}</span>`;
  }
  function render() {
    const text = input.value.trim();
    store.set("json-studio:input", input.value);
    if (!text) { status.className = "pill"; status.textContent = "Waiting for JSON"; out.textContent = ""; $("#stats").innerHTML = ""; last = null; return; }
    const r = Core.parse(text);
    if (!r.ok) {
      status.className = "pill bad";
      status.textContent = r.at ? `Invalid · line ${r.at.line}, col ${r.at.col}` : "Invalid JSON";
      out.innerHTML = `<span class="z">${esc(r.error)}</span>`; last = null; return;
    }
    status.className = "pill ok"; status.textContent = "Valid JSON";
    let v = r.value;
    const q = $("#q").value.trim();
    if (q) { v = Core.query(v, q); if (v === undefined) { out.innerHTML = '<span class="c">No match for this path</span>'; last = ""; return; } }
    const sort = $("#sort").checked, indent = $("#indent").value;
    out.classList.toggle("tree", view === "tree");
    try {
      if (view === "pretty") { last = Core.format(v, indent, sort); out.innerHTML = hl(last); }
      else if (view === "min") { last = JSON.stringify(sort ? Core.sortKeys(v) : v); out.innerHTML = hl(last); }
      else if (view === "ts") { last = Core.toTypeScript(v); out.textContent = last; }
      else if (view === "csv") { last = Core.toCSV(v); out.textContent = last; }
      else { last = Core.format(v, indent, sort); out.innerHTML = `<div>${tree(v)}</div>`; }
    } catch (e) { last = null; out.innerHTML = `<span class="z">${esc(e.message)}</span>`; }
    const s = Core.stats(r.value);
    $("#stats").innerHTML = [["Size", s.bytes < 1024 ? s.bytes + " B" : (s.bytes / 1024).toFixed(1) + " KB"], ["Keys", s.keys], ["Depth", s.depth], ["Nodes", s.nodes]]
      .map(([k, n]) => `<div class="stat"><small>${k}</small><b>${n}</b></div>`).join("");
  }
  const run = debounce(render, 120);
  tabs($("#tabs"), (v) => { view = v; render(); });
  input.addEventListener("input", run);
  $("#q").addEventListener("input", run);
  $("#indent").addEventListener("change", render);
  $("#sort").addEventListener("change", render);
  $("#sample").onclick = () => { input.value = JSON.stringify(SAMPLE); render(); };
  $("#clear").onclick = () => { input.value = ""; render(); input.focus(); };
  $("#file").onchange = async (e) => { const f = e.target.files[0]; if (f) { input.value = await f.text(); render(); toast(`Loaded ${f.name}`); } };
  $("#copy").onclick = () => (last ? copy(last) : toast("Nothing to copy yet"));
  $("#dl").onclick = () => { if (!last) return toast("Nothing to download yet"); const ext = { ts: "ts", csv: "csv" }[view] || "json"; download(`prism-output.${ext}`, last); };
  input.value = store.get("json-studio:input", "") || JSON.stringify(SAMPLE);
  render();
})();
