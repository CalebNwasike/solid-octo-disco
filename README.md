# Our Universe 💗

A National Girlfriend's Day website for Mariah — a pink universe where the
planets are roses, and every rose holds a memory of us.

## Run it

```bash
npm install
npm run dev
```

Then open the link it prints (usually http://localhost:5173).

To build the final site for hosting:

```bash
npm run build
```

The finished site ends up in the `dist/` folder — upload that anywhere
(Netlify, Vercel, GitHub Pages, etc).

## The journey

1. **Breather page** — she reads the message, then enters the password:
   the day you two became official (**2/15/2024** — any format works:
   `2/15/2024`, `02-15-2024`, `21524`...).
2. **Timewarp** — a Star Wars–style speed warp with "I love you"s flying past.
3. **Our Universe** — rose-planets floating in pink space. Hover to see a
   rose's name, click to open the picture + quote.
4. **The far-off planet** ("For Mariah 💖", bottom-right) — clicking it zooms
   deep into space and reveals the special message.
5. **Gifts** — the 🎁 button (bottom-right) opens the gifts drawer.

## ✏️ Where to edit things

| What | File |
| --- | --- |
| **Pictures & quotes** (the rose-planets) | `src/lib/data/memories.js` |
| **Gift links & card codes** | `src/lib/data/gifts.js` |
| The special far-planet message | `src/lib/data/memories.js` (bottom, `specialPlanet`) |
| Intro page text & password | `src/lib/IntroPage.svelte` |
| Colors | `src/app.css` (the `:root` variables) |

### Adding her pictures

1. Drop image files into `public/photos/` (e.g. `public/photos/memory-1.jpg`).
2. Make sure each `photo` value in `src/lib/data/memories.js` matches the
   file name (starting with `/photos/`).

Until a real image exists, the picture box shows a cute "your photo goes
here" placeholder, so nothing ever looks broken.

### Adding gifts

Open `src/lib/data/gifts.js` — instructions are at the top of the file.
Each gift can have a link (`url`), a copyable code (`code`), or both.

## Still to come

- Sound effects 🔊 (planned for later)
