<script>
  import { onMount } from 'svelte';

  let { photo, target = 100, onWin, onBack } = $props();

  const W = 360;
  const H = 520;
  const BIRD_X = 84;
  const BIRD_R = 17;
  const PIPE_W = 60;
  const GAP = 168;
  const SPEED = 2.5;
  const GRAVITY = 0.42;
  const FLAP = -7.2;
  const SPACING = 215; // horizontal distance between pipes

  let canvas;
  let score = $state(0);
  let best = $state(0);
  let phase = $state('ready'); // ready | playing | dead | won

  let birdY, birdVel, pipes, raf;
  let img = null;
  let imgOk = false;

  const stars = Array.from({ length: 26 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: 0.5 + Math.random() * 1.2,
  }));

  function reset() {
    birdY = H / 2;
    birdVel = 0;
    pipes = [];
    score = 0;
  }

  function spawnPipe(x) {
    const margin = 70;
    const gapY = margin + Math.random() * (H - margin * 2 - GAP);
    pipes.push({ x, gapY, passed: false });
  }

  function flap() {
    if (phase === 'won') return;
    if (phase === 'ready') {
      phase = 'playing';
      spawnPipe(W + 40);
    }
    if (phase === 'dead') return;
    birdVel = FLAP;
  }

  function die() {
    phase = 'dead';
    if (score > best) best = score;
  }

  function restart() {
    reset();
    phase = 'ready';
  }

  function step() {
    if (phase === 'playing') {
      birdVel += GRAVITY;
      birdY += birdVel;

      if (birdY + BIRD_R > H || birdY - BIRD_R < 0) die();

      const last = pipes[pipes.length - 1];
      if (last && last.x < W - SPACING) spawnPipe(W + 40);

      for (const p of pipes) {
        p.x -= SPEED;
        // collision
        if (
          BIRD_X + BIRD_R > p.x &&
          BIRD_X - BIRD_R < p.x + PIPE_W &&
          (birdY - BIRD_R < p.gapY || birdY + BIRD_R > p.gapY + GAP)
        ) {
          die();
        }
        if (!p.passed && p.x + PIPE_W < BIRD_X - BIRD_R) {
          p.passed = true;
          score++;
          if (score >= target) {
            phase = 'won';
            if (score > best) best = score;
          }
        }
      }
      pipes = pipes.filter((p) => p.x > -PIPE_W - 10);
    }

    draw();
    raf = requestAnimationFrame(step);
  }

  function draw() {
    const ctx = canvas.getContext('2d');

    // space background
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0a0c0d');
    bg.addColorStop(1, '#241a1c');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // pipes — rose stems with a blush cap
    for (const p of pipes ?? []) {
      ctx.fillStyle = '#ffc9b5';
      ctx.strokeStyle = '#f7b1ab';
      ctx.lineWidth = 2.5;
      roundRect(ctx, p.x, -8, PIPE_W, p.gapY + 8, 8);
      roundRect(ctx, p.x, p.gapY + GAP, PIPE_W, H - p.gapY - GAP + 8, 8);
      // caps
      ctx.fillStyle = '#f7b1ab';
      roundRect(ctx, p.x - 4, p.gapY - 16, PIPE_W + 8, 16, 6);
      roundRect(ctx, p.x - 4, p.gapY + GAP, PIPE_W + 8, 16, 6);
    }

    // the bird 💗
    ctx.save();
    ctx.translate(BIRD_X, birdY ?? H / 2);
    ctx.rotate(Math.max(-0.4, Math.min(0.6, (birdVel ?? 0) * 0.05)));
    if (imgOk) {
      ctx.beginPath();
      ctx.arc(0, 0, BIRD_R, 0, Math.PI * 2);
      ctx.closePath();
      ctx.strokeStyle = '#ffc9b5';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.clip();
      ctx.drawImage(img, -BIRD_R, -BIRD_R, BIRD_R * 2, BIRD_R * 2);
    } else {
      ctx.font = `${BIRD_R * 2}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💗', 0, 2);
    }
    ctx.restore();

    // score
    ctx.fillStyle = '#ffc9b5';
    ctx.font = '700 30px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(`${score} / ${target}`, W / 2, 16);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
    ctx.stroke();
  }

  function onKeydown(e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      flap();
    }
  }

  onMount(() => {
    reset();
    img = new Image();
    img.onload = () => (imgOk = true);
    img.src = photo;
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  });
</script>

<svelte:window onkeydown={onKeydown} />

<div class="flappy">
  <h3 class="title">Flappy Mariah 🐦💗</h3>
  <p class="goal">get {target} points and the gifts are yours... good luck lol</p>

  <div class="stage">
    <canvas
      bind:this={canvas}
      width={W}
      height={H}
      onpointerdown={flap}
    ></canvas>

    {#if phase === 'ready'}
      <div class="overlay">
        <p class="big">tap or press space to fly</p>
      </div>
    {:else if phase === 'dead'}
      <div class="overlay">
        <p class="big">oops 😭</p>
        <p class="mid">score: {score} &nbsp;·&nbsp; best: {best}</p>
        <p class="small">only {target} needed... you got this 💪</p>
        <button class="btn" onclick={restart}>try again</button>
      </div>
    {:else if phase === 'won'}
      <div class="overlay won">
        <p class="big">{target}?!! SHE DID IT 😭💗</p>
        <p class="mid">okay okay... you earned these fair and square</p>
        <button class="btn" onclick={onWin}>open the gifts 🎁</button>
      </div>
    {/if}
  </div>

  <button class="back" onclick={onBack}>← nevermind, I'll type the password</button>
</div>

<style>
  .flappy {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }

  .title {
    font-family: var(--font-script);
    font-size: 1.9rem;
    font-weight: 400;
    color: var(--powder-blush);
  }

  .goal {
    font-size: 0.85rem;
    color: var(--dusty-mauve);
  }

  .stage {
    position: relative;
    width: min(340px, 84vw);
  }

  canvas {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 18px;
    border: 1.5px solid var(--powder-blush);
    touch-action: none;
    cursor: pointer;
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background: rgba(10, 12, 13, 0.55);
    border-radius: 18px;
    pointer-events: none;
    text-align: center;
    padding: 1rem;
  }

  .overlay button {
    pointer-events: auto;
  }

  .overlay.won {
    background: rgba(10, 12, 13, 0.75);
  }

  .big {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--peach-fuzz);
  }

  .mid {
    font-size: 0.95rem;
    color: var(--ash-grey);
  }

  .small {
    font-size: 0.8rem;
    color: var(--dusty-mauve);
  }

  .btn {
    padding: 0.65rem 1.6rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--powder-blush), var(--peach-fuzz));
    color: var(--space-black);
    font-size: 0.95rem;
    font-weight: 700;
    transition: transform 0.2s;
  }

  .btn:hover {
    transform: scale(1.05);
  }

  .back {
    font-size: 0.82rem;
    color: var(--dusty-mauve);
    text-decoration: underline;
  }

  .back:hover {
    color: var(--peach-fuzz);
  }
</style>
