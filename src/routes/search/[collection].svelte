<script context="module">
    export async function load ({fetch}) {
        const res = await fetch('/getAllCollections.json');
        if (res.ok) {
			const result = await res.json()
            const collections = result.data.collections.edges;

			return {
				props: { collections }
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
    import { page } from '$app/stores';
    export let collections = [];
    let collection;
    $: collections.forEach((d) => {
        if(d.node.handle === $page?.params?.collection) {
            collection = d.node
        }
    })
    console.log(collection)
</script>

<div>
    {#if collection}
        <ul class="grid gap-4 grid-flow-row sm:grid-cols-2 md:grid-cols-3">
            {#each collection.products.edges as product, i (i)}
                <li>
                    <div class="group block relative aspect-square overflow-hidden bg-zinc-800">
                        <a sveltekit:prefetch href={`/product/${product.node.handle}`}>
                            <GridTile title={product.node.title} price={product.node.priceRange.maxVariantPrice.amount} currencyCode={product.node.priceRange.maxVariantPrice.currencyCode} imageSrc={product.node.images.edges[0].node.originalSrc}/>
                        </a>
                    </div>
                </li>
            {/each}
        </ul>
    {:else}
        <div>There are no products in this collection.</div>
    {/if}
    
</div>