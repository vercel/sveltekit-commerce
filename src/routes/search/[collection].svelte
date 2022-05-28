<script>
  import GridTile from '$components/GridTile.svelte';
  import { page } from '$app/stores';

  export let collections = [];
  let collection;

  $: collections.forEach((d) => {
    if (d.node.handle === $page?.params?.collection) {
      collection = d.node;
    }
  });
</script>

<div>
  {#if collection}
    <ul class="grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3">
      {#each collection.products.edges as product, i (i)}
        <li>
          <div class="group relative block aspect-square overflow-hidden bg-zinc-800">
            <a sveltekit:prefetch href={`/product/${product.node.handle}`}>
              <GridTile
                title={product.node.title}
                price={product.node.priceRange.maxVariantPrice.amount}
                currencyCode={product.node.priceRange.maxVariantPrice.currencyCode}
                imageSrc={product.node.images.edges[0].node.originalSrc}
              />
            </a>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <div>There are no products in this collection.</div>
  {/if}
</div>
