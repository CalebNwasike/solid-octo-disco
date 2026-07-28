<script>
  // A marble goddess planet 🏛️ — ringed, laurel-crowned, floating.
  let { size = 110 } = $props();

  const uid = Math.random().toString(36).slice(2, 8);
</script>

<svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
  <defs>
    <radialGradient id="marble-{uid}" cx="42%" cy="36%" r="70%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="55%" stop-color="#e9ede5" />
      <stop offset="100%" stop-color="var(--ash-grey)" />
    </radialGradient>
  </defs>

  <g transform="rotate(-15 50 50)">
    <!-- back of the ring -->
    <ellipse
      cx="50"
      cy="50"
      rx="43"
      ry="11"
      fill="none"
      stroke="var(--peach-fuzz)"
      stroke-width="2.5"
      opacity="0.55"
    />

    <!-- marble planet -->
    <circle cx="50" cy="50" r="26" fill="url(#marble-{uid})" />

    <!-- faint marble veins -->
    <path
      d="M32 42 q 10 6 6 16 M44 28 q 8 8 18 6 M58 66 q 6 -8 14 -8"
      fill="none"
      stroke="var(--dusty-mauve)"
      stroke-width="1"
      stroke-linecap="round"
      opacity="0.35"
    />

    <!-- front of the ring, passing over the planet -->
    <path
      d="M7 50 A 43 11 0 0 0 93 50"
      fill="none"
      stroke="var(--peach-fuzz)"
      stroke-width="2.5"
      opacity="0.9"
    />
  </g>

  <!-- laurel wreath resting on the planet -->
  <g fill="var(--desert-sand)" opacity="0.95">
    <ellipse cx="33" cy="66" rx="7" ry="3" transform="rotate(35 33 66)" />
    <ellipse cx="39" cy="71" rx="7" ry="3" transform="rotate(20 39 71)" />
    <ellipse cx="47" cy="73" rx="7" ry="3" transform="rotate(5 47 73)" />
    <ellipse cx="55" cy="73" rx="7" ry="3" transform="rotate(-5 55 73)" />
    <ellipse cx="63" cy="70" rx="7" ry="3" transform="rotate(-20 63 70)" />
    <ellipse cx="69" cy="65" rx="7" ry="3" transform="rotate(-35 69 65)" />
  </g>

  <!-- little sparkles -->
  <g fill="#ffffff">
    <path d="M20 22 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z" opacity="0.9" />
    <path d="M80 28 l1 2.6 2.6 1 -2.6 1 -1 2.6 -1 -2.6 -2.6 -1 2.6 -1 z" opacity="0.7" />
    <path d="M74 12 l0.8 2 2 0.8 -2 0.8 -0.8 2 -0.8 -2 -2 -0.8 2 -0.8 z" opacity="0.6" />
  </g>
</svg>

<style>
  svg {
    display: block;
    overflow: visible;
    filter: drop-shadow(0 0 16px rgba(231, 237, 229, 0.5));
  }
</style>
