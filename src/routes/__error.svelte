<script>
    import Icons from '$lib/Icons.svelte';

</script>
<div class="h-screen flex flex-col justify-center items-center ">
    <div class="p-6 md:p-0 w-auto flex flex-col items-center justify-center">
        <div class="w-full flex items-center mb-8">
            <div class="bg-white p-4 flex-none rounded-full flex items-center justify-center">
                <Icons type="search" width="30px" height="30px" />
            </div>
            <div class="w-px bg-white h-20 mx-6"></div>
            <div class="text-lg font-medium">Opps! The page you're looking for doesn't exist.</div>
        </div>
        <a href="/" sveltekit:prefetch class="w-full text-center bg-white/90 text-black text-sm uppercase p-3 hover:bg-white/100 font-medium">
            Return to Home Page
        </a>
    </div>
</div>