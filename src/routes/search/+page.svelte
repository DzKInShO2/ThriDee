<script lang="ts">
export let data;
</script>

{#snippet modelItem(model: any)}
    <div class="card-hover">
            <img src={model.preview} alt={model.title} class="w-full h-auto rounded-md block m-auto" />
            <div class="absolute bg-[#FFFFFF10] text-white w-full bottom-0 p-2">
                <h3>{model.title}</h3>
                <p>Kategori: {model.category}</p>
                <p>Harga: {model.price}</p>
            </div>
        </div>
{/snippet}

<div class="min-h-[60vh]">
<section class="p-5 flex gap-5">
    {#if data.models.length > 0}
        <div style="display: grid; grid-template-columns: repeat(6, minmax(200px, 1fr)); gap: 1rem; width: 100%;">
            {#each data.models as model}
                {@render modelItem(model)}
            {/each}
        </div>
    {:else}
        <div class="flex flex-col items-center w-full">
            <img class="rounded-full" src="/nomodel.webp" alt="No model found">
            <h1>Oops! Model yang anda cari tidak ditemukan! Mungkin sudah ditelan Adit!</h1>
        </div>
    {/if}
</section>
</div>