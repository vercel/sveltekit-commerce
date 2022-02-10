<script>
    import '../app.css';
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import ShoppingCart from '$lib/ShoppingCart.svelte';
    
    let showCart = false;
    function hideCart() {
        showCart = false
    };

    async function getCheckoutUrl(event) {
        let lineItems = event.detail.body;
        const res =  await fetch('/getCheckoutUrl.json', {
            method: 'POST',
            body: JSON.stringify({data: lineItems})
        });
        const checkoutUrl = await res.json();
        window.open(checkoutUrl.data.cartCreate.cart.checkoutUrl , "_blank");
    };

</script>

<main class={`${showCart ? 'h-screen' : 'min-h-screen'} text-white overflow-hidden`}>
    {#if showCart}
        <ShoppingCart on:click={hideCart} on:getCheckoutUrl={getCheckoutUrl} />
    {/if}
    <Header on:click={() => {showCart = !showCart}}/>
    <div class="min-h-screen overflow-scroll">
        <slot></slot>
        <Footer />
    </div>
</main>