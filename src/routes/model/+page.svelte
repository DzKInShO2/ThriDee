<script lang="ts">

import {
    ClickableButton,
    ModelCard,
    ModelViewport,
    ProfilePhoto
}from "../../components/design"

import { isLoading } from "$lib/stores/stateStore";

import { onMount } from 'svelte';
import { fade } from "svelte/transition";
import { goto } from '$app/navigation';

import { db, storage } from "$lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
    import { ref } from "firebase/storage";

const { data } = $props();

onMount(() => {
    if (data.modelData === null) {
        goto("/")
    }
});

async function getRelatedModels() {
    return new Promise((fulfil, _) => {
        const q = query(collection(db, "model"), where("category", "==", data.modelData.category));
        let ids = Array<String>();

        getDocs(q).then((docSnaps) => {
            docSnaps.forEach((docRef) => {
                ids.push(docRef.id);
            });

            fulfil(ids);
        });
    });
}

let anchor: HTMLAnchorElement;
let modelsPromise = $state(getRelatedModels());

async function downloadModel() {
    $isLoading = true;
    fetch(data.modelData.binary).then((response) => {
        response.blob().then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            anchor.download = `${data.modelData.title}.${data.modelData.type}`;
            anchor.href = blobURL;
            anchor.click();

            URL.revokeObjectURL(blobURL);

            $isLoading = false;
        });
    });
}


</script>

<a class="hidden" bind:this={anchor}></a>

<section class="h-120vh w-full">
    <div class="flex flex-col md:flex-row p-5 gap-5">
        <div class="flex flex-1 flex-col gap-5">
            <ModelViewport model={data.modelData} />
            <div class="bg-gray-50 flex flex-col p-3 rounded-xl shadow-2xl w-full gap-5">
                <div class="flex flex-row items-center justify-between">
                    <div class="flex flex-col">
                        <h1>{data.modelData.title}</h1>
                        <p>{data.modelData.price}</p>
                    </div>
                    <ClickableButton label="<i class='fa-solid fa-download'></i> Unduh" render={true} onclick={downloadModel}/>
                </div>
                <p>{data.modelData.description}</p>
                <a 
                    href={`user?id=${data.modelData.author.id}`}
                    class="
                    cursor-pointer 
                    bg-gray-100 
                    rounded-md shadow-md 
                    p-2 
                    flex gap-5 items-center 
                    select-none">
                    <div class="w-[96px] h-[96px] overflow-clip rounded-full">
                        <ProfilePhoto photoUrl={data.modelData.author.photoURL} />
                    </div>
                    <div class="flex flex-col gap-2">
                        <p class="font-medium text-lg">{data.modelData.author.name}</p>
                        <p class="text-sm">Bio: <br>{data.modelData.author.bio}</p>
                    </div>
                </a>
            </div>
        </div>
        <div class="flex-none flex flex-col gap-4">
            <p class="font-semibold text-lg w-[256px]">Model Terkait</p>
            {#await modelsPromise}
                <p out:fade>Memuat model<span>...</span></p>
            {:then models}
                <div in:fade class="flex flex-col gap-2">
                    {#each models as model}
                        <ModelCard id={model} />
                    {/each}
                </div>
            {/await}
        </div>
    </div>
</section>
