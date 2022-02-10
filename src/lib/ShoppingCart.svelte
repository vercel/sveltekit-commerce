<script>
    import { cart } from '../store'; 
    import { api } from "../routes/_shopifyApi.js";
    import Icons from './Icons.svelte';
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    let items = [];
    if(typeof window !== 'undefined') {
        items = JSON.parse(localStorage.getItem('cart')) || [];
    };
    function addOneItem(item, i) {
        items[i] = {...items[i], ['quantity']: item.quantity+1};
        updateLocalStorage();
    };
    function removeOneItem(item, i) {
        if(item.quantity <= 1) {
            removeEntireItem(item, i)
        } else {
            items[i] = {...items[i], ['quantity']: item.quantity-1};
            updateLocalStorage();
        }
    };
    function removeEntireItem(item, i) {
        items = [...items.slice(0, i), ...items.slice(i + 1)];
        updateLocalStorage();
    };
    function updateLocalStorage() {
        if(typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(items))
            cart.set(items);
        }
    };
    async function checkout() {
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
<div on:click|self class="max-h-screen overflow-hidden flex justify-end w-full absolute inset-0 bg-black/50 z-50">
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
                <img class="bg-white flex-none w-20" src={item.image} />
                <div class="flex flex-col justify-between ml-4 w-full">
                    <div class="w-full flex justify-between">
                        <di>
                            <p class="font-medium text-lg">{item.name}</p>
                            <p class="text-sm">{item.variants}</p>
                        </di>
                        <p class="font-medium">${item.price}</p>
                    </div>
                </div>
            </div>
            <div class="flex w-full mb-4">
                <button on:click={() => {removeEntireItem(item, i)}} class="mr-2 h-8 w-8 flex items-center justify-center border border-white/40 bg-white/0 hover:bg-white/10">
                    <Icons type="close" strokeColor="#fff" />
                </button>
                <div class="flex w-full h-8 border border-white/40">
                    <div class="px-2 h-full flex items-center ">
                        {item.quantity}
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
            <button on:click={checkout} class="uppercase text-sm mt-6 font-medium opacity-90 hover:opacity-100 w-full text-black p-3 bg-white">Procede to Checkout</button>
        {/if}
    </div>
</div>