<script>
  import Icons from '$lib/Icons.svelte';

  export let title = '';
  export let removeLabels = false;
  export let imageSrc;
  export let price = '';
  export let currencyCode = '';
  let hover = false;
</script>

<div
  on:mouseenter={() => {
    hover = true;
  }}
  on:mouseleave={() => {
    hover = false;
  }}
  class="h-full w-full overflow-hidden"
>
  <button on:click class="relative flex h-full w-full items-center justify-center">
    <img
      class={`h-full transition duration-300 ease-in-out ${hover ? 'scale-110' : ''}`}
      src={imageSrc}
      alt=""
    />
    {#if !removeLabels}
      <div class="absolute top-0 left-0">
        <div class="bg-black p-3 text-2xl  font-medium">
          {title}
        </div>
        <div class="w-fit bg-black p-3 text-sm">
          ${price}
          {currencyCode}
        </div>
      </div>
      <div class={`p-3 absolute top-0 right-0 ${hover ? 'bg-transparent' : 'bg-black'}`}>
        <Icons type="heart" strokeColor={hover ? 'rgb(244 114 182)' : '#fff'} />
      </div>
    {/if}
  </button>
</div>
