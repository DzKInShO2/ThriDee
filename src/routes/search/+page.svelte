<script lang="ts">
import { ModelCard } from "../../components/design";

const { data } = $props();
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

<section class="p-5">
    {#if data.ids.length > 0}
        <div class="flex flex-wrap gap-5">
            {#each data.ids as id }
                <ModelCard {id} />
            {/each}
        </div>
    {:else}
        <div class="flex flex-col items-center w-full">
            <img class="rounded-full" alt="Adit" src="/nomodel.webp">
            <h1>Oops! Model yang anda cari tidak ditemukan! Mungkin sudah ditelan Adit!</h1>
        </div>
    {/if}
</section>
