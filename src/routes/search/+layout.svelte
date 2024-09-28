<script>
  import { page } from '$app/stores';

  /** @type {import('svelte').Snippet} */
  export let children;
</script>

<div class="flex">
  <nav class="col-span-2 hidden w-1/6 flex-none py-8 pl-6 lg:block">
    <h1 class="text-lg font-semibold">Categories</h1>
    <ul>
      <li class="mt-2 text-sm text-gray-300">
        <a
          data-sveltekit-prefetch
          data-testid="category-link"
          class="whitespace-nowrap hover:underline focus:underline"
          href="/search"
          aria-current={$page.url.pathname === '/search' ? 'page' : undefined}
        >All</a
        >
      </li>
      <li class="mt-2 text-sm text-gray-300">
        <a
          data-sveltekit-prefetch
          data-testid="category-link"
          class="whitespace-nowrap hover:underline focus:underline"
          href="/search/featured"
          aria-current={$page.url.pathname === '/search/featured' ? 'page' : undefined}
        >Featured</a
        >
      </li>
      <li class="mt-2 text-sm text-gray-300">
        <a
          data-sveltekit-prefetch
          data-testid="category-link"
          class="whitespace-nowrap hover:underline focus:underline"
          href="/search/clothes"
          aria-current={$page.url.pathname === '/search/clothes' ? 'page' : undefined}
        >Apparel</a
        >
      </li>
    </ul>
  </nav>
  <div class="min-h-screen">
    {@render children()}
  </div>
</div>
