<script>
    export let items = [];
</script>

<div class="slider w-full overflow-scroll relative bg-white">
    <div class="slide-track flex">
        {#each items as item (item.node.id)}
            <a href={`/product/${item.node.handle}`} class="slide h-40 md:w-1/3 relative flex-none">
                <img class="h-full" src={item.node.images.edges[0].node.originalSrc} alt={item.node.title}/>
                <div class="bg-black absolute p-4 top-0 left-0 mt-32 ml-44 z-40">{item.node.title}</div>
            </a>
        {/each}
    </div>
</div>

<style>
    @-webkit-keyframes scroll {
    0% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
    }
    100% {
        -webkit-transform: translateX(calc(-250px * 7));
                transform: translateX(calc(-250px * 7));
    }
    }

    @keyframes scroll {
    0% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
    }
    100% {
        -webkit-transform: translateX(calc(-250px * 7));
                transform: translateX(calc(-250px * 7));
    }
    }

    .slider::after {

    -webkit-transform: rotateZ(180deg);
            transform: rotateZ(180deg);
    }

    .slider .slide-track {
    -webkit-animation: scroll 40s linear infinite;
            animation: scroll 40s linear infinite;
    }

</style>