<script>
  import { fade } from 'svelte/transition';

  let { message, photo = null, lock = null, onClose } = $props();

  // if this star is locked, she has to answer the question first
  let unlocked = $state(!lock);
  let answer = $state('');
  let wrong = $state(false);
  let imgFailed = $state(false);

  function tryUnlock() {
    if (answer.trim().toLowerCase() === lock.answer.toLowerCase()) {
      unlocked = true;
    } else {
      wrong = true;
      setTimeout(() => (wrong = false), 600);
    }
  }
</script>

<div class="special" transition:fade={{ duration: 400 }}>
  <div class="glow-ring"></div>

  {#if !unlocked}
    <div class="content lock" class:shake={wrong}>
      <span class="lock-icon">🔒</span>
      <h2 class="heading">{lock.question}</h2>
      <input
        type="text"
        placeholder="whisper it here..."
        bind:value={answer}
        onkeydown={(e) => e.key === 'Enter' && tryUnlock()}
        autocomplete="off"
      />
      <button class="unlock" onclick={tryUnlock}>unlock 💫</button>
      {#if wrong}
        <p class="hint">{lock.hint}</p>
      {/if}
      <button class="back small" onclick={onClose}>← back to our universe</button>
    </div>
  {:else}
    <div class="content">
      <h2 class="heading">To my universe&nbsp;💖</h2>

      {#if photo}
        <div class="photo-box">
          {#if !imgFailed}
            <img src={photo} alt="us" onerror={() => (imgFailed = true)} />
          {:else}
            <div class="placeholder">
              <span class="ph-heart">💗</span>
              <span class="ph-text">your photo goes here</span>
              <span class="ph-file">{photo}</span>
            </div>
          {/if}
        </div>
      {/if}

      <p class="message">{message}</p>
      <button class="back" onclick={onClose}>← back to our universe</button>
    </div>
  {/if}
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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    50% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
  }

  .content {
    position: relative;
    max-width: 560px;
    text-align: center;
    animation: rise 1.1s ease-out both;
    padding: 2rem 0;
  }

  @keyframes rise {
    from { opacity: 0; transform: translateY(26px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .heading {
    font-family: var(--font-script);
    font-size: clamp(2.2rem, 6vw, 3.2rem);
    font-weight: 400;
    color: var(--powder-blush);
    text-shadow: 0 0 26px rgba(247, 177, 171, 0.6);
    margin-bottom: 1.4rem;
  }

  .photo-box {
    width: min(340px, 80vw);
    aspect-ratio: 4 / 5;
    margin: 0 auto 1.5rem;
    border-radius: 18px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 0 40px rgba(247, 177, 171, 0.25);
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

  .back.small {
    margin-top: 1.6rem;
    padding: 0.5rem 1.2rem;
    font-size: 0.82rem;
    border-color: var(--dusty-mauve);
    color: var(--dusty-mauve);
  }

  /* lock screen */
  .lock {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
  }

  .lock-icon {
    font-size: 2rem;
  }

  .lock input {
    width: min(280px, 80vw);
    padding: 0.8rem 1.1rem;
    border-radius: 999px;
    border: 1.5px solid var(--dusty-mauve);
    background: rgba(255, 255, 255, 0.05);
    color: var(--peach-fuzz);
    font-size: 1.05rem;
    text-align: center;
    letter-spacing: 0.08em;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .lock input:focus {
    border-color: var(--powder-blush);
    box-shadow: 0 0 18px rgba(247, 177, 171, 0.35);
  }

  .lock input::placeholder {
    color: var(--dusty-mauve);
  }

  .unlock {
    padding: 0.8rem 2rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--powder-blush), var(--peach-fuzz));
    color: var(--space-black);
    font-size: 1rem;
    font-weight: 700;
    box-shadow: 0 0 24px rgba(255, 201, 181, 0.45);
    transition: transform 0.2s;
  }

  .unlock:hover {
    transform: scale(1.05);
  }

  .hint {
    font-size: 0.85rem;
    color: var(--dusty-mauve);
  }

  .shake {
    animation: rise 1.1s ease-out both, shake 0.5s;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-9px); }
    40% { transform: translateX(9px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
</style>
