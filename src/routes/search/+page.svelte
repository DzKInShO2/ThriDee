<script lang="ts">
export let data;
</script>

{#snippet modelItem(model: any)}
    <div class="transition-transform rounded-md w-[256px] h-[256px] flex flex-col overflow-clip relative shadow-2xl cursor-pointer hover:scale-[1.05]">
        <img src={model.preview} alt={model.title} class="w-full h-auto rounded-md block m-auto" />
        <div class="absolute bg-[#FFFFFF10] text-white w-full bottom-0 p-2">
            <h3>{model.title}</h3>
            <p>Kategori: {model.category}</p>
            <p>Harga: {model.price}</p>
        </div>
    </div>
{/snippet}

<section class="p-5 flex gap-5 ">
    {#if data.models.length > 0}
        {#each data.models as model }
            {@render modelItem(model)}
        {/each}
    {:else}
        <div class="flex flex-col items-center w-full">
            <img class="rounded-full" src="/nomodel.webp">
            <h1>Oops! Model yang anda cari tidak ditemukan! Mungkin sudah ditelan Adit!</h1>
        </div>
    {/if}
</section>
