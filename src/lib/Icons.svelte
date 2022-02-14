<script>
    export let strokeColor = '#000';
    export let type;
</script>

<div>
    {#if type === 'heart'}
        <svg
            height="40"
            fill="none"
            viewBox="0 0 24 24"
            stroke={strokeColor}
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
      {:else if type === 'cart'}
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" stroke={strokeColor}><path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 5H19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      {:else if type === 'close'}
        <svg viewBox="0 0 24 24" width="24" height="24" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision" class="h-6 w-6 hover:text-accent-3"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
      {:else if type === 'minus'}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12H19" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      {:else if type === 'plus'}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5V19" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 12H19" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      {:else if type === 'menu'}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#fff"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      {/if}
      
</div>