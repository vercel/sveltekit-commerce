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
    import ThreeItemGrid from '$lib/ThreeItemGrid.svelte';
    import Carousel from '$lib/Carousel.svelte';

    export let collections = [];
    $: clothesCollection = collections[0]?.node?.products?.edges;
    $: featuredCollection = collections[1]?.node?.products?.edges;
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<main>
    <section>
        <div class="lg:h-90">
            <ThreeItemGrid products={featuredCollection}/>
        </div>
    </section>
    <section>
        <Carousel items={clothesCollection} />
    </section>
    <section>
        <div class="flex lg:flex-row flex-col lg:items-center py-20 px-8 bg-white border border-black text-black">
            <div class="mb-4 lg:mb-0 lg:w-1/3 mr-8 flex-none font-black text-left lg:text-right text-3xl md:text-4xl lg:text-6xl">
                Dessert dragée halvah croissant.
            </div>
            <div>
                <div class="lg:text-2xl">
                    Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake.
                </div>
                <button class="hover:text-indigo-600 font-bold text-indigo-500 lg:text-2xl mt-4">
                    Read it here
                </button>
            </div>

        </div>
    </section>
</main>
