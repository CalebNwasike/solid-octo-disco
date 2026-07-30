<script>
  import { onMount } from 'svelte';
  import IntroPage from './lib/IntroPage.svelte';
  import WarpTransition from './lib/WarpTransition.svelte';
  import Universe from './lib/Universe.svelte';
  import { initUISounds } from './lib/sfx.js';

  // the journey: intro (breather + password) → warp → universe
  let stage = $state('intro');

  // nintendo-style hover/click sounds on every button
  onMount(() => initUISounds());
</script>

{#if stage === 'intro'}
  <IntroPage onProceed={() => (stage = 'warp')} />
{:else if stage === 'warp'}
  <WarpTransition onDone={() => (stage = 'universe')} />
{:else}
  <Universe />
{/if}
