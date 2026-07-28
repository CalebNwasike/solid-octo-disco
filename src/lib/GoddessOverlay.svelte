<script>
  import { fade } from 'svelte/transition';

  let { data, onClose } = $props();

  let unlocked = $state(false);
  let answer = $state('');
  let wrong = $state(false);

  function tryUnlock() {
    const normalized = answer.replace(/[^a-z]/gi, '').toLowerCase();
    if (data.lock.answers.includes(normalized)) {
      unlocked = true;
    } else {
      wrong = true;
      setTimeout(() => (wrong = false), 600);
    }
  }
</script>

<div class="goddess" transition:fade={{ duration: 400 }}>
  {#if !unlocked}
    <div class="content lock" class:shake={wrong}>
      <span class="lock-icon">🎶</span>
      <h2 class="heading">{data.lock.question}</h2>
      <input
        type="text"
        placeholder="sing it back to me..."
        bind:value={answer}
        onkeydown={(e) => e.key === 'Enter' && tryUnlock()}
        autocomplete="off"
      />
      <button class="unlock" onclick={tryUnlock}>unlock 🏛️</button>
      {#if wrong}
        <p class="hint">{data.lock.hint}</p>
      {/if}
      <button class="back small" onclick={onClose}>← back to our universe</button>
    </div>
  {:else}
    <div class="content">
      <span class="columns" aria-hidden="true">🏛️</span>
      <h2 class="heading">The Architecture of You</h2>
      <p class="intro">{data.intro}</p>

      <ul class="features">
        {#each data.features as feature}
          <li class="feature">
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </li>
        {/each}
      </ul>

      <button class="back" onclick={onClose}>← back to our universe</button>
    </div>
  {/if}
</div>

<style>
  .goddess {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    background:
      radial-gradient(ellipse 70% 60% at 50% 30%, rgba(199, 211, 191, 0.18), transparent 65%),
      radial-gradient(ellipse 60% 50% at 50% 80%, rgba(247, 177, 171, 0.18), transparent 65%),
      var(--space-black);
    overflow-y: auto;
  }

  .content {
    position: relative;
    max-width: 600px;
    text-align: center;
    animation: rise 1.1s ease-out both;
    padding: 2.5rem 0;
  }

  @keyframes rise {
    from { opacity: 0; transform: translateY(26px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .columns {
    font-size: 2.4rem;
    display: block;
    margin-bottom: 0.4rem;
  }

  .heading {
    font-family: var(--font-script);
    font-size: clamp(2.2rem, 6vw, 3.2rem);
    font-weight: 400;
    color: #e9ede5;
    text-shadow: 0 0 26px rgba(199, 211, 191, 0.55);
    margin-bottom: 1.2rem;
  }

  .intro {
    font-size: 1.05rem;
    line-height: 1.75;
    color: var(--ash-grey);
    margin-bottom: 2rem;
  }

  .features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    margin-bottom: 2.2rem;
    text-align: left;
  }

  .feature {
    padding: 1.1rem 1.4rem;
    border-left: 3px solid var(--desert-sand);
    background: rgba(255, 255, 255, 0.035);
    border-radius: 0 16px 16px 0;
  }

  .feature h3 {
    font-family: var(--font-script);
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--peach-fuzz);
    margin-bottom: 0.3rem;
  }

  .feature p {
    font-size: 0.98rem;
    line-height: 1.65;
    color: var(--ash-grey);
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
    background: var(--ash-grey);
    border-color: var(--ash-grey);
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

  .lock .heading {
    font-size: clamp(1.8rem, 5vw, 2.6rem);
  }

  .lock input {
    width: min(300px, 82vw);
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
    border-color: var(--ash-grey);
    box-shadow: 0 0 18px rgba(199, 211, 191, 0.35);
  }

  .lock input::placeholder {
    color: var(--dusty-mauve);
  }

  .unlock {
    padding: 0.8rem 2rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--ash-grey), #e9ede5);
    color: var(--space-black);
    font-size: 1rem;
    font-weight: 700;
    box-shadow: 0 0 24px rgba(199, 211, 191, 0.45);
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
