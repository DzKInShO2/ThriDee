<script lang="ts">

import { goto } from "$app/navigation";
import { db, storage } from "$lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { onMount } from "svelte";

let {id} = $props();

let data: any = $state(null);

onMount(async () => {
    const docRef = doc(db, "model", id);
    const docSnap = await getDoc(docRef);

    const currencyFormatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });

    data = {
        id: id,
        ...docSnap.data(),
        preview: await getDownloadURL(ref(storage, `model/preview/${id}.png`)),
        price: currencyFormatter.format(docSnap.data()!.price!)
    };
});

</script>

{#if (data)}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<a
    href={`/model?id=${id}`}
    class="
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
    <img src={data.preview} alt={data.title} class="w-full h-auto rounded-md block m-auto" />
    <div class="absolute bg-[#FFFFFF10] text-white w-full bottom-0 p-2">
        <h3>{data.title}</h3>
        <p>Kategori: {data.category}</p>
        <p>Harga: {data.price}</p>
    </div>
</a>
{/if}
