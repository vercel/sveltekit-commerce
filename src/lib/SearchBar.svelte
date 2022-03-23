<script>
  import { search } from '../store.js';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icons from './Icons.svelte';

  let value = '';
  function submit(e) {
    if ($page.url.pathname !== 'search') {
      goto('/search');
    }
    search.set(value);
  }
</script>

<form on:submit|preventDefault={submit} class="relative flex w-full items-center">
  <div class="absolute top-0 right-0 mr-2">
    <Icons strokeColor="#fff" type="search" />
  </div>
  <input
    bind:value
    placeholder="Search for products..."
    class="w-full border border-white/30 bg-transparent p-2"
  />
</form>

<style>
  form {
    margin: 0px;
    padding: 0px;
    display: inline;
  }
  input::placeholder {
    color: rgb(85, 85, 85);
  }
</style>
