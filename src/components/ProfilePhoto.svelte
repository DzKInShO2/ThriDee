<script lang="ts">
let { photoUrl = null } = $props();
</script>

<!-- svelte-ignore a11y_missing_attribute -->
{#if (photoUrl)}
<img 
    class="
    w-full
    h-full
    object-cover
    object-center
    "
    src={photoUrl} />
{:else}
<img 
    class="
    w-full
    h-full
    object-cover
    object-center
    "
    src="/noprofile.jpg" />
{/if}
