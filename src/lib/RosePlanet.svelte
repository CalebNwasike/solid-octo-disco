<script>
  // A cute rose, seen from above, that doubles as a planet 🌹
  let { size = 140, glow = true } = $props();

  const uid = Math.random().toString(36).slice(2, 8);
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 100 100"
  class:glow
  aria-hidden="true"
>
  <defs>
    <radialGradient id="petal-{uid}" cx="50%" cy="42%" r="65%">
      <stop offset="0%" stop-color="#ffe0d4" />
      <stop offset="55%" stop-color="var(--peach-fuzz)" />
      <stop offset="100%" stop-color="var(--powder-blush)" />
    </radialGradient>
    <radialGradient id="heart-{uid}" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="var(--powder-blush)" />
      <stop offset="100%" stop-color="var(--desert-sand)" />
    </radialGradient>
  </defs>

  <!-- little leaves peeking out -->
  <g fill="var(--ash-grey)" opacity="0.9">
    <ellipse cx="18" cy="76" rx="12" ry="5.5" transform="rotate(-35 18 76)" />
    <ellipse cx="82" cy="76" rx="12" ry="5.5" transform="rotate(35 82 76)" />
    <ellipse cx="50" cy="90" rx="11" ry="5" />
  </g>

  <!-- outer ring of petals -->
  <g fill="url(#petal-{uid})" stroke="var(--powder-blush)" stroke-width="1">
    {#each Array(8) as _, i}
      <ellipse
        cx="50"
        cy="24"
        rx="15"
        ry="20"
        transform="rotate({i * 45} 50 50)"
      />
    {/each}
  </g>

  <!-- middle ring of petals -->
  <g fill="url(#petal-{uid})" stroke="var(--desert-sand)" stroke-width="1">
    {#each Array(6) as _, i}
      <ellipse
        cx="50"
        cy="34"
        rx="11"
        ry="14"
        transform="rotate({i * 60 + 30} 50 50)"
      />
    {/each}
  </g>

  <!-- rose heart with a cute swirl -->
  <circle cx="50" cy="50" r="16" fill="url(#heart-{uid})" />
  <path
    d="M50 50
       m 0 -11
       a 11 11 0 1 1 -11 11
       a 8 8 0 1 0 8 -8
       a 5 5 0 1 1 -5 5
       a 2.5 2.5 0 1 0 2.5 -2.5"
    fill="none"
    stroke="var(--dusty-mauve)"
    stroke-width="2.2"
    stroke-linecap="round"
    opacity="0.85"
  />
</svg>

<style>
  svg {
    display: block;
    overflow: visible;
  }

  .glow {
    filter: drop-shadow(0 0 14px rgba(255, 201, 181, 0.45));
  }
</style>
