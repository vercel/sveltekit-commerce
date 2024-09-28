<script>
  import Icons from '$components/Icons.svelte';
  import { fade } from 'svelte/transition';

  /** @type {{title: any, description: any}} */
  let { title, description } = $props();

  let toggle = $state(false);
</script>

<button
  onclick={() => {
    toggle = !toggle;
  }}
  class="flex w-full border-b border-white/50 py-4 text-sm "
>
  <div class={`opacity-50 h-6 w-6 rotate ${toggle ? 'down' : ''}`}>
    <Icons type="caretRight" strokeColor="#fff" />
  </div>
  <div class="ml-4">
    <div class="mb-2">{title}</div>
    {#if toggle}
      <div transition:fade|global={{ duration: 300 }}>{description}</div>
    {/if}
  </div>
</button>

<style>
  .rotate {
    -moz-transition: all 0.3s linear;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
  }

  .rotate.down {
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
</style>
