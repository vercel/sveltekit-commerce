<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/getAllCollections.json');
    if (res.ok) {
      const result = await res.json();
      const collections = result.data.collections.edges;

      return {
        props: { collections }
      };
    }
    const { message } = await res.json();

    return {
      error: new Error(message)
    };
  }
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
    <div class="lg:h-[90vh]">
      <ThreeItemGrid products={featuredCollection} />
    </div>
  </section>
  <section>
    <Carousel items={clothesCollection} />
  </section>
  <section>
    <div
      class="flex flex-col border border-black bg-white py-20 px-8 text-black lg:flex-row lg:items-center"
    >
      <div
        class="mb-4 mr-8 flex-none text-left text-3xl font-black md:text-4xl lg:mb-0 lg:w-1/3 lg:text-right lg:text-6xl"
      >
        Dessert dragée halvah croissant.
      </div>
      <div>
        <div class="lg:text-2xl">
          Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon
          bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans.
          Tiramisu sweet roll cheesecake pie carrot cake.
        </div>
        <button class="mt-4 font-bold text-indigo-500 hover:text-indigo-600 lg:text-2xl">
          Read it here
        </button>
      </div>
    </div>
  </section>
</main>
