<script>
    import { page } from '$app/stores';
    import Icons from "$lib/Icons.svelte";
    import { cart } from '../store'; 
    import SearchBar from "$lib/SearchBar.svelte";

    if(typeof window !== 'undefined') {
        let items = JSON.parse(localStorage.getItem('cart'))
        cart.set(items || [])
    }
    $: currentRoute = $page.url.pathname;
    let numberOfItemsInBasket = 0;

    $: {
        let amount = 0;
        $cart.forEach((d) => {
            amount  = amount+d.quantity
        });
        numberOfItemsInBasket = amount;
    };

    let tabs = [
        {name: 'Shop All', path: '/search'},
    ];
</script>

<nav class="p-4 lg:px-6 border-b border-zinc-700 flex items-center justify-between">
    <div class="flex items-center">
        <div class="mr-4" sveltekit:prefetch class:active={currentRoute === '/'}>
            <a href="/" sveltekit:prefetch class="">
                <picture>
                    <source srcset="svelte_logo.png" type="image/png" />
                    <img src="svelte_logo.png" alt="Svelte Logo" class="h-8"/>
                </picture>
            </a>
        </div>
        {#each tabs as tab, i (tab.name)}
            <div class:active={currentRoute === tab.path}>
                <a sveltekit:prefetch href={tab.path} class={`hover:opacity-100 px-2 py-1 text-white rounded-lg ${currentRoute === tab.path ? 'opacity-100' : 'opacity-75'}`}>{tab.name}</a>
            </div>
        {/each}
    </div>
    <SearchBar />
    <button on:click class="relative">
        <Icons strokeColor="#fff" type="cart" />
        <div class="text-black text-xs absolute bottom-0 left-0 h-4 w-4 rounded-full -ml-2 -mb-2 border border-black flex items-center justify-center bg-white">
            {numberOfItemsInBasket}
        </div>
    </button>
</nav>