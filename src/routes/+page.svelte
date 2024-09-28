<script>
  import ThreeItemGrid from '$components/ThreeItemGrid.svelte';
  import Carousel from '$components/Carousel.svelte';

  
  /** @type {{data: import('./$types').PageData}} */
  let { data } = $props();

  let clothesCollection = $derived(data.products[0]?.node?.products?.edges);
  let featuredCollection = $derived(data.products[1]?.node?.products?.edges);
</script>

<svelte:head>
  <title>Home – SvelteKit Commerce</title>
</svelte:head>

<main>
  <section>
    <div class="lg:h-[90vh]">
      <ThreeItemGrid products={featuredCollection} />
    </div>
  </section>
  <section>
    <Carousel items={clothesCollection} />
  </section>
  <section>
    <div
      class="flex flex-col px-8 py-20 text-white border border-black bg-dark lg:flex-row lg:items-center"
    >
      <div
        class="flex-none mb-4 mr-8 text-3xl font-black text-left md:text-4xl lg:mb-0 lg:w-1/3 lg:text-right lg:text-6xl"
      >
        Dessert dragée halvah croissant.
      </div>
      <div>
        <div class="lg:text-2xl">
          Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon
          bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans.
          Tiramisu sweet roll cheesecake pie carrot cake.
        </div>
        <button class="mt-4 font-bold text-svelteOrange hover:text-svelteDark lg:text-2xl">
          Read it here
        </button>
      </div>
    </div>
  </section>
</main>
