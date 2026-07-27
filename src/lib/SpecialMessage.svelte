<script>
  import { fade } from 'svelte/transition';

  let { message, onClose } = $props();
</script>

<div class="special" transition:fade={{ duration: 400 }}>
  <div class="glow-ring"></div>
  <div class="content">
    <h2 class="heading">To my universe&nbsp;💖</h2>
    <p class="message">{message}</p>
    <button class="back" onclick={onClose}>← back to our universe</button>
  </div>
</div>

<style>
  .special {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    background:
      radial-gradient(ellipse 70% 60% at 50% 40%, rgba(247, 177, 171, 0.3), transparent 65%),
      var(--space-black);
    overflow-y: auto;
  }

  .glow-ring {
    position: absolute;
    width: min(78vmin, 620px);
    height: min(78vmin, 620px);
    border-radius: 50%;
    border: 1.5px solid rgba(255, 201, 181, 0.35);
    box-shadow:
      0 0 80px rgba(247, 177, 171, 0.35),
      inset 0 0 80px rgba(247, 177, 171, 0.2);
    animation: pulse 4s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.05); opacity: 1; }
  }

  .content {
    position: relative;
    max-width: 560px;
    text-align: center;
    animation: rise 1.1s ease-out both;
  }

  @keyframes rise {
    from { opacity: 0; transform: translateY(26px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .heading {
    font-family: var(--font-script);
    font-size: clamp(2.4rem, 6vw, 3.4rem);
    font-weight: 400;
    color: var(--powder-blush);
    text-shadow: 0 0 26px rgba(247, 177, 171, 0.6);
    margin-bottom: 1.4rem;
  }

  .message {
    font-size: 1.08rem;
    line-height: 1.85;
    color: var(--peach-fuzz);
    margin-bottom: 2rem;
  }

  .back {
    padding: 0.75rem 1.8rem;
    border-radius: 999px;
    border: 1.5px solid var(--desert-sand);
    color: var(--desert-sand);
    font-size: 0.95rem;
    transition: all 0.25s;
  }

  .back:hover {
    color: var(--space-black);
    background: var(--peach-fuzz);
    border-color: var(--peach-fuzz);
  }
</style>
