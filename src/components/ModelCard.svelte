<script lang="ts">

import { categories, currencyFormatter, db, storage } from "$lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

import { fly } from "svelte/transition";

import { default as LoadingOverlayLocal } from "./LoadingOverlayLocal.svelte";

let {id} = $props();

async function loadModel(){
    return new Promise((fulfil, _) => {
        const docRef = doc(db, "model", id);
        getDoc(docRef).then((docSnap) => {
            getDownloadURL(ref(storage, `model/preview/${id}.png`)).then((url) => {
                const price = (docSnap.data()!.price! === 0) ? "Gratis" : currencyFormatter.format(docSnap.data()!.price!);
                const category = categories.find(a => a.id === docSnap.data()!.category);
                const data = {
                    id: id,
                    ...docSnap.data(),
                    category: category.title,
                    preview: url,
                    price: price
                };

                fulfil(data);
            });
        });
    });
};

let data: any = $state(loadModel());
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<a
    transition:fly={{ y: 200, duration: 1400 }}
    href={`/model?id=${id}`}
    rel="external"
    class="
    group
    basis-[256px]
    transition-transform 
    rounded-md 
    w-[256px] h-[256px] 
    flex flex-col 
    overflow-clip 
    relative 
    shadow-2xl 
    cursor-pointer 
    hover:scale-[1.05]">
    {#await data}
        <LoadingOverlayLocal />
    {:then model}
        <img src={model.preview} alt={model.title} 
            class="w-full h-auto rounded-md block m-auto" />
        <div class="transition-colors
            absolute bg-[#FFFFFF10] group-hover:bg-[#FFFFFF66] text-white w-full bottom-0 p-2">
            <h3 class="font-medium">{model.title}</h3>
            <p class="text-sm">{model.price} <i class="fa-solid fa-tag"></i></p>
            <p class="transition-all font-semibold text-sm hidden group-hover:block">{model.category}</p>
        </div>
    {/await}
</a>
