<script lang="ts">

import { goto } from "$app/navigation";
import { db, storage } from "$lib/firebase"
import { user } from "$lib/stores/authStore"
import { isLoading } from "$lib/stores/stateStore"
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, uploadString } from "firebase/storage";

import * as BABYLON from "@babylonjs/core";

import {
    ClickableButton,
    ClickableFileDialog,
    ModelViewport,
} from "../../../components/design";

$effect(() => {
    if (!$user) {
        goto("/");
    }
});

const categories = ['Character', 'Vehicle', 'Environment', 'Weapon', 'Building', 'Accessory']

let nameValue = $state("");
let descriptionValue = $state("");
let priceValue = $state("");
let categoryValue = $state(categories[0]);
let errorValue: any = $state(null);

let modelFile = $state<File>();
let model: any = $state(null);

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
        && modelFile === undefined
        && babylonData === undefined) {
        errorValue = "Please make sure you fill up all the field correctly before submitting."
        return
    }

    $isLoading = true;

    const authRef = doc(db, "user", $user!.uid);
    const ext = modelFile!.name.split(".").pop();
    addDoc(collection(db, "model"), {
        author: authRef,
        category: categoryValue,
        description: descriptionValue,
        discount: 0,
        price: Number(priceValue),
        published: Timestamp.now(),
        title: nameValue,
        type: ext
    }).then((docRef) => {
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(babylonData!.engine, babylonData!.camera, 
        { width: 512, height: 512 }, (data) => {
            uploadString(ref(storage, `model/preview/${docRef.id}.png`), data, "data_url", {
                contentType: "image/png"
            });
        });
        
        uploadBytes(ref(storage, `model/binary/${docRef!.id}.${ext!}`), modelFile!).then(() => {
            $isLoading = false;
            goto(`/model?id=${docRef!.id}`);
        });
    });
}
</script>

<div class="flex flex-col gap-5 items-center p-10 w-100 80 md:w-200 lg:w-250 m-auto">
    <p class="text-4xl mt-10 mb-32">Unggah Model</p>
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

    <ClickableButton label="<i class='fa-solid fa-upload'></i> Unggah" render={true} onclick={uploadModel} />
</div>
