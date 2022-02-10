<script context="module">
    export async function load ({fetch}) {
        const res = await fetch('/search/getAllProducts.json');
        
        if (res.ok) {
			const result = await res.json()
            const allProducts = result.data.products;

			return {
				props: { allProducts }
			};
		}
        const { message } = await res.json();

		return {
			error: new Error(message)
		};
    };
</script>

<script>
    import GridTile from '$lib/GridTile.svelte';
    export let allProducts;
    import { search } from '../../store.js'

    $: searchedItems = allProducts.edges.filter((item) => {
        if(item.node.title.toLowerCase().includes($search.toLowerCase())) {
            return item
        }
    });
    let displayedProducts = allProducts.edges;
    $: if(searchedItems.length > 0) {
        displayedProducts = searchedItems
    }

</script>

<div>
    <ul class="grid gap-4 grid-flow-row sm:grid-cols-2 md:grid-cols-3">
        {#each displayedProducts as product, i (product.node.id)}
            <li>
                <div class="group block relative aspect-square overflow-hidden bg-zinc-800">
                    <a sveltekit:prefetch href={`/product/${product.node.handle}`}>
                        <GridTile title={product.node.title} price={product.node.priceRange.maxVariantPrice.amount} currencyCode={product.node.priceRange.maxVariantPrice.currencyCode} imageSrc={product.node.images.edges[0].node.originalSrc}/>
                    </a>
                </div>
            </li>
        {/each}
    </ul>
</div>