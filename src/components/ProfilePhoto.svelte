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
<img 
    class={`
    object-contain
    `}
    src={photoUrl} />
</div>
