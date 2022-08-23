<div class="flex">
  <nav class="col-span-2 hidden w-1/6 flex-none py-8 pl-6 lg:block">
    <h1 class="text-lg font-semibold">Categories</h1>
    <ul>
      <li class="mt-2 text-sm text-gray-300">
        <a
          sveltekit:prefetch
          data-testid="category-link"
          aria-selected="true"
          class="whitespace-nowrap hover:underline focus:underline"
          href="/search">All</a
        >
      </li>
      <li class="mt-2 text-sm text-gray-300">
        <a
          sveltekit:prefetch
          data-testid="category-link"
          aria-selected="true"
          class="whitespace-nowrap hover:underline focus:underline"
          href="/search/featured">Featured</a
        >
      </li>
      <li class="mt-2 text-sm text-gray-300">
        <a
          sveltekit:prefetch
          data-testid="category-link"
          aria-selected="true"
          class="whitespace-nowrap hover:underline focus:underline"
          href="/search/clothes">Apparel</a
        >
      </li>
    </ul>
  </nav>
  <div class="min-h-screen">
    <slot />
  </div>
</div>
