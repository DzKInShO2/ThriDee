<script lang="ts">
let { label, onclick, render=false} = $props();
</script>

<button
    {onclick}
    class="
    transition-all
    bg-[#FFA808]
    p-2
    rounded-xl
    cursor-pointer
    hover:shadow-lg
    hover:p-3
    active:bg-[#F75B00]
    active:scale-[1.1]
    mt-5">
    {#if render}
        {@html label}
    {:else}
        {label}
    {/if}
</button>
