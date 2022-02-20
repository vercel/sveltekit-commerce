<script>
    import { cart } from '../store'; 
    import { api } from "../routes/_shopifyApi.js";
    import Icons from './Icons.svelte';
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    export let loading = false;
    export let items = [];

    function addOneItem(item, i) {
        dispatch('addProduct', {
			body: item.node.merchandise.id
		});
    };

    function removeOneItem(item, i) {
        let quantity = item.node.quantity - 1;
        dispatch('removeProduct', {
			body: {
                variantId: item.node.merchandise.id,
                quantity: quantity,
                lineId: item.node.id
            }
		});
    };

    function removeEntireItem(item, i) {
        dispatch('removeProduct', {
			body: {
                variantId: item.node.merchandise.id,
                quantity: 0,
                lineId: item.node.id
            }
		});
    };

    async function checkout() {
        loading = true;
        let lineItems = items.map((d) => {
            return {
                quantity: d.quantity,
                merchandiseId: d.variantId
            }
        });
        dispatch('getCheckoutUrl', {
			body: lineItems
		});
    }
</script>
<div on:click|self class="z-50 max-h-screen overflow-hidden flex justify-end w-full absolute inset-0 bg-black/50 z-50">
    <div class="lg:w-1/3 md:w-1/2 w-full bg-black z-50 p-6">
        <div class="mb-6 w-full flex items-center justify-between">
            <div class="text-2xl font-medium">My Cart</div>
            <button on:click class="text-sm uppercase opacity-80 hover:opacity-100">close</button>
        </div>
        {#if items.length === 0}
            <div class="mt-20 w-full flex flex-col items-center justify-center overflow-hidden">
                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <Icons type="cart" strokeColor="#000" />
                </div>
                <div class="mt-6 text-center font-bold text-2xl text-center">Your cart is empty.</div>
            </div>
        {/if}
        <div class="overflow-y-auto" style="height: 80%;">
            {#each items as item, i (i)}
            <div class="w-full flex mb-2">
                <img class="bg-white flex-none w-20" src={item.node.merchandise.product.images.edges[0].node.originalSrc} />
                <div class="flex flex-col justify-between ml-4 w-full">
                    <div class="w-full flex justify-between">
                        <di>
                            <p class="font-medium text-lg">{item.node.merchandise.product.title}</p>
                            <p class="text-sm">{item.node.merchandise.title}</p>
                        </di>
                        <p class="font-medium">${item.node.estimatedCost.totalAmount.amount}</p>
                    </div>
                </div>
            </div>
            <div class="flex w-full mb-4">
                <button on:click={() => {removeEntireItem(item, i)}} class="mr-2 h-8 w-8 flex items-center justify-center border border-white/40 bg-white/0 hover:bg-white/10">
                    <Icons type="close" strokeColor="#fff" />
                </button>
                <div class="flex w-full h-8 border border-white/40">
                    <div class="px-2 h-full flex items-center ">
                        {item.node.quantity}
                    </div>
                    <button on:click={() => {removeOneItem(item, i)}} class="ml-auto h-8 w-8 flex items-center justify-center border-l border-white/40 bg-white/0 hover:bg-white/10">
                        <Icons type="minus" strokeColor="#fff" />
                    </button>
                    <button on:click={() => {addOneItem(item, i)}} class="h-8 w-8 flex items-center justify-center border-l border-white/40 bg-white/0 hover:bg-white/10">
                        <Icons type="plus" strokeColor="#fff" />
                    </button>
                </div>
            </div>
        {/each}
        </div>
        {#if items.length !== 0}
            <button on:click={checkout} class="flex items-center justify-center uppercase text-sm mt-6 font-medium opacity-90 hover:opacity-100 w-full text-black p-3 bg-white">
                <span>Procede to Checkout</span>
                {#if loading}
                    <div class="ml-4 lds-ring"><div></div><div></div><div></div><div></div></div>
                {/if}
            </button>
        {/if}
    </div>
</div>

<style>
    .lds-ring {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    }
    .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 2px;
    border: 2px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
    }
    @keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
</style>