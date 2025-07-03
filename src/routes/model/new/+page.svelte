<script lang="ts">

import { onMount } from "svelte";
import { goto } from "$app/navigation";
import { user } from "$lib/stores/authStore"

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

let nameValue = $state("");
let descriptionValue = $state("");

let modelFile = $state<File>();
async function changeModel() {
}
</script>

<div class="flex flex-col gap-5 items-center p-10 w-180 md:w-250 m-auto h-screen">
    <p class="text-4xl mt-10 mb-32">Unggah Model</p>
    <div class="shadow-xl w-full h-2/5">
        {#if modelFile}
            <ModelViewport model={{
                binary: URL.createObjectURL(modelFile), 
                type: modelFile.name.split(".").pop()
                }} />
        {:else}
            <ModelViewport model={null} />
        {/if}
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
            class="group flex items-center justify-between p-5 hover:bg-gray-200 border-t-1 border-gray-200 cursor-pointer">
            <p class="text-md font-normal">Nama</p>
            <div class="flex gap-5">
                <div class="hidden group-hover:block">
                    <i class="fa-solid fa-pen"></i>
                </div>
            </div>
        </div>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="group flex items-center justify-between p-5 hover:bg-gray-200 border-t-1 border-gray-200 cursor-pointer">
            <p class="text-md font-normal">Deskripsi</p>
            <div class="flex gap-5">
                <div class="hidden group-hover:block">
                    <i class="fa-solid fa-pen"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col border border-gray-100 bg-gray-50 shadow-2xl w-full rounded-xl overflow-clip">
        <p class="p-3 text-xl font-medium">Info SEO</p>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="group flex items-center justify-between p-5 hover:bg-gray-200 cursor-pointer">
            <p class="text-md font-normal">Tag</p>
            <div class="flex gap-5">
                <div class="hidden group-hover:block">
                    <i class="fa-solid fa-pen"></i>
                </div>
            </div>
        </div>
    </div>

    <ClickableButton label="<i class='fa-solid fa-upload'></i> Unggah" render={true} onclick={() => {}} />
</div>
