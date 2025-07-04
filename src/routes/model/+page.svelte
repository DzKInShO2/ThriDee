<script lang="ts">

import {
    ActionConfirmDialog,
    ClickableButton,
    ModelCard,
    ModelViewport,
    ProfilePhoto
}from "../../components/design"

import { user } from "$lib/stores/authStore";
import { isLoading } from "$lib/stores/stateStore";

import { onMount } from 'svelte';
import { fade } from "svelte/transition";
import { goto } from '$app/navigation';

import { categories, db, storage } from "$lib/firebase";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

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

let confirmVisibility = $state(false);

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

async function deleteModel() {
    $isLoading = true;

    deleteDoc(doc(db, "model", data.modelId)).then(() => {
        deleteObject(ref(storage, `model/binary/${data.modelId}.${data.modelData.type}`)).then(() => {
            deleteObject(ref(storage, `model/preview/${data.modelId}.png`)).then(() => {
                goto(`/user?id=${$user!.uid}`);
                $isLoading = false;
            });
        });
    });
}

</script>

<a class="hidden" bind:this={anchor}></a>
<ActionConfirmDialog bind:visibility={confirmVisibility} label="Hapus Model" text="Menghapus model, apakah anda yakin?" onaccept={deleteModel} />

<section class="h-120vh w-full">
    <div class="flex flex-col md:flex-row p-5 gap-5">
        <div class="flex flex-1 flex-col gap-5">
            <ModelViewport model={data.modelData} />
            <div class="bg-gray-50 flex flex-col p-3 rounded-xl shadow-2xl w-full gap-3">
                <div class="flex flex-row items-center justify-between">
                    <div class="flex flex-col">
                        <h1>{data.modelData.title}</h1>
                        <p class="font-light">{data.modelData.price}  <i class="fa-solid fa-tag"></i></p>
                    </div>
                    <div class="flex gap-8 items-center">
                        {#if ($user && $user!.uid === data.modelData.author.id) }
                            <ClickableButton label="<i class='fa-solid fa-trash'></i> Hapus" render={true} onclick={() => confirmVisibility = true}/>
                            <ClickableButton label="<i class='fa-solid fa-edit'></i> Edit" render={true} onclick={() => { goto(`/model/edit?id=${data.modelId}`) } }/>
                        {/if}
                        <ClickableButton label="<i class='fa-solid fa-download'></i> Unduh" render={true} onclick={downloadModel}/>
                    </div>
                </div>

                <p class="mb-4">Kategori: <a href="/search?c={data.modelData.category}">{categories.find(a => a.id === data.modelData.category).title}</a></p>

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
