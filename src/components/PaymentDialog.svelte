<script lang="ts">
let { visible = $bindable() } = $props();
</script>

{#if visible}
    <div class="bg-[#ABABABAB] fixed top-0 z-60 h-screen w-screen">
    </div>
{/if}
