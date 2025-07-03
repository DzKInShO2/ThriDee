<script lang="ts">

import {
    ClickableButton,
    ModelCard,
    ModelViewport,
    ProfilePhoto
}from "../../components/design"

import { onMount } from 'svelte';
import { goto } from '$app/navigation';

const { data } = $props();

onMount(() => {
    if (data.modelData === null) {
        goto("/")
    }
})

</script>

<section class="h-screen">
    <div class="flex flex-col md:flex-row p-5 gap-5">
        <div class="flex flex-1 flex-col gap-5">
            <ModelViewport model={data.modelData} />
            <div class="bg-gray-50 flex flex-col p-3 rounded-xl shadow-2xl w-full gap-5">
                <div class="flex flex-row items-center justify-between">
                    <div class="flex flex-col">
                        <h1>{data.modelData.title}</h1>
                        <p>{data.modelData.price}</p>
                    </div>
                    <ClickableButton label="<i class='fa-solid fa-download'></i> Unduh" render={true} />
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
            <div class="flex flex-col gap-2">
                <ModelCard id={data.modelId} />
            </div>
        </div>
    </div>
</section>
