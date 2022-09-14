<script>
  import GridTile from '$components/GridTile.svelte';
  import { page } from '$app/stores';

  /** @type {import('./$types').PageData} */
  export let data;
  $: search = $page.url.searchParams.get('q');

  $: displayedProducts = search
    ? data.body.allProducts.edges.filter((item) => {
        return item.node.title.toLowerCase().includes(search.toLowerCase());
      })
    : data.body.allProducts.edges;
</script>

<div>
  <ul class="grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3">
    {#each displayedProducts as product, i (product.node.id)}
      <li>
        <div class="group relative block aspect-square overflow-hidden bg-dark">
          <GridTile
            title={product.node.title}
            href={`/product/${product.node.handle}`}
            price={product.node.priceRange.maxVariantPrice.amount}
            currencyCode={product.node.priceRange.maxVariantPrice.currencyCode}
            imageSrc={product.node.images.edges[0].node.originalSrc}
          />
        </div>
      </li>
    {:else}
      <p>No products :(</p>
    {/each}
  </ul>
</div>
