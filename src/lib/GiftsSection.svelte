<script>
  import { fade, fly } from 'svelte/transition';
  import { gifts } from './data/gifts.js';

  let { onClose } = $props();

  let copiedIndex = $state(-1);

  async function copyCode(code, i) {
    try {
      await navigator.clipboard.writeText(code);
      copiedIndex = i;
      setTimeout(() => (copiedIndex = -1), 1800);
    } catch {
      // clipboard can be blocked — select-and-copy fallback via prompt
      window.prompt('Copy your code 💗', code);
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" transition:fade={{ duration: 250 }} onclick={onClose}>
  <div
    class="panel"
    transition:fly={{ y: 60, duration: 400 }}
    onclick={(e) => e.stopPropagation()}
    role="dialog"
    aria-label="Gifts for you"
    tabindex="-1"
  >
    <button class="close" onclick={onClose} aria-label="Close">✕</button>
    <h2 class="heading">Gifts for you 🎁</h2>
    <p class="sub">Little things, because you deserve the universe.</p>

    <ul class="gift-list">
      {#each gifts as gift, i}
        <li class="gift">
          <div class="gift-info">
            <span class="gift-title">{gift.title}</span>
            {#if gift.note}
              <span class="gift-note">{gift.note}</span>
            {/if}
          </div>
          <div class="gift-actions">
            {#if gift.url}
              <a class="btn open" href={gift.url} target="_blank" rel="noopener noreferrer">
                open 💌
              </a>
            {/if}
            {#if gift.code}
              <button class="btn code" onclick={() => copyCode(gift.code, i)}>
                {copiedIndex === i ? 'copied! 💗' : gift.code}
              </button>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: grid;
    place-items: end center;
    background: rgba(10, 12, 13, 0.7);
    backdrop-filter: blur(6px);
  }

  .panel {
    position: relative;
    width: min(560px, 100vw);
    max-height: 82vh;
    overflow-y: auto;
    background: linear-gradient(180deg, rgba(247, 177, 171, 0.14), rgba(10, 12, 13, 0.95)),
      var(--space-black);
    border: 1.5px solid var(--powder-blush);
    border-bottom: none;
    border-radius: 26px 26px 0 0;
    padding: 2rem 1.6rem 2.4rem;
    box-shadow: 0 -10px 60px rgba(247, 177, 171, 0.3);
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1.1rem;
    font-size: 1.1rem;
    color: var(--dusty-mauve);
    transition: color 0.2s;
  }

  .close:hover {
    color: var(--peach-fuzz);
  }

  .heading {
    font-family: var(--font-script);
    font-size: 2.2rem;
    font-weight: 400;
    color: var(--powder-blush);
    text-align: center;
  }

  .sub {
    text-align: center;
    color: var(--ash-grey);
    font-size: 0.92rem;
    margin: 0.3rem 0 1.5rem;
  }

  .gift-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .gift {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem 1.2rem;
    border: 1px solid rgba(128, 113, 130, 0.55);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.03);
    transition: border-color 0.2s, background 0.2s;
  }

  .gift:hover {
    border-color: var(--peach-fuzz);
    background: rgba(255, 201, 181, 0.06);
  }

  .gift-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .gift-title {
    font-weight: 700;
    color: var(--peach-fuzz);
  }

  .gift-note {
    font-size: 0.82rem;
    color: var(--dusty-mauve);
  }

  .gift-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
  }

  .open {
    background: linear-gradient(135deg, var(--powder-blush), var(--peach-fuzz));
    color: var(--space-black);
  }

  .open:hover {
    filter: brightness(1.08);
  }

  .code {
    border: 1.5px dashed var(--desert-sand);
    color: var(--desert-sand);
    font-family: monospace;
    letter-spacing: 0.05em;
  }

  .code:hover {
    border-color: var(--peach-fuzz);
    color: var(--peach-fuzz);
  }
</style>
