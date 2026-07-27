<script>
  let { onProceed } = $props();

  let password = $state('');
  let wrong = $state(false);
  let showHint = $state(false);

  // Accepts the date in any common way she might type it:
  // 2/15/2024, 02/15/2024, 2-15-24, 02.15.2024, 21524, etc.
  const ACCEPTED = ['2152024', '02152024', '21524', '021524'];

  function tryUnlock() {
    const digits = password.replace(/\D/g, '');
    if (ACCEPTED.includes(digits)) {
      onProceed();
    } else {
      wrong = true;
      showHint = true;
      setTimeout(() => (wrong = false), 600);
    }
  }
</script>

<div class="intro">
  <div class="stars"></div>

  <div class="content">
    <h1 class="title">This is us.</h1>
    <p class="subtitle">This is our timeline.</p>

    <p class="message">
      Before you click this button to timewarp into our relationship,
      understand that I've always loved you and will always love you.
    </p>

    <div class="gate" class:shake={wrong}>
      <label class="gate-label" for="pw">
        Enter the day we became us&nbsp;💗
      </label>
      <input
        id="pw"
        type="text"
        placeholder="MM/DD/YYYY"
        bind:value={password}
        onkeydown={(e) => e.key === 'Enter' && tryUnlock()}
        autocomplete="off"
      />
      <button class="proceed" onclick={tryUnlock}>Timewarp into us ✨</button>
      {#if showHint}
        <p class="hint">Hint: the very first day you became my girlfriend&nbsp;🥺</p>
      {/if}
    </div>
  </div>

  <div class="floating-hearts" aria-hidden="true">
    {#each Array(10) as _, i}
      <span class="heart" style="--i:{i}">💗</span>
    {/each}
  </div>
</div>

<style>
  .intro {
    position: relative;
    height: 100%;
    display: grid;
    place-items: center;
    overflow: hidden;
    background:
      radial-gradient(ellipse 80% 60% at 70% 20%, rgba(247, 177, 171, 0.28), transparent 60%),
      radial-gradient(ellipse 70% 55% at 20% 85%, rgba(255, 201, 181, 0.18), transparent 60%),
      var(--space-black);
  }

  .stars {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(1.5px 1.5px at 20% 30%, #fff 50%, transparent 51%),
      radial-gradient(1px 1px at 40% 70%, #fff 50%, transparent 51%),
      radial-gradient(2px 2px at 60% 15%, var(--peach-fuzz) 50%, transparent 51%),
      radial-gradient(1px 1px at 80% 50%, #fff 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 10% 60%, var(--powder-blush) 50%, transparent 51%),
      radial-gradient(1px 1px at 90% 80%, #fff 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 50% 90%, #fff 50%, transparent 51%),
      radial-gradient(1px 1px at 30% 10%, var(--ash-grey) 50%, transparent 51%);
    animation: twinkle 4s ease-in-out infinite alternate;
    opacity: 0.8;
  }

  @keyframes twinkle {
    from { opacity: 0.45; }
    to { opacity: 0.95; }
  }

  .content {
    position: relative;
    z-index: 2;
    max-width: 620px;
    padding: 2rem;
    text-align: center;
  }

  .title {
    font-family: var(--font-script);
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 400;
    color: var(--powder-blush);
    text-shadow: 0 0 30px rgba(247, 177, 171, 0.5);
  }

  .subtitle {
    font-family: var(--font-script);
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    color: var(--peach-fuzz);
    margin-bottom: 1.8rem;
  }

  .message {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--ash-grey);
    margin-bottom: 2.2rem;
  }

  .gate {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
  }

  .gate-label {
    font-size: 0.95rem;
    color: var(--desert-sand);
    letter-spacing: 0.04em;
  }

  input {
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

  input:focus {
    border-color: var(--powder-blush);
    box-shadow: 0 0 18px rgba(247, 177, 171, 0.35);
  }

  input::placeholder {
    color: var(--dusty-mauve);
  }

  .proceed {
    padding: 0.85rem 2.2rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--powder-blush), var(--peach-fuzz));
    color: var(--space-black);
    font-size: 1.05rem;
    font-weight: 700;
    box-shadow: 0 0 24px rgba(255, 201, 181, 0.45);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .proceed:hover {
    transform: scale(1.05);
    box-shadow: 0 0 36px rgba(255, 201, 181, 0.7);
  }

  .hint {
    font-size: 0.85rem;
    color: var(--dusty-mauve);
  }

  .shake {
    animation: shake 0.5s;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-9px); }
    40% { transform: translateX(9px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }

  .floating-hearts {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }

  .heart {
    position: absolute;
    bottom: -3rem;
    left: calc(var(--i) * 10% + 3%);
    font-size: calc(0.8rem + var(--i) * 0.12rem);
    opacity: 0;
    animation: float 11s linear infinite;
    animation-delay: calc(var(--i) * 1.2s);
  }

  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.55; }
    90% { opacity: 0.25; }
    100% { transform: translateY(-110vh) rotate(24deg); opacity: 0; }
  }
</style>
