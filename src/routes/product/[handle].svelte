<script context="module">
  export async function load({ params, fetch }) {
    const res = await fetch(`/product/getProduct-${params.handle}.json`);

    if (res.ok) {
      const result = await res.json();
      const product = result.data.productByHandle;

      return {
        props: { product }
      };
    }
    const { message } = await res.json();

    return {
      error: new Error(message)
    };
  }
</script>

<script>
  import GridTile from '$lib/GridTile.svelte';
  import { getCartItems } from '../../store.js';
  export let product;

  let highlightedImageSrc = product?.images?.edges[0]?.node?.originalSrc;
  let selectedOptions = {};

  product?.options.forEach((option) => {
    selectedOptions = { ...selectedOptions, [option.name]: option.values[0] };
  });

  async function addToCart() {
    let variantId;
    let cartId;
    if (typeof window !== 'undefined') {
      cartId = JSON.parse(localStorage.getItem('cartId'));
    }
    product.variants.edges.forEach((variant) => {
      let result = variant.node.selectedOptions.every((option) => {
        return selectedOptions[option.name] === option.value;
      });
      if (result) {
        variantId = variant.node.id;
      }
    });
    await fetch('/addToCart.json', {
      method: 'POST',
      body: JSON.stringify({ cartId: cartId, variantId: variantId })
    });
    await getCartItems();
  }
</script>

<div>
  {#if product}
    <div class="flex min-h-screen flex-col md:flex-row">
      <div class="h-full md:w-2/3">
        {#key highlightedImageSrc}
          <div class="h-4/5 bg-violet-700">
            <GridTile
              title={product.title}
              price={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              imageSrc={highlightedImageSrc}
            />
          </div>
        {/key}
        <div class="flex h-1/5 bg-violet-900">
          {#each product.images.edges as variant}
            <div class="h-full w-1/4 bg-white">
              <GridTile
                on:click={() => {
                  highlightedImageSrc = variant.node.originalSrc;
                }}
                imageSrc={variant.node.originalSrc}
                removeLabels={true}
              />
            </div>
          {/each}
        </div>
      </div>
      <div class="h-full p-6 md:w-1/3">
        {#each product.options as option}
          <div class="mb-8">
            <div class="mb-4 text-sm uppercase tracking-wide">{option.name}</div>
            <div class="flex">
              {#each option.values as value}
                <button
                  on:click={() => {
                    selectedOptions = { ...selectedOptions, [option.name]: value };
                  }}
                  class={`${value.length <= 3 ? 'w-12' : 'px-2'} ${
                    selectedOptions[option.name] === value ? 'opacity-100' : 'opacity-60'
                  } transition duration-300 ease-in-out hover:scale-110 hover:opacity-100 border-white h-12 mr-3 flex items-center justify-center rounded-full border`}
                >
                  {value}
                </button>
              {/each}
            </div>
          </div>
        {/each}
        <p>{product.description}</p>
        <button
          on:click={addToCart}
          class="mt-12 w-full bg-white p-4 text-sm uppercase tracking-wide text-black opacity-90 hover:opacity-100"
        >
          Add To Cart
        </button>
      </div>
    </div>
  {/if}
</div>
