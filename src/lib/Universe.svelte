<script>
  import { fade } from 'svelte/transition';
  import RosePlanet from './RosePlanet.svelte';
  import MemoryModal from './MemoryModal.svelte';
  import SpecialMessage from './SpecialMessage.svelte';
  import GiftsSection from './GiftsSection.svelte';
  import WordleRose from './WordleRose.svelte';
  import GoddessPlanet from './GoddessPlanet.svelte';
  import GoddessOverlay from './GoddessOverlay.svelte';
  import TotoroSlideshow from './TotoroSlideshow.svelte';
  import {
    memories,
    specialPlanet,
    specialPlanet2,
    wordleRose,
    goddessPlanet,
    totoroPlanet,
  } from './data/memories.js';

  const specials = [specialPlanet, specialPlanet2];

  let openMemory = $state(null);
  let showGifts = $state(false);
  let zooming = $state(false); // zooming toward a far-off planet
  let zoomTarget = $state(null); // which planet the zoom aims at
  let activeSpecial = $state(null); // which special planet is open
  let showSpecial = $state(false);
  let showWordle = $state(false);
  let showGoddess = $state(false);
  let showTotoro = $state(false);
  // tiny floating star particles, scattered once on load
  const particles = Array.from({ length: 26 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    dur: 14 + Math.random() * 18,
    delay: Math.random() * 16,
    twinkle: 2 + Math.random() * 3,
  }));

  function zoomInto(planet, open) {
    zoomTarget = planet;
    zooming = true;
    setTimeout(open, 900);
  }

  function openSpecial(planet) {
    activeSpecial = planet;
    zoomInto(planet, () => (showSpecial = true));
  }

  function closeSpecial() {
    showSpecial = false;
    zooming = false;
    activeSpecial = null;
    zoomTarget = null;
  }

  function openGoddess() {
    zoomInto(goddessPlanet, () => (showGoddess = true));
  }

  function closeGoddess() {
    showGoddess = false;
    zooming = false;
    zoomTarget = null;
  }
</script>

<div class="universe" in:fade={{ duration: 700 }}>
  <div class="nebula"></div>
  <div class="stars layer-1"></div>
  <div class="stars layer-2"></div>

  <div class="particles" aria-hidden="true">
    {#each particles as p}
      <span
        class="particle"
        style="left:{p.x}%; top:{p.y}%; width:{p.size}px; height:{p.size}px; --dur:{p.dur}s; --delay:{p.delay}s; --twinkle:{p.twinkle}s;"
      ></span>
    {/each}
  </div>

  <div
    class="scene"
    class:zooming
    style="transform-origin: {(zoomTarget ?? specialPlanet).x}% {(zoomTarget ?? specialPlanet).y}%;"
  >
    <header class="header">
      <p class="gfday">Happy National Girlfriend's Day 💗</p>
      <h1>Our Universe</h1>
      <p>hover a rose... then click it 💗</p>
    </header>

    {#each memories as memory, i}
      <button
        class="planet"
        style="left:{memory.x}%; top:{memory.y}%; --delay:{i * 1.3}s; --drift:{6 + i}s;"
        onclick={() => (openMemory = memory)}
        aria-label={memory.name}
      >
        <RosePlanet size={memory.size} />
        <span class="planet-name">{memory.name}</span>
      </button>
    {/each}

    <!-- the far-off planets, just for her -->
    {#each specials as planet, i}
      <button
        class="planet special"
        style="left:{planet.x}%; top:{planet.y}%; --delay:{2.2 + i * 1.4}s; --drift:{9 + i}s;"
        onclick={() => openSpecial(planet)}
        aria-label={planet.name}
      >
        <RosePlanet size={planet.size} />
        <span class="planet-name">{planet.name}</span>
        <span class="sparkle" aria-hidden="true">✨</span>
      </button>
    {/each}

    <!-- the wordle rose 🙈 -->
    <button
      class="planet"
      style="left:{wordleRose.x}%; top:{wordleRose.y}%; --delay:3.1s; --drift:8s;"
      onclick={() => (showWordle = true)}
      aria-label={wordleRose.name}
    >
      <RosePlanet size={wordleRose.size} />
      <span class="planet-name">{wordleRose.name}</span>
      <span class="sparkle" aria-hidden="true">🤫</span>
    </button>

    <!-- the goddess planet 🏛️ -->
    <button
      class="planet"
      style="left:{goddessPlanet.x}%; top:{goddessPlanet.y}%; --delay:1.7s; --drift:11s;"
      onclick={openGoddess}
      aria-label={goddessPlanet.name}
    >
      <GoddessPlanet size={goddessPlanet.size} />
      <span class="planet-name">{goddessPlanet.name}</span>
      <span class="sparkle" aria-hidden="true">✨</span>
    </button>

    <!-- the totoro planet 🌱 -->
    <button
      class="planet"
      style="left:{totoroPlanet.x}%; top:{totoroPlanet.y}%; --delay:0.6s; --drift:10s;"
      onclick={() => (showTotoro = true)}
      aria-label={totoroPlanet.name}
    >
      <RosePlanet size={totoroPlanet.size} colors={totoroPlanet.colors} />
      <span class="planet-name">{totoroPlanet.name}</span>
      <span class="sparkle" aria-hidden="true">🌱</span>
    </button>
  </div>

  <button class="gifts-btn" onclick={() => (showGifts = true)}>
    🎁 gifts for you
  </button>

  {#if openMemory}
    <MemoryModal memory={openMemory} onClose={() => (openMemory = null)} />
  {/if}

  {#if showSpecial && activeSpecial}
    <SpecialMessage
      message={activeSpecial.message}
      photo={activeSpecial.photo ?? null}
      lock={activeSpecial.lock ?? null}
      onClose={closeSpecial}
    />
  {/if}

  {#if showWordle}
    <WordleRose data={wordleRose} onClose={() => (showWordle = false)} />
  {/if}

  {#if showGoddess}
    <GoddessOverlay data={goddessPlanet} onClose={closeGoddess} />
  {/if}

  {#if showTotoro}
    <TotoroSlideshow data={totoroPlanet} onClose={() => (showTotoro = false)} />
  {/if}

  {#if showGifts}
    <GiftsSection onClose={() => (showGifts = false)} />
  {/if}
</div>

<style>
  .universe {
    position: relative;
    height: 100%;
    overflow: hidden;
    background:
      radial-gradient(ellipse 90% 70% at 80% 10%, rgba(247, 177, 171, 0.34), transparent 58%),
      radial-gradient(ellipse 70% 60% at 10% 90%, rgba(255, 201, 181, 0.24), transparent 58%),
      radial-gradient(ellipse 50% 40% at 40% 45%, rgba(128, 113, 130, 0.3), transparent 65%),
      var(--space-black);
  }

  .nebula {
    position: absolute;
    inset: -20%;
    background:
      radial-gradient(ellipse 30% 22% at 62% 68%, rgba(247, 177, 171, 0.24), transparent 70%),
      radial-gradient(ellipse 26% 20% at 25% 25%, rgba(216, 170, 150, 0.2), transparent 70%);
    animation: drift-nebula 40s ease-in-out infinite alternate;
    pointer-events: none;
  }

  @keyframes drift-nebula {
    from { transform: translate(0, 0) rotate(0deg); }
    to { transform: translate(3%, -3%) rotate(4deg); }
  }

  .stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      radial-gradient(1.5px 1.5px at 15% 25%, #fff 50%, transparent 51%),
      radial-gradient(1px 1px at 35% 65%, #fff 50%, transparent 51%),
      radial-gradient(2px 2px at 55% 12%, var(--peach-fuzz) 50%, transparent 51%),
      radial-gradient(1px 1px at 75% 45%, #fff 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 8% 55%, var(--powder-blush) 50%, transparent 51%),
      radial-gradient(1px 1px at 92% 85%, #fff 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 48% 92%, #fff 50%, transparent 51%),
      radial-gradient(1px 1px at 28% 8%, var(--ash-grey) 50%, transparent 51%),
      radial-gradient(1px 1px at 65% 78%, #fff 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 85% 22%, var(--peach-fuzz) 50%, transparent 51%);
  }

  .layer-1 {
    animation: twinkle 3.5s ease-in-out infinite alternate;
  }

  .layer-2 {
    transform: translate(4%, 7%) scale(1.15);
    animation: twinkle 5s ease-in-out infinite alternate-reverse;
  }

  @keyframes twinkle {
    from { opacity: 0.35; }
    to { opacity: 0.9; }
  }

  /* tiny white star particles that twinkle and drift upward */
  .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.9);
    animation:
      particle-drift var(--dur) linear var(--delay) infinite,
      particle-twinkle var(--twinkle) ease-in-out infinite alternate;
  }

  @keyframes particle-drift {
    from { transform: translateY(0); }
    to { transform: translateY(-110vh); }
  }

  @keyframes particle-twinkle {
    from { opacity: 0.15; }
    to { opacity: 0.9; }
  }

  .scene {
    position: absolute;
    inset: 0;
    transition: transform 1s cubic-bezier(0.55, 0, 0.35, 1), opacity 1s ease;
  }

  .scene.zooming {
    transform: scale(6);
    opacity: 0;
    pointer-events: none;
  }

  .header {
    position: absolute;
    top: 2rem;
    left: 0;
    right: 0;
    text-align: center;
    pointer-events: none;
  }

  .gfday {
    font-family: var(--font-script);
    font-size: clamp(1.5rem, 3.5vw, 2.1rem);
    color: var(--peach-fuzz);
    text-shadow: 0 0 20px rgba(255, 201, 181, 0.6);
    animation: gfday-glow 3s ease-in-out infinite alternate;
  }

  @keyframes gfday-glow {
    from { text-shadow: 0 0 12px rgba(255, 201, 181, 0.4); }
    to { text-shadow: 0 0 28px rgba(255, 201, 181, 0.85); }
  }

  .header h1 {
    font-family: var(--font-script);
    font-size: clamp(2.6rem, 6vw, 3.8rem);
    font-weight: 400;
    color: var(--powder-blush);
    text-shadow: 0 0 26px rgba(247, 177, 171, 0.5);
  }

  .header p {
    color: var(--ash-grey);
    font-size: 0.95rem;
    margin-top: 0.2rem;
  }

  .planet {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    animation: bob var(--drift) ease-in-out var(--delay) infinite alternate;
    transition: filter 0.3s;
  }

  /* gentle floating drift so the roses feel alive */
  @keyframes bob {
    from { transform: translate(-50%, -50%) translateY(-7px); }
    to { transform: translate(-50%, -50%) translateY(7px); }
  }

  .planet :global(svg) {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .planet:hover :global(svg) {
    transform: scale(1.18) rotate(6deg);
  }

  .planet:hover {
    filter: drop-shadow(0 0 26px rgba(255, 201, 181, 0.75));
  }

  .planet-name {
    font-family: var(--font-script);
    font-size: 1.25rem;
    color: var(--peach-fuzz);
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.3s, transform 0.3s;
    pointer-events: none;
    white-space: nowrap;
    text-shadow: 0 0 12px rgba(10, 12, 13, 0.9);
  }

  .planet:hover .planet-name {
    opacity: 1;
    transform: translateY(0);
  }

  .sparkle {
    position: absolute;
    top: -12px;
    right: -10px;
    font-size: 1rem;
    animation: sparkle 1.8s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0.4; transform: scale(0.85) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.15) rotate(18deg); }
  }

  .gifts-btn {
    position: absolute;
    bottom: 1.6rem;
    right: 1.6rem;
    z-index: 10;
    padding: 0.7rem 1.4rem;
    border-radius: 999px;
    border: 1.5px solid var(--desert-sand);
    background: rgba(10, 12, 13, 0.6);
    backdrop-filter: blur(4px);
    color: var(--peach-fuzz);
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.25s;
  }

  .gifts-btn:hover {
    background: var(--peach-fuzz);
    color: var(--space-black);
    border-color: var(--peach-fuzz);
    box-shadow: 0 0 24px rgba(255, 201, 181, 0.5);
  }

  @media (max-width: 640px) {
    .planet :global(svg) {
      transform: scale(0.75);
    }

    .planet:hover :global(svg) {
      transform: scale(0.85) rotate(6deg);
    }
  }
</style>
