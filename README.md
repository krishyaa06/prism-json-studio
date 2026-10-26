<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:00D2FF,100:6C63FF&height=200&section=header&text=Prism%20JSON%20Studio&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Format%20%C2%B7%20Validate%20%C2%B7%20Query%20%C2%B7%20Convert&descAlignY=58&descSize=16" width="100%" alt="Prism JSON Studio" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=00D2FF&center=true&vCenter=true&width=680&lines=Paste+messy+JSON.+Get+it+pretty.;Query+with+users%5B%2A%5D.name;JSON+to+TypeScript+in+one+click;Zero+dependencies.+Zero+tracking." alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-json-studio/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-json-studio/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-json-studio/"><img src="https://img.shields.io/badge/Live_Demo-Open-00D2FF?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-00D2FF?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-json-studio?style=for-the-badge&color=6C63FF" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism JSON Studio screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />

## ⚡ Overview

**Prism JSON Studio** is a fast, private JSON workbench. Paste or open a file and it is validated as you type, with the exact line and column of any error. Switch between pretty, tree, minified, TypeScript and CSV views, run path queries, and copy or download the result. Everything runs locally in your browser.

## ✨ Features

- **Live validation** with line and column of the first error
- **Pretty / Minify** with 2, 4 or tab indentation and optional key sorting
- **Collapsible tree view** with color-coded types
- **Path queries** like `config.features.ai` or `users[*].name`
- **JSON → TypeScript** interfaces, including nested objects and arrays
- **JSON → CSV** for arrays of objects
- **Stats**: size, key count, depth and nodes
- Open `.json` files, copy, download, and your input is saved locally

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism JSON Studio on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism JSON Studio on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-json-studio/](https://krishyaa06.github.io/prism-json-studio/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-json-studio.git
cd prism-json-studio
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

| Action | How |
| --- | --- |
| Validate | Paste JSON in the left panel; the status pill shows errors with line/column |
| Query | Type a path in the query box: `users[0].name`, `users[*].skills`, `$.config.theme` |
| Convert | Switch tabs: **Pretty**, **Tree**, **Minify**, **TypeScript**, **CSV** |
| Export | **Copy** or **Download** the current view |

## 📁 Project Structure

```
prism-json-studio/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css   # shared Prism design system
├── js/
│   ├── app.js   # UI wiring
│   ├── core.js   # pure logic (parse, query, TS/CSV) — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── README.md
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism JSON Studio is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,50:00D2FF,100:07060f&height=110&section=footer" width="100%" />
