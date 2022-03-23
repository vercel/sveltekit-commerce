<script>
  import '../app.css';
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  import ShoppingCart from '$lib/ShoppingCart.svelte';
  import { getCartItems } from '../store';
  import { onMount } from 'svelte';

  let cartId;
  let checkoutUrl;
  let cartItems = [];

  onMount(async () => {
    if (typeof window !== 'undefined') {
      cartId = JSON.parse(localStorage.getItem('cartId'));
      checkoutUrl = JSON.parse(localStorage.getItem('cartUrl'));
      if (!cartId) {
        await createCart();
      }
      await loadCart();
    }
  });
  async function createCart() {
    const cartRes = await fetch('/createCart.json', {
      method: 'POST'
    });
    const cart = await cartRes.json();
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartId', JSON.stringify(cart?.data?.cartCreate?.cart?.id));
      localStorage.setItem('cartUrl', JSON.stringify(cart?.data?.cartCreate?.cart?.checkoutUrl));
    }
  }
  async function loadCart() {
    const res = await getCartItems();
    cartItems = res?.body?.data?.cart?.lines?.edges;
  }

  let showCart = false;
  let loading = false;
  function openCart() {
    loadCart();
    showCart = true;
  }
  function hideCart() {
    showCart = false;
  }

  function getCheckoutUrl() {
    window.open(checkoutUrl, '_blank');
    loading = false;
  }

  async function addToCart(event) {
    await fetch('/addToCart.json', {
      method: 'POST',
      body: JSON.stringify({ cartId: cartId, variantId: event.detail.body })
    });
    loadCart();
  }
  async function removeProduct(event) {
    console.log(event);
    let variantId = event.detail.body.variantId;
    let quantity = event.detail.body.quantity;
    let lineId = event.detail.body.lineId;
    await fetch('/updateCart.json', {
      method: 'POST',
      body: JSON.stringify({
        cartId: cartId,
        variantId: variantId,
        quantity: quantity,
        lineId: lineId
      })
    });
    loadCart();
  }
</script>

<main class={`${showCart ? 'h-screen' : 'min-h-screen'} text-white overflow-hidden`}>
  {#if showCart}
    <ShoppingCart
      items={cartItems}
      on:click={hideCart}
      on:removeProduct={removeProduct}
      on:addProduct={addToCart}
      on:getCheckoutUrl={getCheckoutUrl}
      bind:loading
    />
  {/if}
  <Header on:openCart={openCart} />
  <div class="min-h-screen overflow-scroll">
    <slot />
    <Footer />
  </div>
</main>
