<script context="module">
  import {api} from '$lib/utils/api.js';
  import { getCollections } from '$lib/utils/models.js';

  export async function load() {
    const response = await api({
      query: getCollections
    });
    const collections = response?.body?.data?.collections?.edges;
    return {
      props: { collections }
    };
  }
</script>

<script>
  import GridTile from '$lib/GridTile.svelte';
  import { page } from '$app/stores';
  export let collections = [];
  let collection;
  $: collections.forEach((d) => {
    if (d.node.handle === $page?.params?.collection) {
      collection = d.node;
    }
  });
  
</script>

<svelte:head>
  <title>{collection?.handle} collection</title>
</svelte:head>

<div>
  {#if collection}
    <ul class="grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3">
      {#each collection.products.edges as product, i (i)}
        <li>
          <div class="group relative block aspect-square overflow-hidden bg-zinc-800">
            <GridTile
                title={product.node.title}
                href={`/product/${product.node.handle}`}
                price={product.node.priceRange.maxVariantPrice.amount}
                currencyCode={product.node.priceRange.maxVariantPrice.currencyCode}
                imageSrc={product.node.images.edges[0].node.originalSrc}
              />
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <div>There are no products in this collection.</div>
  {/if}
</div>
