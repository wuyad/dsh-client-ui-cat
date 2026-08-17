# dsh-client-ui-cat

A little tabby cat that wanders around the **DeepSeek Harness** web UI — walking along the top edges of text and components, hopping onto ledges, sniffing, sprinting, tumbling off cliffs, getting hurt and recovering, taking long naps, and letting you pet it.

![cat-preview](https://cdn.jsdelivr.net/npm/dsh-client-ui-cat/cat.svg)

## Features

- 🐾 Walks along the top edges of page elements (paragraphs, headings, cards, buttons, …)
- 🪜 Hops up onto ledges, runs, sniffs, grooms, and **naps most of the time** (12–24s, ~75% of rests)
- ✨ Occasionally **teleports** to a random spot on the page (with a vanish/appear puff) so it doesn't stay at the bottom
- 🏔️ Sometimes reaches the end of a ledge and falls off — gets dizzy, sees stars, grows a bump, then recovers on its own
- ❤️ Click to pet it: pink hearts, purring, and instant recovery after a fall
- 🎨 Right-click to cycle through **6 walking skins** (orange / white / tuxedo / black / gray / siamese)
- 💾 **Remembers the last skin** across page reloads and plugin restarts (`localStorage["dsh-cat-skin"]`)
- 🚶 Auto-discovers new edges on scroll and window resize
- ♿ Respects `prefers-reduced-motion`

## Installation

Published on **npm**: [`dsh-client-ui-cat`](https://www.npmjs.com/package/dsh-client-ui-cat). One command installs it into your DeepSeek Harness profile:

```bash
dsh plugin --profile web add dsh-client-ui-cat
```

Then add a loader entry to the profile's `cordis.patch.yml` (create the file if missing):

```yaml
- insert:
    - id: ui-cat
      name: 'dsh-client-ui-cat'
```

Restart the harness and refresh the page — the cat appears at the bottom of the page and starts exploring.

> **No build, no copy-paste.** The package declares `dsh.client`, so the client-modules half picks it up automatically at boot. If you don't use `dsh plugin`, `npm install dsh-client-ui-cat` inside the profile directory works too.

### Manual (from this repo)

Copy the `cat-plugin/` folder into your profile's `web/node_modules` as `dsh-client-ui-cat`, then register it in `cordis.patch.yml` as shown above.

## Usage

| Action | Effect |
| --- | --- |
| Left-click | Pet the cat (hearts + purring); also heals it after a fall |
| Drag | Pick the cat up, then release to drop it |
| Right-click | Cycle to the next skin (橘猫 / 白猫 / 奶牛猫 / 黑猫 / 灰猫 / 暹罗猫) |

## Development

The browser bundle (`lib/client.js`) is assembled from three sources by `surgery.cjs`:

```text
svg.css       →  cat animations & styles (inlined as CAT_CSS)
markup.txt    →  the root innerHTML template
skins.txt     →  generated skin data + renderSkin()
```

Workflow:

```bash
# 1. Edit skin SVGs in assets/cats/, then regenerate skins.txt
node gen-skins.cjs

# 2. Edit svg.css / markup.txt, then splice everything into lib/client.js
node surgery.cjs
```

> Note: `surgery.cjs` splices **into** `lib/client.js` in place — running it on a bundle that already contains the skins block will duplicate it. Keep the three source files and `client.js` in sync, or re-splice from a pristine copy.

## Publishing

The package is pure-source (no build step): `lib/client.js` is a ready-to-serve ES module with the CSS inlined, so any distribution channel works:

```bash
# publish to npm (files whitelist: lib/, cat.svg, READMEs)
npm publish

# or hand out a tarball
npm pack          # → dsh-client-ui-cat-0.1.0.tgz
dsh plugin --profile web add ./dsh-client-ui-cat-0.1.0.tgz

# or install straight from git (no build required for this package)
dsh plugin --profile web add github:you/dsh-client-ui-cat
```

`npm pack` runs `prepack` → `npm run check` (syntax-checks both lib files) before building the tarball.

### Project layout

```text
cat-plugin/
├── lib/
│   ├── index.js        # host half (no-op)
│   └── client.js       # browser half — the whole cat runtime
├── assets/cats/        # 6 walking-cat skins + silhouette
├── svg.css             # cat styles & keyframe animations
├── markup.txt          # innerHTML template fragment
├── skins.txt           # generated skin data (gen-skins.cjs output)
├── gen-skins.cjs       # skin generator
├── surgery.cjs         # bundle assembler
├── cordis.patch.yml    # profile loader patch sample
└── package.json
cat.svg                 # default walking-cat skin (cat-orange.svg, preview image)
cat-preview.html        # standalone preview page (loads lib/client.js)
```

## License

MIT
