<script lang="ts">
    import { goto } from "$app/navigation";
    import { db } from "$lib/firebase.js";
    import { doc, getDoc } from "firebase/firestore";

    import { user } from "$lib/stores/authStore";

    import { 
        ProfilePhoto
    } from "../../../components/design";

    let { data } = $props();

    if (!data.user) {
        goto("/");
    }

    $effect(() => {
        if (!$user) {
            goto("/");
        }
    });

    let userData = $state();
    getDoc(doc(db, "user", data.user!)).then((snap) => {
        userData = {
            id: snap.id,
            ...snap.data(),
        };
    });
</script>

<div class="flex flex-col gap-5 items-center p-10 w-180 md:w-250 m-auto h-screen">
    <p class="text-4xl mt-10 mb-32">Edit Profil</p>
    {#if userData}
        <div class="flex flex-col border border-gray-100 bg-gray-50 shadow-2xl w-full rounded-xl overflow-clip">
            <p class="p-3 text-xl font-medium">Info Dasar</p>
            <div class="group flex items-center justify-between p-5 hover:bg-gray-200 cursor-pointer">
                <p class="text-md font-normal">Gambar profil</p>
                <div>
                    <div class="flex gap-5 items-center">
                        <div class="w-[64px] h-[64px] rounded-full overflow-clip">
                            <ProfilePhoto photoUrl={userData.photoURL} />
                        </div>
                        <div class="hidden group-hover:block">
                            <i class="fa-solid fa-pen"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="group flex items-center justify-between p-5 hover:bg-gray-200 border-t-1 border-gray-200 cursor-pointer">
                <p class="text-md font-normal">Nama</p>
                <div class="flex gap-5">
                    <p class="font-thin">{userData.name}</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
            <div class="group flex items-center justify-between p-5 hover:bg-gray-200 border-t-1 border-gray-200 cursor-pointer">
                <p class="text-md font-normal">Bio</p>
                <div class="flex gap-5">
                    <p class="font-thin">{userData.bio}</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col border border-gray-100 bg-gray-50 shadow-2xl w-full rounded-xl overflow-clip">
            <p class="p-3 text-xl font-medium">Info Kontak</p>
            <div class="group flex items-center justify-between p-5 hover:bg-gray-200 cursor-pointer">
                <p class="text-md font-normal">Email</p>
                <div class="flex gap-5">
                    <p class="font-thin">{$user.email}</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
            <div class="group flex items-center justify-between p-5 hover:bg-gray-200 border-t-1 border-gray-200 cursor-pointer">
                <p class="text-md font-normal">Telepon</p>
                <div class="flex gap-5">
                    <p class="font-thin">{userData.phone}</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col border border-gray-100 bg-gray-50 shadow-2xl w-full rounded-xl overflow-clip">
            <p class="p-3 text-xl font-medium">Sandi</p>
            <div class="group flex items-center justify-between p-5 hover:bg-gray-200 cursor-pointer">
                <p class="text-md font-normal">Kata Sandi</p>
                <div class="flex gap-5">
                    <p class="font-thin">...............</p>
                    <div class="hidden group-hover:block">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
