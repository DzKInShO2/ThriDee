<script lang="ts">
import { ModelCard } from "../../components/design";

const { data } = $props();
</script>

<section class="p-5 h-screen">
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
