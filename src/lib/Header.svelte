<script>
    import { page } from '$app/stores';
    import Icons from "$lib/Icons.svelte";
    import { cartQuantity } from '../store'; 
    import SearchBar from "$lib/SearchBar.svelte";
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    $: currentRoute = $page.url.pathname;

    let numberOfItemsInBasket = 0;
    let showMenu = false;

    let tabs = [
        {name: 'All', path: '/search'},
        {name: 'Featured', path: '/search/featured'},
        {name: 'Apparel', path: '/search/clothes'},
    ];
    function openCart() {
        showMenu = false;
        dispatch('openCart', true);
    };
</script>

<nav class="p-4 lg:px-6 border-b border-zinc-700 flex items-center justify-between">
    <div class="flex items-center">
        <div class="mr-4" sveltekit:prefetch class:active={currentRoute === '/'}>
            <a href="/" sveltekit:prefetch class="">
                <picture>
                    <source srcset="/svelte_logo.png" type="image/png" />
                    <img src="/svelte_logo.png" alt="Svelte Logo" class="h-8"/>
                </picture>
            </a>
        </div>
        <div class="hidden lg:flex">
            {#each tabs as tab, i (tab.name)}
                <div class:active={currentRoute === tab.path}>
                    <a sveltekit:prefetch href={tab.path} class={`hover:opacity-100 px-2 py-1 text-white rounded-lg ${currentRoute === tab.path ? 'opacity-100' : 'opacity-75'}`}>{tab.name}</a>
                </div>
            {/each}
        </div>
    </div>
    <div class="hidden lg:block w-1/2">
        <SearchBar />
    </div>
    <div class="flex items-center">
        <button on:click={openCart} class="relative mr-4">
            <Icons strokeColor="#fff" type="cart" />
            <div class="text-black text-xs absolute bottom-0 left-0 h-4 w-4 rounded-full -ml-2 -mb-2 border border-black flex items-center justify-center bg-white">
                {$cartQuantity}
            </div>
        </button>
        <button on:click={() => {showMenu = true}} class="lg:hidden">
            <Icons type="menu" />
        </button>
    </div>
    {#if showMenu}
    <div on:click|self={() => {showMenu = false}} class="lg:hidden max-h-screen overflow-hidden flex justify-end w-full absolute inset-0 bg-black/50 z-50">
        <div class="lg:w-1/3 md:w-1/2 w-full bg-black z-30 p-6">
            <div class="w-full flex items-center justify-between">
                <button on:click={() => {showMenu = false}}>
                    <Icons strokeColor="#fff" type="close" />
                </button>
                <button on:click={openCart} class="relative mr-4">
                    <Icons strokeColor="#fff" type="cart" />
                    <div class="text-black text-xs absolute bottom-0 left-0 h-4 w-4 rounded-full -ml-2 -mb-2 border border-black flex items-center justify-center bg-white">
                        {$cartQuantity}
                    </div>
                </button>
            </div>
            <div class="w-full flex flex-col mt-6">
                {#each tabs as tab, i (tab.name)}
                    <div class:active={currentRoute === tab.path}>
                        <a sveltekit:prefetch href={tab.path} class={`hover:opacity-100 px-2 py-1 text-white font-bold text-xl rounded-lg ${currentRoute === tab.path ? 'opacity-100' : 'opacity-75'}`}>{tab.name}</a>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    {/if}
</nav>