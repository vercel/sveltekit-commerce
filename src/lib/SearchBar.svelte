<script>
    import { search } from '../store.js';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let value = '';
    function submit(e) {
        if($page.url.pathname !== 'search') {
            goto('/search')
        }
        search.set(value);
    }
</script>

<form on:submit|preventDefault={submit} class="w-1/2 flex items-center">
    <input bind:value placeholder="Search..." class="w-full p-1 bg-black border border-white/30" />
</form>

<style>
    form{
        margin:0px; padding:0px; display:inline;
    }
</style>