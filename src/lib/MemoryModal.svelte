<script>
  import { fade, scale } from 'svelte/transition';

  let { memory, onClose } = $props();

  let imgFailed = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" transition:fade={{ duration: 250 }} onclick={onClose}>
  <div
    class="card"
    transition:scale={{ duration: 350, start: 0.7 }}
    onclick={(e) => e.stopPropagation()}
    role="dialog"
    aria-label={memory.name}
    tabindex="-1"
  >
    <button class="close" onclick={onClose} aria-label="Close">✕</button>

    <h2 class="name">{memory.name}</h2>

    <div class="photo-box">
      {#if !imgFailed}
        <img
          src={memory.photo}
          alt={memory.name}
          onerror={() => (imgFailed = true)}
        />
      {:else}
        <!-- placeholder shown until a real photo is added -->
        <div class="placeholder">
          <span class="ph-heart">💗</span>
          <span class="ph-text">your photo goes here</span>
          <span class="ph-file">{memory.photo}</span>
        </div>
      {/if}
    </div>

    <p class="quote">"{memory.quote}"</p>
    {#if memory.author}
      <p class="author">— {memory.author}</p>
    {/if}
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: grid;
    place-items: center;
    background: rgba(10, 12, 13, 0.75);
    backdrop-filter: blur(6px);
    padding: 1rem;
  }

  .card {
    position: relative;
    width: min(440px, 94vw);
    max-height: 92vh;
    overflow-y: auto;
    background: linear-gradient(160deg, rgba(247, 177, 171, 0.16), rgba(10, 12, 13, 0.9)),
      var(--space-black);
    border: 1.5px solid var(--powder-blush);
    border-radius: 24px;
    padding: 2rem 1.8rem 1.8rem;
    text-align: center;
    box-shadow: 0 0 60px rgba(247, 177, 171, 0.35);
  }

  .close {
    position: absolute;
    top: 0.9rem;
    right: 1rem;
    font-size: 1.1rem;
    color: var(--dusty-mauve);
    transition: color 0.2s;
  }

  .close:hover {
    color: var(--peach-fuzz);
  }

  .name {
    font-family: var(--font-script);
    font-size: 2rem;
    font-weight: 400;
    color: var(--powder-blush);
    margin-bottom: 1.1rem;
  }

  .photo-box {
    width: 100%;
    aspect-ratio: 4 / 5;
    border-radius: 18px;
    overflow: hidden;
    margin-bottom: 1.2rem;
    background: rgba(255, 255, 255, 0.04);
  }

  .photo-box img {
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
    border: 2px dashed var(--dusty-mauve);
    border-radius: 18px;
  }

  .ph-heart {
    font-size: 2.4rem;
    animation: beat 1.6s ease-in-out infinite;
  }

  @keyframes beat {
    0%, 100% { transform: scale(1); }
    12% { transform: scale(1.18); }
    24% { transform: scale(1); }
  }

  .ph-text {
    color: var(--desert-sand);
    font-size: 1rem;
  }

  .ph-file {
    color: var(--dusty-mauve);
    font-size: 0.75rem;
    font-family: monospace;
  }

  .quote {
    font-size: 1.02rem;
    line-height: 1.65;
    color: var(--peach-fuzz);
  }

  .author {
    margin-top: 0.5rem;
    color: var(--ash-grey);
    font-size: 0.9rem;
  }
</style>
