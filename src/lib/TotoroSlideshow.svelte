<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { music } from './data/media.js';

  let { data, onClose } = $props();

  let idx = $state(0);
  let failed = $state({});

  const count = data.images.length;

  function next() {
    idx = (idx + 1) % count;
  }

  function prev() {
    idx = (idx - 1 + count) % count;
  }

  onMount(() => {
    const timer = setInterval(next, 3500);

    // 🔊 the Totoro theme — plays while this planet is open
    // (drop the file at public/audio/totoro-theme.mp3)
    const theme = new Audio(music.totoro);
    theme.loop = true;
    theme.volume = 0.65;
    theme.play().catch(() => {}); // stays quiet if the file isn't there yet

    return () => {
      clearInterval(timer);
      theme.pause();
      theme.src = '';
    };
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" transition:fade={{ duration: 250 }} onclick={onClose}>
  <div
    class="card"
    transition:scale={{ duration: 350, start: 0.75 }}
    onclick={(e) => e.stopPropagation()}
    role="dialog"
    aria-label={data.name}
    tabindex="-1"
  >
    <button class="close" onclick={onClose} aria-label="Close">✕</button>

    <h2 class="name">Our Neighbor Totoro 🌱</h2>

    <div class="stage">
      <button class="arrow left" onclick={prev} aria-label="Previous">‹</button>

      <div class="frame">
        {#key idx}
          <div class="slide" in:fade={{ duration: 350 }}>
            {#if !failed[idx]}
              <img
                src={data.images[idx]}
                alt="Totoro {idx + 1}"
                onerror={() => (failed = { ...failed, [idx]: true })}
              />
            {:else}
              <div class="placeholder">
                <span class="ph-icon">🌳🐾</span>
                <span class="ph-text">totoro pic goes here</span>
                <span class="ph-file">{data.images[idx]}</span>
              </div>
            {/if}
          </div>
        {/key}
      </div>

      <button class="arrow right" onclick={next} aria-label="Next">›</button>
    </div>

    <div class="dots">
      {#each data.images as _, i}
        <button
          class="dot"
          class:active={i === idx}
          onclick={() => (idx = i)}
          aria-label="Slide {i + 1}"
        ></button>
      {/each}
    </div>

    <p class="note">for the girl who loves Totoro 💚</p>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: grid;
    place-items: center;
    background: rgba(10, 12, 13, 0.78);
    backdrop-filter: blur(6px);
    padding: 1rem;
  }

  .card {
    position: relative;
    width: min(520px, 96vw);
    max-height: 94vh;
    overflow-y: auto;
    background: linear-gradient(160deg, rgba(199, 211, 191, 0.16), rgba(10, 12, 13, 0.92)),
      var(--space-black);
    border: 1.5px solid var(--ash-grey);
    border-radius: 24px;
    padding: 2rem 1.4rem 1.6rem;
    text-align: center;
    box-shadow: 0 0 60px rgba(199, 211, 191, 0.3);
  }

  .close {
    position: absolute;
    top: 0.9rem;
    right: 1rem;
    font-size: 1.1rem;
    color: var(--dusty-mauve);
  }

  .close:hover {
    color: var(--ash-grey);
  }

  .name {
    font-family: var(--font-script);
    font-size: 2rem;
    font-weight: 400;
    color: var(--ash-grey);
    margin-bottom: 1.1rem;
  }

  .stage {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .frame {
    flex: 1;
    aspect-ratio: 4 / 3;
    border-radius: 18px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.04);
    display: grid;
  }

  .slide {
    grid-area: 1 / 1;
    width: 100%;
    height: 100%;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 2px dashed var(--ash-grey);
    border-radius: 18px;
  }

  .ph-icon { font-size: 2.2rem; }
  .ph-text { color: var(--ash-grey); font-size: 0.95rem; }
  .ph-file { color: var(--dusty-mauve); font-size: 0.72rem; font-family: monospace; }

  .arrow {
    font-size: 2.2rem;
    line-height: 1;
    color: var(--ash-grey);
    padding: 0.4rem 0.6rem;
    border-radius: 12px;
    transition: background 0.2s, transform 0.2s;
  }

  .arrow:hover {
    background: rgba(199, 211, 191, 0.15);
    transform: scale(1.15);
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 0.45rem;
    margin-top: 0.9rem;
  }

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(199, 211, 191, 0.3);
    transition: background 0.2s, transform 0.2s;
  }

  .dot.active {
    background: var(--ash-grey);
    transform: scale(1.3);
  }

  .note {
    margin-top: 0.9rem;
    font-size: 0.85rem;
    color: var(--dusty-mauve);
  }
</style>
