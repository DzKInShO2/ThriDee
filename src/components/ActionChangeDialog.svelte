<script lang="ts">
    import { fade } from 'svelte/transition';

    let { label, text, visibility = $bindable(), onaccept } = $props();
</script>

{#if visibility}
<div
    transition:fade
    class={`
    flex
    items-center
    justify-center
    z-10
    absolute
    w-full h-full
    bg-[#1F1F1F60]
    `}>
    <div 
        class="
        flex
        flex-col
        justify-between
        p-5
        border-3
        border-gray-200
        rounded-xl
        shadow-xl
        bg-gray-100
        w-80 h-60
        md:w-110
        block 
        relative 
        top-[-128px]">
        <p
            class="
            text-xl
            border-b-3
            border-gray-200
            ">
            {label}
        </p>

        {text}

        <div class="flex justify-end gap-5 items-center">
            <button
                onclick={() => visibility = false}
                class="
                w-25
                transition-all
                rounded-xl
                active:scale-[1.05]
                active:bg-gray-100
                active:text-black
                bg-gray-500
                text-white
                p-3
                cursor-pointer
                ">
                Batal
            </button>
            <button
                onclick={() => onaccept()}
                class="
                w-25
                transition-all
                rounded-xl
                active:scale-[1.05]
                active:bg-[#F75B00]
                active:text-white
                bg-[#FFA808]
                p-3
                cursor-pointer
                ">
                Ganti
            </button>
        </div>
    </div>
</div>
{/if}
