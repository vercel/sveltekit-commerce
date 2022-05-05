<script>
  import '../app.css';
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  import ShoppingCart from '$lib/ShoppingCart.svelte';
  import { getCartItems } from '../store';
  import { onMount } from 'svelte';
  import {api} from '$lib/utils/api.js';
  import { updateCart, calculateCart, addItemToCart } from '$lib/utils/models.js';

  let cartId;
  let checkoutUrl;
  let cartCreatedAt;
  let cartItems = [];

  onMount(async () => {
    if (typeof window !== 'undefined') {
      cartId = JSON.parse(localStorage.getItem('cartId'));
      cartCreatedAt = JSON.parse(localStorage.getItem('cartCreatedAt'));
      checkoutUrl = JSON.parse(localStorage.getItem('cartUrl'));
      let currentDate = Date.now();
      let cartIdExpired = currentDate-cartCreatedAt > (1000*60*60*24*7);
      if (!cartId || cartIdExpired) {
        await createCart();
      }
      await loadCart();
    }
  });
  async function createCart() {
    const cartRes = await api({
      query: calculateCart,
      variables: {}
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartCreatedAt', Date.now());
      localStorage.setItem('cartId', JSON.stringify(cartRes.body?.data?.cartCreate?.cart?.id));
      localStorage.setItem('cartUrl', JSON.stringify(cartRes.body?.data?.cartCreate?.cart?.checkoutUrl));
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
    await api({
      query: addItemToCart,
      variables: {
        cartId: cartId,
        lines: [
          {
            merchandiseId: event?.detail?.body,
            quantity: 1
          }
        ]
      }
    });
    loadCart();
  }
  async function removeProduct(event) {
    await api({
      query: updateCart,
      variables: {
        cartId: cartId,
        lines: [
          {
            id: event?.detail?.body?.lineId,
            merchandiseId: event?.detail?.body?.variantId,
            quantity: event?.detail?.body?.quantity
          }
        ]
      }
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
