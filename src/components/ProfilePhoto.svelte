<script lang="ts">
let { photoUrl, size = 24 } = $props();
</script>

<div class={`
    w-${size}
    h-${size}
    overflow-clip
    rounded-full
`}>
<!-- svelte-ignore a11y_missing_attribute -->
    {#if (photoUrl)}
    <img 
        class={`
        object-contain
        `}
        src={photoUrl} />
    {:else}
        <div class="w-full h-full bg-purple-500">
        </div>
    {/if}
</div>
