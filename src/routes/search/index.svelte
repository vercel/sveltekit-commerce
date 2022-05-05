<script context="module">
  import {api} from '$lib/utils/api.js';
  import {getAllProducts} from '$lib/utils/models.js';

  export async function load() {
    const response = await api({
      query: getAllProducts
    });
    const allProducts = response?.body?.data?.products?.edges;
    return {
      props: { allProducts }
    };
  }
</script>

<script>
  import GridTile from '$lib/GridTile.svelte';
  export let allProducts;
  import { search } from '../../store.js';
  
  $: searchedItems = allProducts?.filter((item) => {
    if (item.node.title.toLowerCase().includes($search.toLowerCase())) {
      return item;
    }
  });
  let displayedProducts = allProducts.edges;
  $: if (searchedItems.length > 0) {
    displayedProducts = searchedItems;
  }
</script>

<div>
  <ul class="grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3">
    {#each displayedProducts as product, i (product.node.id)}
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
</div>
