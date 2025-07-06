<script lang="ts">
import { goto } from "$app/navigation";
import { onMount } from "svelte";

import { db } from "$lib/firebase";
import { user } from "$lib/stores/authStore"
import { isLoading } from "$lib/stores/stateStore";

import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

import { 
    ClickableButton,
    ProfilePhoto,
    ModelCard
} from "../../components/design";

let { data } = $props();

onMount(() => {
    $isLoading = true
    if (data.user === "") {
        goto("/");
    }
})

let isItMe = $state(false);
let currentUser: any = $state(null);
$effect(() => {
    if ($user) {
        isItMe = ($user.uid === data.user)
    }
});

let modelsCreated: Array<String> = $state(Array<String>());
if (data.user !== "") {
    const docRef = doc(db, "user", data.user);
    getDoc(docRef).then(async (snap) => {
        currentUser = {
            id: snap.id,
            ...snap.data(),
        };

        $isLoading = false;
    });

    const modelsQuery = query(collection(db, "model"), where("author", "==", docRef));

    getDocs(modelsQuery).then((querySnap) => {
        let models = Array<String>();
        querySnap.forEach((doc) => {
            models.push(doc.id);
        });
        modelsCreated = models;
    });
}

</script>

<div class="p-5 flex flex-col items-center gap-5">
    {#if (currentUser)}
        <div class="flex flex-col items-center gap-5 w-8/10 p-5 shadow-2xl bg-gray-100 rounded-xl mb-10">
            <div class="
                w-[256px] h-[256px] 
                overflow-clip rounded-full
                border-[#FFA808]">
                <ProfilePhoto photoUrl={currentUser.photoURL} />
            </div>

            <div class="flex flex-col items-center">
                <p class="text-4xl">{currentUser.name}</p>
                <p class="font-light">Bergabung Sejak: {currentUser.joined.toDate().toLocaleString()}</p>
            </div>
            <p class="max-w-8/10">{currentUser.bio}</p>

            {#if (isItMe)}
                <ClickableButton onclick={() => goto(`/user/edit?id=${currentUser.id}`) } label="<i class='fa-solid fa-edit'></i> Edit Profil" render={true}/>
            {/if}
        </div>

        <div class="flex flex-col gap-5 pb-8 w-full overflow-clip rounded-xl shadow-2xl">
            <p class="font-semibold text-xl shadow-md
                text-center bg-[#FFA808] p-3
                text-white">Model Yang Telah Diunggah</p>
            {#if (modelsCreated.length > 0)}
                <div class="grid gap-x-8 gap-y-8 ml-4 mr-8 grid-cols-1 md:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 2xl:-mr-5 justify-items-center">
                    {#each modelsCreated as model}
                        <ModelCard id={model} />
                    {/each}
                </div>
            {:else}
                <p class="text-center p-5">Pengguna belum pernah mengunggah model</p>
            {/if}
        </div>
    {/if}
</div>
