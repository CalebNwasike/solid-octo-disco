<script>
  import IntroPage from './lib/IntroPage.svelte';
  import WarpTransition from './lib/WarpTransition.svelte';
  import Universe from './lib/Universe.svelte';

  // the journey: intro (breather + password) → warp → universe
  let stage = $state('intro');
</script>

{#if stage === 'intro'}
  <IntroPage onProceed={() => (stage = 'warp')} />
{:else if stage === 'warp'}
  <WarpTransition onDone={() => (stage = 'universe')} />
{:else}
  <Universe />
{/if}
