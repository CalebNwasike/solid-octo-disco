<script>
  import { fade, scale } from 'svelte/transition';

  let { data, onClose } = $props();

  const answer = data.answer.toUpperCase();
  const cols = answer.length;
  const maxTries = data.maxTries;

  let guesses = $state([]); // [{ word, states: ['correct'|'present'|'absent'] }]
  let current = $state('');
  let status = $state('playing'); // 'playing' | 'won' | 'lost'
  let shakeRow = $state(false);
  let keyStates = $state({});
  let imgFailed = $state(false);

  const KEY_ROWS = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['ENTER', ...'ZXCVBNM'.split(''), 'DEL'],
  ];

  const RANK = { absent: 0, present: 1, correct: 2 };

  function evaluate(guess) {
    const states = Array(cols).fill('absent');
    const remaining = {};
    for (let i = 0; i < cols; i++) {
      if (guess[i] === answer[i]) states[i] = 'correct';
      else remaining[answer[i]] = (remaining[answer[i]] || 0) + 1;
    }
    for (let i = 0; i < cols; i++) {
      if (states[i] !== 'correct' && remaining[guess[i]] > 0) {
        states[i] = 'present';
        remaining[guess[i]]--;
      }
    }
    return states;
  }

  function submit() {
    if (status !== 'playing') return;
    if (current.length !== cols) {
      shakeRow = true;
      setTimeout(() => (shakeRow = false), 500);
      return;
    }
    const states = evaluate(current);
    const updates = { ...keyStates };
    for (let i = 0; i < cols; i++) {
      const k = current[i];
      if (!updates[k] || RANK[states[i]] > RANK[updates[k]]) updates[k] = states[i];
    }
    keyStates = updates;
    guesses = [...guesses, { word: current, states }];
    if (current === answer) status = 'won';
    else if (guesses.length >= maxTries) status = 'lost';
    current = '';
  }

  function press(k) {
    if (status !== 'playing') return;
    if (k === 'ENTER') submit();
    else if (k === 'DEL') current = current.slice(0, -1);
    else if (current.length < cols && /^[A-Z]$/.test(k)) current += k;
  }

  function onKeydown(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Enter') press('ENTER');
    else if (e.key === 'Backspace') press('DEL');
    else if (/^[a-zA-Z]$/.test(e.key)) press(e.key.toUpperCase());
  }

  function reset() {
    guesses = [];
    current = '';
    status = 'playing';
    keyStates = {};
  }
</script>

<svelte:window onkeydown={onKeydown} />

<div class="backdrop" transition:fade={{ duration: 250 }}>
  <div class="game" transition:scale={{ duration: 350, start: 0.8 }}>
    <button class="close" onclick={onClose} aria-label="Close">✕</button>

    {#if status !== 'won'}
      <p class="prompt">"{data.prompt}"</p>
      <p class="sub">guess the word... you get {maxTries} tries 🙈</p>

      <div class="grid" style="--cols: {cols};">
        {#each Array(maxTries) as _, r}
          <div class="row" class:shake={shakeRow && r === guesses.length}>
            {#each Array(cols) as _, c}
              {#if r < guesses.length}
                <span class="tile {guesses[r].states[c]}" style="--flip: {c * 0.12}s">
                  {guesses[r].word[c]}
                </span>
              {:else if r === guesses.length}
                <span class="tile" class:filled={c < current.length}>
                  {current[c] ?? ''}
                </span>
              {:else}
                <span class="tile"></span>
              {/if}
            {/each}
          </div>
        {/each}
      </div>

      {#if status === 'lost'}
        <div class="lost">
          <p>out of tries!! 😭 the word was <strong>{answer}</strong></p>
          <p class="lost-sub">(yes. really. don't ask.)</p>
          <button class="action" onclick={reset}>try again 🙈</button>
        </div>
      {:else}
        <div class="keyboard">
          {#each KEY_ROWS as row}
            <div class="key-row">
              {#each row as k}
                <button
                  class="key {keyStates[k] ?? ''}"
                  class:wide={k === 'ENTER' || k === 'DEL'}
                  onclick={() => press(k)}
                >
                  {k === 'DEL' ? '⌫' : k}
                </button>
              {/each}
            </div>
          {/each}
        </div>
      {/if}
    {:else}
      <div class="reveal" in:fade={{ duration: 400 }}>
        <h2 class="won-title">you got it 😳</h2>
        <div class="photo-box">
          {#if !imgFailed}
            <img src={data.photo} alt="hehe" onerror={() => (imgFailed = true)} />
          {:else}
            <div class="placeholder">
              <span class="ph-heart">🦶💗</span>
              <span class="ph-text">your photo goes here</span>
              <span class="ph-file">{data.photo}</span>
            </div>
          {/if}
        </div>
        <p class="caption">{data.caption}</p>
        <button class="action" onclick={onClose}>← back to our universe</button>
      </div>
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
    background: rgba(10, 12, 13, 0.82);
    backdrop-filter: blur(6px);
    padding: 1rem;
  }

  .game {
    position: relative;
    width: min(440px, 96vw);
    max-height: 94vh;
    overflow-y: auto;
    background: linear-gradient(160deg, rgba(247, 177, 171, 0.14), rgba(10, 12, 13, 0.92)),
      var(--space-black);
    border: 1.5px solid var(--powder-blush);
    border-radius: 24px;
    padding: 2rem 1.4rem 1.6rem;
    text-align: center;
    box-shadow: 0 0 60px rgba(247, 177, 171, 0.3);
  }

  .close {
    position: absolute;
    top: 0.9rem;
    right: 1rem;
    font-size: 1.1rem;
    color: var(--dusty-mauve);
  }

  .close:hover {
    color: var(--peach-fuzz);
  }

  .prompt {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--peach-fuzz);
    margin-bottom: 0.3rem;
  }

  .sub {
    font-size: 0.85rem;
    color: var(--dusty-mauve);
    margin-bottom: 1.2rem;
  }

  .grid {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1.2rem;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(var(--cols), 3.2rem);
    gap: 0.4rem;
    justify-content: center;
  }

  .tile {
    height: 3.2rem;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--peach-fuzz);
    border: 2px solid rgba(128, 113, 130, 0.6);
    border-radius: 10px;
    text-transform: uppercase;
    transition: border-color 0.15s, transform 0.15s;
  }

  .tile.filled {
    border-color: var(--peach-fuzz);
    transform: scale(1.05);
  }

  .tile.correct,
  .tile.present,
  .tile.absent {
    border: none;
    color: var(--space-black);
    animation: flip 0.5s ease var(--flip) both;
  }

  .tile.correct { background: #a8c69f; }
  .tile.present { background: #e8c97b; }
  .tile.absent { background: var(--dusty-mauve); color: rgba(10, 12, 13, 0.75); }

  @keyframes flip {
    0% { transform: rotateX(90deg); opacity: 0.4; }
    100% { transform: rotateX(0deg); opacity: 1; }
  }

  .shake {
    animation: shake 0.45s;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-7px); }
    50% { transform: translateX(7px); }
    75% { transform: translateX(-5px); }
  }

  .keyboard {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .key-row {
    display: flex;
    justify-content: center;
    gap: 0.3rem;
  }

  .key {
    min-width: 1.9rem;
    padding: 0.7rem 0.35rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.09);
    color: var(--peach-fuzz);
    font-size: 0.85rem;
    font-weight: 700;
    transition: background 0.15s;
  }

  .key:hover {
    background: rgba(255, 201, 181, 0.25);
  }

  .key.wide {
    padding-inline: 0.6rem;
    font-size: 0.7rem;
  }

  .key.correct { background: #a8c69f; color: var(--space-black); }
  .key.present { background: #e8c97b; color: var(--space-black); }
  .key.absent { background: rgba(128, 113, 130, 0.35); color: rgba(255, 201, 181, 0.4); }

  .lost {
    color: var(--peach-fuzz);
  }

  .lost-sub {
    font-size: 0.8rem;
    color: var(--dusty-mauve);
    margin: 0.3rem 0 1rem;
  }

  .action {
    padding: 0.7rem 1.7rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--powder-blush), var(--peach-fuzz));
    color: var(--space-black);
    font-size: 0.95rem;
    font-weight: 700;
    box-shadow: 0 0 20px rgba(255, 201, 181, 0.4);
    transition: transform 0.2s;
  }

  .action:hover {
    transform: scale(1.05);
  }

  .won-title {
    font-family: var(--font-script);
    font-size: 2.2rem;
    font-weight: 400;
    color: var(--powder-blush);
    margin-bottom: 1rem;
  }

  .photo-box {
    width: min(300px, 76vw);
    aspect-ratio: 4 / 5;
    margin: 0 auto 1.1rem;
    border-radius: 16px;
    overflow: hidden;
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
    border-radius: 16px;
  }

  .ph-heart { font-size: 2rem; }
  .ph-text { color: var(--desert-sand); font-size: 0.95rem; }
  .ph-file { color: var(--dusty-mauve); font-size: 0.72rem; font-family: monospace; }

  .caption {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--peach-fuzz);
    margin-bottom: 1.4rem;
  }
</style>
