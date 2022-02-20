<script>
  import { cart } from '../store';
  import Icons from './Icons.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let items = [];
  if (typeof window !== 'undefined') {
    items = JSON.parse(localStorage.getItem('cart')) || [];
  }
  function addOneItem(item, i) {
    items[i] = { ...items[i], ['quantity']: item.quantity + 1 };
    updateLocalStorage();
  }
  function removeOneItem(item, i) {
    if (item.quantity <= 1) {
      removeEntireItem(item, i);
    } else {
      items[i] = { ...items[i], ['quantity']: item.quantity - 1 };
      updateLocalStorage();
    }
  }
  function removeEntireItem(item, i) {
    items = [...items.slice(0, i), ...items.slice(i + 1)];
    updateLocalStorage();
  }
  function updateLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
      cart.set(items);
    }
  }
  async function checkout() {
    let lineItems = items.map((d) => {
      return {
        quantity: d.quantity,
        merchandiseId: d.variantId
      };
    });
    dispatch('getCheckoutUrl', {
      body: lineItems
    });
  }
</script>

<div
  on:click|self
  class="absolute inset-0 z-50 flex max-h-screen w-full justify-end overflow-hidden bg-black/50"
>
  <div class="z-50 w-full bg-black p-6 md:w-1/2 lg:w-1/3">
    <div class="mb-6 flex w-full items-center justify-between">
      <div class="text-2xl font-medium">My Cart</div>
      <button on:click class="text-sm uppercase opacity-80 hover:opacity-100">close</button>
    </div>
    {#if items.length === 0}
      <div class="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <Icons type="cart" strokeColor="#000" />
        </div>
        <div class="mt-6 text-center text-2xl font-bold">Your cart is empty.</div>
      </div>
    {/if}
    <div class="overflow-y-auto" style="height: 80%;">
      {#each items as item, i (i)}
        <div class="mb-2 flex w-full">
          <img class="w-20 flex-none bg-white" src={item.image} alt={item.name} />
          <div class="ml-4 flex w-full flex-col justify-between">
            <div class="flex w-full justify-between">
              <di>
                <p class="text-lg font-medium">{item.name}</p>
                <p class="text-sm">{item.variants}</p>
              </di>
              <p class="font-medium">${item.price}</p>
            </div>
          </div>
        </div>
        <div class="mb-4 flex w-full">
          <button
            on:click={() => {
              removeEntireItem(item, i);
            }}
            class="mr-2 flex h-8 w-8 items-center justify-center border border-white/40 bg-white/0 hover:bg-white/10"
          >
            <Icons type="close" strokeColor="#fff" />
          </button>
          <div class="flex h-8 w-full border border-white/40">
            <div class="flex h-full items-center px-2 ">
              {item.quantity}
            </div>
            <button
              on:click={() => {
                removeOneItem(item, i);
              }}
              class="ml-auto flex h-8 w-8 items-center justify-center border-l border-white/40 bg-white/0 hover:bg-white/10"
            >
              <Icons type="minus" strokeColor="#fff" />
            </button>
            <button
              on:click={() => {
                addOneItem(item, i);
              }}
              class="flex h-8 w-8 items-center justify-center border-l border-white/40 bg-white/0 hover:bg-white/10"
            >
              <Icons type="plus" strokeColor="#fff" />
            </button>
          </div>
        </div>
      {/each}
    </div>
    {#if items.length !== 0}
      <button
        on:click={checkout}
        class="mt-6 w-full bg-white p-3 text-sm font-medium uppercase text-black opacity-90 hover:opacity-100"
        >Proceed to Checkout</button
      >
    {/if}
  </div>
</div>
