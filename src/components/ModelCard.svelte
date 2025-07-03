<script lang="ts">

import { goto } from "$app/navigation";

let {id, title, preview, category, price } = $props();

function onclick() {
    goto(`/model?id=${id}`)
}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div 
    {onclick}
    class="
    transition-transform 
    rounded-md 
    w-[256px] h-[256px] 
    flex flex-col 
    overflow-clip 
    relative 
    shadow-2xl 
    cursor-pointer 
    hover:scale-[1.05]">
    <img src={preview} alt={title} class="w-full h-auto rounded-md block m-auto" />
    <div class="absolute bg-[#FFFFFF10] text-white w-full bottom-0 p-2">
        <h3>{title}</h3>
        <p>Kategori: {category}</p>
        <p>Harga: {price}</p>
    </div>
</div>
