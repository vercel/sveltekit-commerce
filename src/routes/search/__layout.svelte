<div class="flex">
    <nav class="w-1/6 flex-none hidden lg:block col-span-2 py-8 pl-6">
        <h1 class="text-lg font-semibold">Categories</h1>
        <ul>
            <li class="mt-2 text-sm text-gray-300">
                <a data-testid="category-link" aria-selected="true" class="focus:underline hover:underline whitespace-nowrap" href="/search">All</a>
            </li>
            <li class="mt-2 text-sm text-gray-300">
                <a data-testid="category-link" aria-selected="true" class="focus:underline hover:underline whitespace-nowrap" href="/search/featured">Featured</a>
            </li>
            <li class="mt-2 text-sm text-gray-300">
                <a data-testid="category-link" aria-selected="true" class="focus:underline hover:underline whitespace-nowrap" href="/search/clothes">Apparel</a>
            </li>
        </ul>
    </nav>
    <div class="min-h-screen">
        <slot></slot>
    </div>
</div>
