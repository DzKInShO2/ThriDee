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
import { collection, deleteDoc, doc, DocumentReference, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const { data } = $props();

onMount(() => {
    if (data.modelData === null) {
        goto("/")
    }
});

async function getRelatedModels() {
    return new Promise<Array<String>>((fulfil, _) => {
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
let isOwned = $state(data.modelData.price === "Gratis");
$effect(() => {
    if ($user && !isOwned) {
        if (data.modelData.author.id === $user!.uid) {
            isOwned = true;
        } else {
            const model = doc(db, "model", data.modelId);
            const q = query(collection(db, "user"),
                where("__name__", "==", $user!.uid),
                where("purchased", "array-contains", model));

            getDocs(q).then((qSnap) => {
                isOwned = !qSnap.empty;
            });
        }
    }
});

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

async function orderModel() {
    $isLoading = true;

    const userRef = doc(db, "user", $user!.uid);
    const modelRef = doc(db, "model", data.modelId);
    getDoc(userRef).then((docSnap) => {
        const ordered = docSnap.data()!.ordered as Array<DocumentReference>;
        if (ordered !== undefined && ordered !== null) {
            if (ordered.find((o) => o.path === modelRef.path) === undefined) {
                setDoc(userRef, {
                    ordered: [
                        ...ordered,
                        modelRef
                    ]
                }, { merge: true }).then(() => { 
                    $isLoading = false 
                    goto(`/user/own?id=${$user!.uid}`);
                });
            } else {
                $isLoading = false;
                goto(`/user/own?id=${$user!.uid}`);
            }
        } else {
            setDoc(userRef, {
                ordered: [
                    modelRef
                ]
            }, { merge: true }).then(() => { 
                $isLoading = false; 
                goto(`/user/own?id=${$user!.uid}`);
            });
        }
    });
}

</script>

<a class="hidden" href="/" bind:this={anchor}>A</a>
<ActionConfirmDialog bind:visibility={confirmVisibility} label="Hapus Model" text="Menghapus model, apakah anda yakin?" onaccept={deleteModel} />

<section class="h-120vh w-full">
    <div class="flex flex-col md:flex-row gap-5 p-5">
        <div class="flex flex-1 flex-col gap-5">
            <div class="w-full h-full md:h-auto">
                <ModelViewport model={data.modelData} />
            </div>
            <div class="bg-gray-50 flex flex-col rounded-xl shadow-2xl w-full gap-3 overflow-clip">
                <div class="flex flex-col justify-between border-b-3 border-gray-200 bg-gray-100 p-3">
                    <div class="flex gap-8 justify-between">
                        <h1>{data.modelData.title}</h1>
                        <div>
                            <div class="group flex">
                                {#if ($user && ($user!.uid === data.modelData.author.id || $user!.uid === "6dJNMyxEaofkXlxKJ6SwyVmMWri1")) }
                                    <button 
                                        onclick={() => confirmVisibility = true}
                                        class="transition-all m-0 pr-3 pl-3 cursor-pointer border-b-2 pb-2
                                                group-hover:text-gray-400
                                                hover:scale-[1.1]
                                                hover:text-orange-400 hover:border-orange-400 hover:border-b-3">
                                        <i class='fa-solid fa-trash'></i> Hapus
                                    </button>
                                    <button 
                                        onclick={() => { goto(`/model/edit?id=${data.modelId}`) } }
                                        class="transition-all m-0 pr-3 pl-3 cursor-pointer border-b-2 pb-2
                                                group-hover:text-gray-400
                                                hover:scale-[1.1]
                                                hover:text-orange-400 hover:border-orange-400 hover:border-b-3">
                                        <i class='fa-solid fa-edit'></i> Edit
                                    </button>
                                {/if}
                                {#key isOwned}
                                    {#if isOwned === true}
                                        <button 
                                            onclick={() => goto(`../user/pesanan?id=${data.modelId}`)}
                                            class="transition-all m-0 pr-3 pl-3 cursor-pointer border-b-2 pb-2
                                                    group-hover:text-gray-400
                                                    hover:scale-[1.1]
                                                    hover:text-orange-400 hover:border-orange-400 hover:border-b-3">
                                            <i class='fa-solid fa-print'></i> Cetak
                                        </button>
                                        <button 
                                            onclick={downloadModel}
                                            class="transition-all m-0 pr-3 pl-3 cursor-pointer border-b-2 pb-2
                                                    group-hover:text-gray-400
                                                    hover:scale-[1.1]
                                                    hover:text-orange-400 hover:border-orange-400 hover:border-b-3">
                                            <i class='fa-solid fa-download'></i> Unduh
                                        </button>
                                    {:else if $user}
                                        <button 
                                            onclick={orderModel}
                                            class="transition-all m-0 pr-3 pl-3 cursor-pointer border-b-2 pb-2
                                                    group-hover:text-gray-400
                                                    hover:scale-[1.1]
                                                    hover:text-orange-400 hover:border-orange-400 hover:border-b-3">
                                            <i class='fa-solid fa-shopping-cart'></i> Pesan
                                        </button>
                                    {/if}
                                {/key}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <p class="font-light">{data.modelData.price}  <i class="fa-solid fa-tag"></i></p>
                        <p class="mb-4">Kategori: <a href="/search?c={data.modelData.category}">{categories.find(a => a.id === data.modelData.category).title}</a></p>
                    </div>
                    <a 
                        href={`user?id=${data.modelData.author.id}`}
                        class="
                        cursor-pointer 
                        bg-gray-200
                        rounded-md shadow-md 
                        p-2 
                        w-auto
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
                <div class="mb-15">
                    <p class="pl-5 pb-5 text-xl font-semibold">Deskripsi</p>
                    <p class="pl-10 pr-10">{data.modelData.description}</p>
                </div>
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
