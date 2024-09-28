<script>
  /** @type {string} */
  export let title = '';
  /** @type {boolean} */
  export let removeLabels = false;
  /** @type {string} */
  export let imageSrc;
  /** @type {string} */
  export let price = '';
  /** @type {string} */
  export let currencyCode = '';
  /** @type {string} */
  export let href = '';
  /** @type {string} */
  export let priority = 'lazy';

  let hover = false;

  function handleMouseEnter() {
    hover = true;
  }

  function handleMouseLeave() {
    hover = false;
  }
</script>

<div
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="h-full w-full overflow-hidden"
  role="img"
  aria-label={title}
>
  <a
    data-test="grid-tile"
    {href}
    data-sveltekit-prefetch
    class="focus:border-blue-500 focus:border-2 relative flex h-full w-full items-center justify-center"
  >
    <img
      alt={title}
      class={`w-full md:w-1/2 lg:w-full flex-none transition duration-300 ease-in-out ${
        hover ? 'scale-110' : ''
      }`}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      src={imageSrc}
    />
    {#if !removeLabels}
      <div class="absolute top-0 left-0">
        <div class="bg-black p-3 text-2xl font-medium">
          {title}
        </div>
        <div class="w-fit bg-black p-3 text-sm">
          ${price}
          {currencyCode}
        </div>
      </div>
    {/if}
  </a>
</div>
