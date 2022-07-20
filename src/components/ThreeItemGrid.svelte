<script>
  import GridTile from '$components/GridTile.svelte';

  export let products;
</script>

<div class="flex flex-col lg:h-full lg:flex-row">
  <div class="h-[60vh] w-full bg-dark lg:h-full lg:w-2/3">
    <GridTile
      priority="eager"
      href={`/product/${products[0].node.handle}`}
      title={products[0].node.title}
      price={products[0].node.priceRange.maxVariantPrice.amount}
      currencyCode={products[0].node.priceRange.maxVariantPrice.currencyCode}
      imageSrc={products[0].node.images.edges[0].node.originalSrc}
    />
  </div>
  <div class="w-full lg:h-full lg:w-1/3">
    <div class="h-[60vh] w-full bg-light lg:h-1/2">
      <GridTile
        priority="eager"
        href={`/product/${products[1].node.handle}`}
        title={products[1].node.title}
        price={products[1].node.priceRange.maxVariantPrice.amount}
        currencyCode={products[1].node.priceRange.maxVariantPrice.currencyCode}
        imageSrc={products[1].node.images.edges[0].node.originalSrc}
      />
    </div>
    <div class="h-[60vh] w-full bg-svelteOrange lg:h-1/2">
      <GridTile
        priority="eager"
        href={`/product/${products[2].node.handle}`}
        title={products[2].node.title}
        price={products[2].node.priceRange.maxVariantPrice.amount}
        currencyCode={products[2].node.priceRange.maxVariantPrice.currencyCode}
        imageSrc={products[2].node.images.edges[0].node.originalSrc}
      />
    </div>
  </div>
</div>
