<script>
  import { onMount } from 'svelte';
  import { sfx } from './sfx.js';

  let { onDone } = $props();

  const WARP_MS = 5000; // how long the timewarp lasts

  let canvas;
  let loveNotes = $state([]);

  const PHRASES = [
    'I love you',
    'i love you',
    'I LOVE YOU',
    'te amo 💗',
    'I love you, Mariah',
    'always & forever',
    'I love you ∞',
  ];

  onMount(() => {
    const stopWarpSound = sfx.warp(WARP_MS / 1000);
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const cx = () => w / 2;
    const cy = () => h / 2;

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const STAR_COLORS = ['#ffffff', '#ffc9b5', '#f7b1ab', '#c7d3bf'];
    const stars = Array.from({ length: 320 }, () => newStar());

    function newStar() {
      return {
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * Math.max(w, h) * 0.5,
        speed: 2 + Math.random() * 6,
        color: STAR_COLORS[(Math.random() * STAR_COLORS.length) | 0],
      };
    }

    const start = performance.now();
    let raf;

    function frame(now) {
      const t = (now - start) / WARP_MS; // 0 → 1 over the warp
      // speed ramps up, then eases off right at the end
      const boost = t < 0.8 ? 1 + t * 14 : 1 + (1 - t) * 56;

      ctx.fillStyle = 'rgba(10, 12, 13, 0.32)';
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        const prev = s.dist;
        s.dist += s.speed * boost;
        const x1 = cx() + Math.cos(s.angle) * prev;
        const y1 = cy() + Math.sin(s.angle) * prev;
        const x2 = cx() + Math.cos(s.angle) * s.dist;
        const y2 = cy() + Math.sin(s.angle) * s.dist;

        ctx.strokeStyle = s.color;
        ctx.lineWidth = Math.min(2.5, 0.4 + s.dist / (w * 0.35));
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        if (s.dist > Math.max(w, h) * 0.75) {
          Object.assign(s, newStar(), { dist: Math.random() * 30 });
        }
      }

      if (now - start < WARP_MS) {
        raf = requestAnimationFrame(frame);
      }
    }
    raf = requestAnimationFrame(frame);

    // sprinkle "I love you"s throughout the warp
    let noteId = 0;
    const noteTimer = setInterval(() => {
      const note = {
        id: noteId++,
        text: PHRASES[(Math.random() * PHRASES.length) | 0],
        x: 8 + Math.random() * 76,
        y: 8 + Math.random() * 80,
        size: 0.9 + Math.random() * 1.8,
      };
      loveNotes = [...loveNotes, note];
      setTimeout(() => {
        loveNotes = loveNotes.filter((n) => n.id !== note.id);
      }, 1600);
    }, 260);

    const doneTimer = setTimeout(onDone, WARP_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(noteTimer);
      clearTimeout(doneTimer);
      stopWarpSound();
      window.removeEventListener('resize', onResize);
    };
  });
</script>

<div class="warp">
  <canvas bind:this={canvas}></canvas>
  {#each loveNotes as note (note.id)}
    <span
      class="note"
      style="left:{note.x}%; top:{note.y}%; font-size:{note.size}rem;"
    >
      {note.text}
    </span>
  {/each}
  <div class="flash"></div>
</div>

<style>
  .warp {
    position: relative;
    height: 100%;
    background: var(--space-black);
    overflow: hidden;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .note {
    position: absolute;
    font-family: var(--font-script);
    color: var(--powder-blush);
    text-shadow: 0 0 16px rgba(247, 177, 171, 0.8);
    white-space: nowrap;
    pointer-events: none;
    animation: zoom-note 1.6s ease-out forwards;
  }

  @keyframes zoom-note {
    0% { opacity: 0; transform: scale(0.4); }
    25% { opacity: 1; }
    100% { opacity: 0; transform: scale(2.6); }
  }

  /* soft peach flash right at the end of the warp */
  .flash {
    position: absolute;
    inset: 0;
    background: var(--peach-fuzz);
    opacity: 0;
    pointer-events: none;
    animation: flash 5s linear forwards;
  }

  @keyframes flash {
    0%, 88% { opacity: 0; }
    97% { opacity: 0.85; }
    100% { opacity: 0; }
  }
</style>
