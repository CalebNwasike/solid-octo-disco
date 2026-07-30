<script>
  import { fade, scale } from 'svelte/transition';
  import { secretLink } from './data/media.js';

  let { onClose } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" transition:fade={{ duration: 250 }} onclick={onClose}>
  <div
    class="card"
    transition:scale={{ duration: 350, start: 0.7 }}
    onclick={(e) => e.stopPropagation()}
    role="dialog"
    aria-label="Secret"
    tabindex="-1"
  >
    <button class="close" onclick={onClose} aria-label="Close">✕</button>
    <span class="star" aria-hidden="true">✦</span>
    <h2 class="title">{secretLink.title}</h2>
    <p class="note">{secretLink.note}</p>
    <a class="link" href={secretLink.url} target="_blank" rel="noopener noreferrer">
      {secretLink.label}
    </a>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 55;
    display: grid;
    place-items: center;
    background: rgba(10, 12, 13, 0.75);
    backdrop-filter: blur(6px);
    padding: 1rem;
  }

  .card {
    position: relative;
    width: min(360px, 92vw);
    background: linear-gradient(160deg, rgba(247, 177, 171, 0.16), rgba(10, 12, 13, 0.92)),
      var(--space-black);
    border: 1.5px solid var(--powder-blush);
    border-radius: 22px;
    padding: 2.2rem 1.8rem 2rem;
    text-align: center;
    box-shadow: 0 0 60px rgba(247, 177, 171, 0.35);
  }

  .close {
    position: absolute;
    top: 0.8rem;
    right: 0.9rem;
    font-size: 1.05rem;
    color: var(--dusty-mauve);
  }

  .close:hover {
    color: var(--peach-fuzz);
  }

  .star {
    display: block;
    font-size: 1.8rem;
    color: var(--peach-fuzz);
    margin-bottom: 0.4rem;
    animation: spin-sparkle 3s ease-in-out infinite;
  }

  @keyframes spin-sparkle {
    0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.8; }
    50% { transform: rotate(180deg) scale(1.2); opacity: 1; }
  }

  .title {
    font-family: var(--font-script);
    font-size: 1.9rem;
    font-weight: 400;
    color: var(--powder-blush);
    margin-bottom: 0.5rem;
  }

  .note {
    font-size: 0.95rem;
    color: var(--ash-grey);
    margin-bottom: 1.5rem;
  }

  .link {
    display: inline-block;
    padding: 0.8rem 2rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--powder-blush), var(--peach-fuzz));
    color: var(--space-black);
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 0 24px rgba(255, 201, 181, 0.45);
    transition: transform 0.2s;
  }

  .link:hover {
    transform: scale(1.06);
  }
</style>
