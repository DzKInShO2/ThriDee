<script lang="ts">

import { onMount } from "svelte";
import { goto } from "$app/navigation";
import { db, storage } from "$lib/firebase";
import { user } from "$lib/stores/authStore";
import { isLoading } from "$lib/stores/stateStore";
import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";

import * as BABYLON from "@babylonjs/core";

import {
    ClickableButton,
    ClickableFileDialog,
    ModelViewport,
} from "../../../components/design";

const categories = ["Accessory", "Building", "Character", "Environment", "Vehicle", "Weapon"];

let { data } = $props();

$effect(() => {
    if (!$user) {
        goto("/");
    }
});

let nameValue = $state("");
let descriptionValue = $state("");
let priceValue = $state("");
let categoryValue = $state(categories[0]);
let errorValue: any = $state(null);

let modelFile = $state<File>();
let model: any = $state(null);

onMount(() => {
    if (data.id === "" || !$user) {
        goto("/");
    }

    getDoc(doc(db, "model", data.id!)).then((docRef) => {
        const authRef = doc(db, "user", $user!.uid);
        if (docRef.data()!.author.path !== authRef.path) {
            goto("/");
        }

        nameValue = docRef.data()!.title;
        categoryValue = docRef.data()!.category;
        priceValue = docRef.data()!.price.toString();
        descriptionValue = docRef.data()!.description;

        getDownloadURL(ref(storage, `model/binary/${docRef.id}.${docRef.data()!.type}`)).then((url) => {
            model = {
                binary: url,
                type: docRef.data()!.type
            };
        });
    });
});

let babylonData = $state<{
    engine: BABYLON.Engine,
    camera: BABYLON.ArcRotateCamera,
}>();

async function changeModel() {
    if (modelFile === undefined) return;
    
    model = {
        binary: URL.createObjectURL(modelFile),
        type: modelFile.name.split(".").pop()
    };
}

async function uploadModel() {
    if (nameValue.length === 0 
        && (priceValue.length === 0 || Number(priceValue) === Number.NaN)
        && descriptionValue.length === 0 
        && babylonData === undefined) {
        errorValue = "Please make sure you fill up all the field correctly before submitting."
        return
    }

    $isLoading = true;

    const ext = modelFile?.name.split(".").pop() ?? model.type;
    setDoc(doc(db, "model", data.id), {
        category: categoryValue,
        description: descriptionValue,
        discount: 0,
        price: Number(priceValue),
        title: nameValue,
        type: ext
    }, {merge: true}).then(() => {
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(babylonData!.engine, babylonData!.camera, 
        { width: 512, height: 512 }, (dataString) => {
            uploadString(ref(storage, `model/preview/${data.id}.png`), dataString, "data_url", {
                contentType: "image/png",
            });
        });
        
        if (modelFile !== undefined) {
            uploadBytes(ref(storage, `model/binary/${data.id}.${ext!}`), modelFile!).then(() => {
                $isLoading = false;
                goto(`/model?id=${data.id}`);
            });
        } else {
            $isLoading = false;
            goto(`/model?id=${data.id}`);
        }
    });
}
</script>

<div class="flex flex-col gap-5 items-center p-10 w-100 80 md:w-200 lg:w-250 m-auto">
    <p class="text-4xl mt-10 mb-32">Edit Model</p>
    {#if errorValue}
        <p class="text-red-500 font-semibold">{errorValue}</p>
    {/if}
    <div class="shadow-xl w-full h-2/5">
        <ModelViewport bind:model={model} bind:external={babylonData} />
    </div>
    <div class="flex flex-col border border-gray-100 bg-gray-50 shadow-2xl w-full rounded-xl overflow-clip">
        <p class="p-3 text-xl font-medium">Info Dasar</p>
        <ClickableFileDialog bind:file={modelFile} extensions=".glb" onchange={changeModel}
            classNames="group flex items-center justify-between p-5 hover:bg-gray-200 cursor-pointer">
            <p class="text-md font-normal">Model</p>
            <div>
                <div class="flex gap-5 items-center">
                    <p class="font-thin">{modelFile === undefined ? "Tidak ada model yang terpilih" : modelFile.name }</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-upload"></i>
                    </div>
                </div>
            </div>
        </ClickableFileDialog>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="group flex items-center justify-between p-5 gap-11 border-t-1 border-gray-200 cursor-pointer">
            <p class="text-md font-normal">Nama</p>
            <input type="text" class="flex-1 shadow-md border-none ring-0 rounded-md group-hover:bg-gray-200" bind:value={nameValue} />
        </div>
        <div 
            class="group flex items-center justify-between p-5 gap-11 border-t-1 border-gray-200 cursor-pointer">
            <p class="text-md font-normal">Harga</p>
            <input type="number" pattern="[0-9]" min="0" class="flex-1 shadow-md border-none ring-0 rounded-md group-hover:bg-gray-200" bind:value={priceValue} />
        </div>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="group flex items-start justify-between p-5 gap-5 border-t-1 border-gray-200 cursor-pointer">
            <p class="text-md font-normal">Deskripsi</p>
            <textarea bind:value={descriptionValue} 
                class="flex-1 w-1/3 resize-none h-40 shadow-md rounded-md border-none ring-0 group-hover:bg-gray-200">
            </textarea>
        </div>
    </div>
    <div class="flex flex-col border border-gray-100 bg-gray-50 shadow-2xl w-full rounded-xl overflow-clip">
        <p class="p-3 text-xl font-medium">Info SEO</p>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="flex items-start justify-between p-5 gap-8 cursor-pointer">
            <p class="text-md font-normal">Kategori</p>
            <div class="flex-1 flex gap-5 flex-col md:flex-row">
                {#each categories as category}
                    <label>
                        <input checked={categoryValue === category } onchange={() => categoryValue = category } type="radio" name="category" value={category}> {category}
                    </label>
                {/each}
            </div>
        </div>
    </div>

    <ClickableButton label="<i class='fa-solid fa-upload'></i> Perbarui" render={true} onclick={uploadModel} />
</div>
