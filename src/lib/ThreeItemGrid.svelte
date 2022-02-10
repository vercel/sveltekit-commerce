<script>
  import GridTile from '$lib/GridTile.svelte';
  import { goto } from '$app/navigation';

  export let products;
</script>

<div class="flex lg:flex-row flex-col lg:h-full">
  <div class="lg:w-2/3 w-full lg:h-full h-60 bg-violet-700">
    <GridTile on:click={() => {goto(`/product/${products[0].node.handle}`)}} title={products[0].node.title} price={products[0].node.priceRange.maxVariantPrice.amount} currencyCode={products[0].node.priceRange.maxVariantPrice.currencyCode} imageSrc={products[0].node.images.edges[0].node.originalSrc} />
  </div>
  <div class="lg:h-full w-full lg:w-1/3">
    <div class="lg:h-1/2 h-60 w-full bg-white">
      <GridTile on:click={() => {goto(`/product/${products[1].node.handle}`)}} title={products[1].node.title} price={products[1].node.priceRange.maxVariantPrice.amount} currencyCode={products[1].node.priceRange.maxVariantPrice.currencyCode}  imageSrc={products[1].node.images.edges[0].node.originalSrc} />
    </div>
    <div class="lg:h-1/2 h-60 w-full bg-pink-600">
      <GridTile on:click={() => {goto(`/product/${products[2].node.handle}`)}} title={products[2].node.title} price={products[2].node.priceRange.maxVariantPrice.amount} currencyCode={products[2].node.priceRange.maxVariantPrice.currencyCode}  imageSrc={products[2].node.images.edges[0].node.originalSrc} />
    </div>
  </div>
</div>