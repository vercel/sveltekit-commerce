<script>
    import '../app.css';
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import ShoppingCart from '$lib/ShoppingCart.svelte';

    let showCart = false;
    function hideCart() {
        showCart = false;
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

    let cartId;
    if(typeof window !== 'undefined') {
        cartId = JSON.parse(localStorage.getItem('cartId')) || '';
    };
    let cartProducts;
    async function openCart() {
        const response = await fetch('/getCartProducts.json', {
                method: 'POST',
                body: JSON.stringify({ cartId: cartId})
        });
        cartProducts = await response.json();
        console.log(cartProducts)
        showCart = true;
    };
    async function addToCart(event) {
        console.log(event.detail.body)
 
        await fetch('/product/addToCart.json', {
            method: 'POST',
            body: JSON.stringify({ cartId: cartId, variantId: event.detail.body })
        });
    };

</script>

<main class={`${showCart ? 'h-screen' : 'min-h-screen'} text-white overflow-hidden`}>
    {#if showCart}
        <ShoppingCart on:click={hideCart} on:getCheckoutUrl={getCheckoutUrl} on:addItemToCart={addToCart} cart={cartProducts?.data?.cart} />
    {/if}
    <Header on:click={openCart}/>
    <div class="min-h-screen overflow-scroll">
        <slot></slot>
        <Footer />
    </div>
</main>