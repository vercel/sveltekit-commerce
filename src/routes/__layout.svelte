<script>
    import '../app.css';
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import ShoppingCart from '$lib/ShoppingCart.svelte';
    import { cart } from '../store.js';
    let showCart = false;
    function hideCart() {
        showCart = false
    }
    // $: {
    //     console.log($cart)
    //     showCart = true;
    // }
</script>

<main class={`${showCart ? 'h-screen' : 'min-h-screen'} text-white overflow-hidden`}>
    {#if showCart}
        <ShoppingCart on:click={hideCart} />
    {/if}
    <Header on:click={() => {showCart = !showCart}}/>
        <div class="min-h-screen overflow-scroll">
            <slot></slot>
            <Footer />

        </div>
</main>