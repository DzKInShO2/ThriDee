<script lang="ts">
import { 
    ModelCard 
} from "../../components/design";

const { data } = $props();
const categories = ["", "Accessory", "Building", "Character", "Environment", "Vehicle", "Weapon"];

let search = data.search;
let category = $state(data.category);
</script>

<section class="p-5 h-screen flex flex-col gap-10">
    <div class="
        flex
        flex-col
        justify-between
        gap-1
        rounded-xl
        shadow-xl
        border
        border-gray-300
        p-3
        bg-gray-100
        ">
        <div class="flex gap-3 items-center">
            <p>Kategori</p>
            <select bind:value={category}
                onchange={() => location.href = `/search?s=${search}&c=${category}` }
                class="border
                border-gray-100
                rounded-xl
                ring-0 
                font-light text-sm">
                {#each categories as c}
                    <option value={c}>
                        {c}
                    </option>
                {/each}
            </select>
        </div>
    </div>
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
